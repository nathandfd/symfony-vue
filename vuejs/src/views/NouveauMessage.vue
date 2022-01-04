<template>
  <div class="about">
    <h1>Création d'un nouveau message</h1>
    <div v-if="confirm">
      Message ajouté avec succès !
    </div>
    <div>
      <label for="title">Titre</label>
      <input type="text" name="title" v-model="title"  id="title"/>
    </div>
    <div>
      <label for="message">Message</label>
      <input type="text" name="message" v-model="message"  id="message"/>
    </div>
    <div>
      <label for="category">Catégorie</label>
      <select v-model="category" name="category" id="category">
        <option v-for="category in categories" :key="category.id" :value="category['@id']">{{ category.label }}</option>
      </select>
    </div>
    <div>
      <button @click="newMessage">Ajouter</button>
    </div>
  </div>
</template>

<script>

import {postMessage} from '../api/message'
import {getCategories} from '../api/categorie'

export default {
  name: 'NouveauMessage',
  data () {
    return {
      title: '',
      message: '',
      categories: null,
      category: null,
      confirm: false
    }
  },
  mounted() {
    this.fetchCategories()
  },
  methods: {
    async newMessage() {
      let currentDate = new Date(Date.now())
      await postMessage({
        title: this.title,
        message: this.message,
        category: this.category,
        createdAt: currentDate.toISOString(),
      }).then((reponse) => {
        console.log(reponse)
        this.confirm = true
        this.$router.push('/messages') //redirection
      })
    },
    async fetchCategories(){
      await getCategories().then(data=>{
        this.categories = data.data['hydra:member']
      })
    }
  }
}

</script>
