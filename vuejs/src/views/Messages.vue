<template>
  <div class="about">
    <div style="display: flex; align-items: center; justify-content: center; margin: 0 auto">
      <h1 style="margin-right: 1rem">Liste des messages</h1>
      <input type="text" v-model="searchText" placeholder="Rechercher un message">
    </div>
    <router-link to="/nouveau-message">Nouveau message</router-link>
    <div v-if="searchText">
      <ul class="message-list" v-if="searchResult">
        <li v-for="data in searchResult" :key="data.id">
         <div class="message-container">
           <div v-bind:class="['color-tag',data.category.color]"></div>
           <h2>{{data.title}} - {{ moment(data.createdAt).format('LLLL') }}</h2>
           <p>{{data.message}}</p>
           <router-link :to="{name:'categorie_messages', params: {id: data.id}}">
             {{data.category.label}}
           </router-link>
           |
           <button v-on:click="()=>{handleMessageDelete(message.id)}">Supprimer</button>
         </div>
        </li>
      </ul>
      <h2 v-else>Aucun résultat</h2>
    </div>
    <ul class="message-list" v-else>
      <li v-for="message in messages" :key="message.id">
        <div class="message-container">
          <div v-bind:class="['color-tag',message.category.color]"></div>
          <h2>{{message.title}} - {{ moment(message.createdAt).format('LLLL') }}</h2>
          <p>{{message.message}}</p>
          <router-link :to="{name:'categorie_messages', params: {id: message.id}}">
            {{message.category.label}}
          </router-link>
          |
          <button v-on:click="()=>{handleMessageDelete(message.id)}">Supprimer</button>
        </div>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
import {getMessages, searchByTitle, deleteMessage} from '../api/message'
import moment from "moment";

export default {
  name: 'Messages',
  data () {
    return {
      messages: null,
      searchResult:null,
      searchText: null,
      searchByLabelTimeout: null
    }
  },
  mounted () {
    this.fetchMessages()
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
    },
    moment(date) {
      moment.locale('fr');
      return moment(date);
    },
    async fetchMessages(){
      this.messages = await getMessages().then((response) => {
        console.log(response.data['hydra:member'])
        return response.data['hydra:member']
      })
    },
    handleMessageDelete(id){
      deleteMessage(id)
          .then(()=>{this.fetchMessages()})
    }
  },
  watch:{
    searchText: function(){
      this.getSearchResult()
    }
  }
}

</script>
