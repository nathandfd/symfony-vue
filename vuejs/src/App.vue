<template>
  <div id="app">
    <div id="nav" v-if="userData.userData">
      <router-link to="/">Home</router-link>
      |
      <router-link to="/categories">Catégories</router-link>
      |
      <router-link to="/messages">Messages</router-link>
      |
      <router-link to="/recherche">Recherche</router-link>
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
      userData:localStorage
    }
  },

}
</script>

<style>
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

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
