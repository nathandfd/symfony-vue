<template>
  <div class="main-section">
    <div class="head-section">
      <div class="headLeft-section">
        <div class="headLeft-sub">
          <input type="text" name="search" v-model="searchCategoryText" placeholder="Rechercher une catégorie...">
          <button> <i class="fa fa-search"></i> </button>
        </div>
      </div>
      <div v-if="categorie" class="headRight-section">
        <div class="headRight-sub">
          <h3>Messages de {{categorie.label}}</h3>
          <input type="text" name="search" v-model="searchMessageText" placeholder="Rechercher un message...">
          <button> <i class="fa fa-search"></i> </button>
        </div>
      </div>
    </div>
    <div class="body-section">
      <div class="left-section mCustomScrollbar" data-mcs-theme="minimal-dark">
        <div class="add-category">
          <h3>Ajouter une catégorie</h3>
          <div class="add-category-form">
            <form>
              <input type="color" placeholder="Couleur..." v-model="couleur" value="#ffffff">
              <input type="text" placeholder="Label..." v-model="libelle">
              <button v-on:click="ajoutCategorie">Ajouter</button>
            </form>
          </div>
        </div>
        <h2 v-if="(!searchCategoryResult && searchCategoryText)">Aucun résultat</h2>
        <ul v-else>
          <li v-bind:class="(categorie && categorie.id === category.id)?'active':''" v-for="category in searchCategoryResult?searchCategoryResult:categories" :key="category.id" v-on:click="searchMessageText = null;fetchCategory(category.id)">
            <div class="chatList">
              <div v-bind:class="['color-tag']" v-bind:style="'--category-color:'+category.color"></div>
              <div class="desc">
                <h5>
                  {{category.label}} <span v-if="categorie && categorie.id === category.id">|</span> <button style="z-index: 1000; position: relative" v-if="categorie && categorie.id === category.id" v-on:click="handleCategoryDelete(categorie.id)">Supprimer</button>
                </h5>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="right-section">
        <div v-if="categorie" class="message mCustomScrollbar" data-mcs-theme="minimal-dark">
          <h2 v-if="(!searchMessageResult && searchMessageText)">Aucun résultat</h2>
          <ul v-else>
            <li v-for="message in searchMessageResult?searchMessageResult:categorie.messages" :key="message.id" v-bind:class="(message.user.email === userData.username)?'msg-right':'msg-left'">
              <div class="message-container msg-left-sub">
                <div v-bind:class="['color-tag',message.category.color]"></div>
                <div class="msg-desc">
                  <h2>{{message.title}}</h2>
                  <p>
                    {{message.message}}
                  </p>
                </div>
                <small>{{ moment(message.createdAt).format('LLLL') }} | {{message.user.email}} <span v-if="message.user.email === userData.username">|</span> <span style="cursor: pointer" v-if="message.user.email === userData.username" v-on:click="()=>{handleMessageDelete(message.id)}">Supprimer</span></small>
              </div>
            </li>
          </ul>
        </div>
        <div v-else>
          <h2>Selectionnez une catégorie pour voir les messages</h2>
        </div>
        <div v-if="categorie" class="right-section-bottom">
          <form>
            <input v-model="title" type="text" name="" placeholder="Titre du message...">
            <input v-model="message" type="text" name="" placeholder="Votre message...">
            <button v-on:click="newMessage" class="btn-send"><i class="fa fa-send"></i></button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getMessages, searchByTitle, deleteMessage, postMessage} from '../api/message'
import moment from "moment";
import {deleteCategory, getCategorie, getCategories, postCategorie, searchByLabel} from "../api/categorie";

