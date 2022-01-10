<template>
  <div id="app">
    <div id="nav" v-if="userData.userData">
      <router-link to="/">Conversations</router-link>
      |
      <router-link to="/user-messages">Mes messages</router-link>
      |
      <router-link to="/logout">Déconnexion</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => {
    return {
      userData:localStorage,
    }
  },

}
</script>

<style>
@import url("./assets/css/style.css");
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
