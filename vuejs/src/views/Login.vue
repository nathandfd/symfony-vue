<template>
  <div>
    <div class="background">
      <div class="shape"></div>
      <div class="shape"></div>
    </div>
    <form>
      <h3>Connexion</h3>

      <label for="login">E-mail</label>
      <input type="text" placeholder="E-mail" id="login" v-model="login">

      <label for="password">Mot de passe</label>
      <input type="password" placeholder="Mot de passe" id="password" v-model="password">

      <button v-on:click="getToken">Connexion</button>
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
<style scoped>
 *,
 *:before,
 *:after{
   padding: 0;
   margin: 0;
   box-sizing: border-box;
 }
body{
  background-color: #080710;
}
.background{
  width: 430px;
  height: 520px;
  position: absolute;
  transform: translate(-50%,-50%);
  left: 50%;
  top: 50%;
}
.background .shape{
  height: 200px;
  width: 200px;
  position: absolute;
  border-radius: 50%;
}
.shape:first-child{
  background: linear-gradient(
      #1845ad,
      #23a2f6
  );
  left: -80px;
  top: -80px;
}
.shape:last-child{
  background: linear-gradient(
      to right,
      #ff512f,
      #f09819
  );
  right: -30px;
  bottom: -80px;
}
form{
  height: 520px;
  width: 400px;
  background-color: rgba(255,255,255,0.13);
  position: absolute;
  transform: translate(-50%,-50%);
  top: 50%;
  left: 50%;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255,255,255,0.1);
  box-shadow: 0 0 40px rgba(8,7,16,0.6);
  padding: 50px 35px;
}
form *{
  font-family: 'Poppins',sans-serif;
  color: black;
  letter-spacing: 0.5px;
  outline: none;
  border: none;
}
form h3{
  font-size: 32px;
  font-weight: 500;
  line-height: 42px;
  text-align: center;
}

label{
  display: block;
  margin-top: 30px;
  font-size: 16px;
  font-weight: 500;
}
input{
  display: block;
  height: 50px;
  width: 100%;
  background-color: rgba(255,255,255,0.07);
  border-radius: 3px;
  padding: 0 10px;
  margin-top: 8px;
  font-size: 14px;
  font-weight: 300;
  border: 1px solid black;
}
::placeholder{
  color: black;
}
button{
  margin-top: 50px;
  width: 100%;
  background-color: black;
  color: white;
  padding: 15px 0;
  font-size: 18px;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
}

</style>
