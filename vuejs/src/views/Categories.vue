<template>
  <div class="about">
    <div style="display: flex; align-items: center; justify-content: center; margin: 0 auto">
      <h1 style="margin-right: 1rem">Liste des catégories</h1>
      <input type="text" v-model="searchText" placeholder="Rechercher une catégorie">
    </div>
    <router-link to="/nouvelle-categorie">Nouvelle catégorie</router-link>
    <div v-if="searchText">
      <ul v-if="searchResult">
        <li v-for="data in searchResult" :key="data.id">
          <router-link :to="{name:'categorie_messages', params: {id: data.id}}">
          {{data.label}}
          </router-link>
          <span :style="{display:'inline-block',backgroundColor: data.color, width:'10px', height:'10px', borderRadius:'100%'}"></span>
          |
          <button v-on:click="()=>{handleCategoryDelete(data.id)}">Supprimer</button>
        </li>
      </ul>
      <h2 v-else>Aucun résultat</h2>
    </div>
    <ul v-else>
      <li v-for="categorie in categories" :key="categorie.id">
        <router-link :to="{name:'categorie_messages', params: {id: categorie.id}}">
        {{categorie.label}}
        </router-link>
        <span :style="{display:'inline-block',backgroundColor: categorie.color, width:'10px', height:'10px',  borderRadius:'100%'}"></span>
        |
        <button v-on:click="()=>{handleCategoryDelete(categorie.id)}">Supprimer</button>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
import {getCategories, searchByLabel, deleteCategory} from '../api/categorie'

export default {
  name: 'Categories',
  data () {
    return {
      categories: null,
      searchResult:null,
      searchText: null,
      searchByLabelTimeout: null
    }
  },
  mounted () {
    this.fetchCategory()
  },
  methods:{
    getSearchResult(){
      this.tempSearchText = this.searchText.toString()
      if (this.searchText) {
        clearTimeout(this.searchByLabelTimeout)
        this.searchByLabelTimeout = setTimeout(()=>{
          searchByLabel(this.searchText)
              .then(res => {
                this.searchResult = res.data['hydra:member'].length?res.data['hydra:member']:null
              })
        }, 300)
      }
    },
    async fetchCategory(){
      this.categories = await getCategories().then((response) => {
        return response.data['hydra:member']
      })
    },
    handleCategoryDelete(id){
      deleteCategory(id)
          .then(()=>{this.fetchCategory()})
    }
  },
  watch:{
    searchText: function(){
      this.getSearchResult()
    }
  }
}

</script>