export default {
  name: 'Messages',
  data () {
    return {
      messages: null,
      searchMessageResult:null,
      searchMessageText: null,
      searchMessageByLabelTimeout: null,
      searchCategoryResult:null,
      searchCategoryText: null,
      searchCategoryByLabelTimeout: null,
      userData: JSON.parse(localStorage.getItem("userData")),
      title: '',
      message: '',
      categories: null,
      category: null,
      categorie: null,
      couleur: '',
      libelle: '',
      confirm: false
    }
  },
  mounted () {
    this.fetchMessages()
    this.fetchCategories()
    setInterval(()=>{
      if (this.categorie){
        this.fetchCategory(this.categorie.id)
      }
    }, 5000)
  },
  methods:{
    getMessageSearchResult(){
      if (this.searchMessageText) {
        clearTimeout(this.searchMessageByLabelTimeout)
        this.searchMessageByLabelTimeout = setTimeout(()=>{
          searchByTitle(this.searchMessageText)
              .then(res => {
                this.searchMessageResult = res.data['hydra:member'].length?res.data['hydra:member']:null
              })
        }, 300)
      }else{
        this.searchMessageResult = null
      }
    },
    getCategorySearchResult(){
      if (this.searchCategoryText) {
        clearTimeout(this.searchCategoryByLabelTimeout)
        this.searchCategoryByLabelTimeout = setTimeout(()=>{
          searchByLabel(this.searchCategoryText)
              .then(res => {
                this.searchCategoryResult = res.data['hydra:member'].length?res.data['hydra:member']:null
                console.log(this.searchCategoryResult)
              })
        }, 300)
      }
      else{
        this.fetchCategories()
      }
    },
    moment(date) {
      moment.locale('fr');
      return moment(date);
    },
    async fetchMessages(){
      this.messages = await getMessages().then((response) => {
        return response.data['hydra:member']
      })
    },
    handleMessageDelete(id){
      deleteMessage(id)
          .then(()=>{this.fetchMessages()})
    },
    handleCategoryDelete(id){
      this.categorie = null
      deleteCategory(id)
          .then(()=>{
            this.fetchCategories().then(()=>{
              this.categorie = this.categories[0]
            })
          })
    },
    async newMessage(e) {
      e.preventDefault()
      let currentDate = new Date(Date.now())
      await postMessage({
        title: this.title,
        message: this.message,
        category: this.categorie['@id'],
        createdAt: currentDate.toISOString(),
      }).then(() => {
        this.title = null
        this.message = null
        this.fetchCategory(this.categorie.id)
      })
    },
    async fetchCategories(){
      await getCategories().then(data=>{
        this.categories = data.data['hydra:member']
      })
    },
    async fetchCategory (categoryId) {
      await getCategorie(categoryId).then((data) => {
        this.categorie = data.data
      })
    },
    async ajoutCategorie(e) {
      e.preventDefault()
      await postCategorie({
        color: this.couleur,
        label: this.libelle
      }).then(() => {
        this.couleur = null
        this.libelle = null
        this.fetchCategories()
      })
    },
  },
  watch:{
    searchMessageText: function(){
      this.getMessageSearchResult()
    },
    searchCategoryText: function(){
      this.getCategorySearchResult()
    }
  }
}

</script>

