<template>
  <div class="about">
    <div style="display: flex; align-items: flex-start; justify-content: center; margin: 0 auto">
      <h1 style="margin-right: 1rem">Liste des catégories</h1>
      <div class="form_group">
        <input class="form_field" id="searchbar" type="text" placeholder="Rechercher une catégorie" v-model="searchText">
        <label class="form_label" for="searchbar">Rechercher une catégorie</label>
      </div>    </div>
    <router-link to="/nouvelle-categorie">Nouvelle catégorie</router-link>
    <div v-if="searchText">
      <ul v-if="searchResult" class="message-list">
        <li v-for="data in searchResult" :key="data.id" class="list-item">
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
    <ul v-else class="message-list">
      <li v-for="categorie in categories" :key="categorie.id" class="list-item">
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
<style scoped>

.form_group {
  position: relative;
  padding: 15px 0 0;
  margin: 10px 0 0 0;
  width: 15rem;
}

.form_field {
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 2px solid #9b9b9b;
  outline: 0;
  font-size: 1.3rem;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;
}
.form_field::placeholder {
  color: transparent;
}

.form_field:placeholder-shown ~ .form_label {
  font-size: 1.3rem;
  cursor: text;
  top: 20px;
}

.form_label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: #9b9b9b;
}
.form_field:focus ~ .form_label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: #11998e;
  font-weight:700;
}

.form_field:focus{
  padding-bottom: 6px;
  font-weight: 700;
  border-width: 3px;
  border-image: linear-gradient(to right, #11998e,#38ef7d);
  border-image-slice: 1;
}
</style>
