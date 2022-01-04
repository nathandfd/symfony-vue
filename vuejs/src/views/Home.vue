<template>
  <div class="home">
    <h1>Bienvenue sur ce truc</h1>
    <div style="display: flex; align-items: center; justify-content: center; margin: 0 auto">
      <input type="text" v-model="searchText" placeholder="Rechercher un message">
    </div>
    <div v-if="searchText">
      <ul v-if="searchResult">
        <li v-for="data in searchResult" :key="data.id">
          <router-link :to="{name:'categorie_messages', params: {id: data.id}}">
            {{data.title}}
          </router-link>
        </li>
      </ul>
      <h2 v-else>Aucun résultat</h2>
    </div>
    <ul v-else>
      <li v-for="message in messages" :key="message.id">
        <router-link :to="{name:'categorie_messages', params: {id: message.id}}">
          {{message.title}}
        </router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
import {searchByTitle} from '../api/message'

export default {
  name: 'Home',
  data(){
    return{
      searchResult:null,
      searchText: null,
      searchByLabelTimeout: null
    }
  },
  methods:{
    getSearchResult(){
      this.tempSearchText = this.searchText.toString()
      if (this.searchText) {
        clearTimeout(this.searchByLabelTimeout)
        this.searchByLabelTimeout = setTimeout(()=>{
          searchByTitle(this.searchText)
              .then(res => {
                this.searchResult = res.data['hydra:member'].length?res.data['hydra:member']:null
              })
        }, 300)
      }
    }
  },
  watch:{
    searchText: function(){
      this.getSearchResult()
    }
  }
}
</script>