<style scoped>
template{
  font-family: 'Raleway', sans-serif;
  background-color: #ACCEDC;
  margin: 50px 0px;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.main-section small{
  font-size: 12px;
}
.main-section h3, .main-section h5{
  margin: 0px;
}
.main-section{
  width: 100%;
  background-color: #fff;
}
.head-section{
  border-bottom:1px solid #E6E6E6;
  clear: both;
  overflow: hidden;
  width: 100%;
}
.headLeft-section{
  width: calc(30% - 1px);
  float: left;
  border-right:1px solid #E6E6E6;
}
.headLeft-sub{
  padding: 15px;
  text-align: center;
}
.headLeft-sub input{
  width: 60%;
  border-radius: 0px;
  border:1px solid #E6E6E6;
  padding: 7px;
}
.headLeft-sub button{
  background: #009EF7;
  color: #fff;
  border:1px solid #E6E6E6;
  padding: 7px 15px;
}
.headRight-section{
  width: 70%;
  float: left;
  height: 100%;
}
.headRight-sub{
  padding: 10px 15px 0px 15px;
}
.body-section{
  overflow: hidden;
  width: 100%;
  display: flex;
  min-height: 78vh;
  max-height: 78vh;
  align-items: stretch;
  justify-content: center;
}
.left-section{
  width: calc(30% - 1px);
  float: left;
  border-right:1px solid #E6E6E6;
  background-color: #FFF;
  z-index: 1;
  position: relative;
  height: 100%;
}
.left-section ul{
  padding: 0px;
  margin: 0px;
  list-style: none;
}
.left-section ul li{
  padding: 1rem 0px;
  cursor: pointer;
  position: relative;
  background-color: lightgray;
  margin-bottom: 1rem;
}
.left-section ul li.active{
  background: #009EF7;
  color: #fff;
  position: relative;
}
.left-section ul li.active .desc .time{
  color: #fff;
}
.left-section ul li.active:before{
  position: absolute;
  content: '';
  right: -10px;
  border:5px solid #009EF7;
  top: 0px;
  bottom: 0px;
  border-radius: 0px 3px 3px 0px;
}
.left-section ul li.active:after{
  position: absolute;
  content: "";
  bottom: 0px;
  right: 0px;
  left: auto;
  width: 100%;
  top: 0px;
  -webkit-box-shadow: -8px 4px 10px #a1a1a1;
  -moz-box-shadow: -8px 4px 10px #a1a1a1;
  box-shadow: -8px 4px 10px #a1a1a1;
}
.left-section .chatList{
  overflow: hidden;
  min-height: 5rem;
}
.left-section .chatList .img i{
  position: absolute;
  font-size: 10px;
  color: #52E2A7;
  border:1px solid #fff;
  border-radius: 50%;
  left: 10px;
}
.left-section .chatList .desc{
  width: calc(100% - 60px);
  float: left;
  position: relative;
}
.left-section .chatList .desc h5{
  margin-top: 6px;
  line-height: 5px;
}
.left-section .chatList .desc .time{
  position: absolute;
  right: 15px;
  color: #c1c1c1;
}
.right-section{
  width: 70%;
  float: left;
  background-color: #F6F6F6;
  position: relative;
}
.message{
  height: calc(100% - 68px);
  font-family: sans-serif;
  overflow-y: scroll;

}
.message ul{
  padding: 0px;
  list-style: none;
  margin: 0px auto 2rem auto;
  width: 90%;
  overflow:hidden;
}
.message ul li{
  position: relative;
  width: 80%;
  padding: 15px 0px;
  clear: both;
}
.message ul li.msg-left{
  float: left;
}
.message ul li.msg-left img{
  position: absolute;
  width: 40px;
  bottom: 30px;
}
.message ul li.msg-left .msg-desc{
  margin-left: 70px;
  font-size: 12px;
  background: #E8E8E8;
  padding:5px 10px;
  border-radius: 5px 5px 5px 0px;
  position: relative;
}
.message ul li.msg-left .msg-desc:before{
  position: absolute;
  content: '';
  border:10px solid transparent;
  border-bottom-color: #E8E8E8;
  bottom: 0px;
  left: -10px;
}
.message ul li.msg-left small{
  float: right;
  color: #c1c1c1;
}
.message ul li.msg-right{
  float: right;
}
.message ul li.msg-right img{
  position: absolute;
  width: 40px;
  right: 0px;
  bottom: 30px;
}
.message ul li.msg-right .msg-desc{
  margin-right: 70px;
  font-size: 12px;
  background: #cce5ff;
  color: #004085;
  padding:5px 10px;
  border-radius: 5px 5px 5px 0px;
  position: relative;
}
.message ul li.msg-right .msg-desc:before{
  position: absolute;
  content: '';
  border:10px solid transparent;
  border-bottom-color: #cce5ff;
  bottom: 0px;
  right: -10px;
}
.message ul li.msg-right small{
  float: right;
  color: #c1c1c1;
  margin-right: 70px;
}
.message ul li.msg-day{
  border-top:1px solid #EBEBEB;
  width: 100%;
  padding: 0px;
  margin: 15px 0px;
}
.message ul li.msg-day small{
  position: absolute;
  top: -10px;
  background: #F6F6F6;
  color: #c1c1c1;
  padding: 3px 10px;
  left: 50%;
  transform: translateX(-50%);
}
.right-section-bottom{
  background: #fff;
  width: 100%;
  padding: 15px;
  position: absolute;
  bottom: 0;
  border-top:1px solid #E6E6E6;
  text-align: center;
}

.right-section-bottom form{
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.right-section-bottom input{
  border:0px;
  padding:8px 5px;
  flex: 1 1 100%;
}
.right-section-bottom .btn-send{
  border:0px;
  padding: 8px 10px;
  float: right;
  margin-right: 30px;
  color: #009EF7;
  font-size: 18px;
  background: #fff;
  cursor: pointer;
}

.add-category{
  margin: 1rem 0;
}

.add-category-form form{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.add-category-form input{
  border:0px;
  padding:8px 5px;
  width: 100%;
}

.add-category-form input[type=color]{
  width: 5rem;
}

</style>
