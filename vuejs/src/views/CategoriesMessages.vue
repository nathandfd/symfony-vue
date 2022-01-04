<template>
  <div class="about">
    <h1>Liste des messages de la catégorie : {{ categorie.libelle }}</h1>
    <h2>Les messages</h2>
    <article class="message-container" v-for="message in categorie.messages" :key="message.id">
      <h2>{{message.title}} - {{ moment(message.createdAt).format('LLLL') }}</h2>
      <p>{{message.message}}</p>
      <button v-on:click="()=>{handleMessageDelete(message.id)}">Supprimer</button>
    </article>
  </div>
</template>

<script>

import {getCategorie} from '../api/categorie'
import moment from "moment";
import '../assets/css/style.css'

export default {
  name: 'CategoriesMessages',
  data () {
    return {
      categorie: {},
    }
  },
  watch: {
    $route () {
      this.actualiseCategorie()
    }
  },
  async mounted () {
    this.actualiseCategorie()
  },
  methods: {
    moment(date) {
      moment.locale('fr');
      return moment(date);
    },
    async actualiseCategorie () {
      this.categorie = await getCategorie(this.$route.params.id).then((response) => {
        return response.data
      })
    }
  }
}

</script>
