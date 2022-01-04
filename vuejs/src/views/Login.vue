<template>
  <div class="about">
    <h1>Connexion</h1>
    <form action="#" style="display: flex; flex-direction: column; flex: 1 1 0; width: 40%; margin: 0 auto">
      <label for="login">Identifiant :</label>
      <input type="email" name="login" id="login" style="margin-bottom: 2rem" v-model="login">
      <label for="password">Mot de passe :</label>
      <input type="password" name="password" id="password" style="margin-bottom: 2rem" v-model="password">
      <input type="submit" value="Connexion" v-on:click="getToken">
    </form>
  </div>
</template>
<script>
import router from "../router";

export default {
  name: 'Login',
  data(){
    return{
      login:null,
      password:null
    }
  },
  methods: {
    getToken(e){
      e.preventDefault()
      fetch("http://localhost:8083/authentication_token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.login,
          password: this.password,
        }),
      })
          .then(res=>res.json())
          .then(data=>{
            localStorage.setItem("userData", atob(data.token.split('.')[1]))
            this.userData = atob(data.token.split('.')[1])
            localStorage.setItem("token",data.token)
            router.push('/')
          })
    },
  }
}
</script>
