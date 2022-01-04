<template>
  <div class="about">
    <h1>Mes messages</h1>
    <ul class="message-list" v-if="messages">
      <li v-for="data in messages" :key="data.id">
        <div class="message-container">
          <div v-bind:class="['color-tag',data.category.color]"></div>
          <h2>{{data.title}} - {{ moment(data.createdAt).format('LLLL') }}</h2>
          <p>{{data.message}}</p>
          <router-link :to="{name:'categorie_messages', params: {id: data.id}}">
            {{data.category.label}}
          </router-link>
          |
          <button v-on:click="()=>{handleMessageDelete(data.id)}">Supprimer</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {getMessages} from "../api/user";
import moment from "moment";
import {deleteMessage} from "../api/message";

export default {
  name: "UserMessages",

  data: () => {
    return {
      messages:null
    }
  },
  mounted() {
    this.getUserMessages()
  },
  methods:{
    getUserMessages(){
      getMessages()
          .then(res => {
            this.messages = res.data['hydra:member'][0]["messages"]
            console.log(res.data['hydra:member'][0]["messages"])
          })
      },
    moment(date) {
      moment.locale('fr');
      return moment(date);
    },
    handleMessageDelete(id){
      deleteMessage(id)
          .then(()=>{this.getUserMessages()})
      }
    }
}
</script>
