<template>
  <div></div>
</template>
<script>
import router from "../router";

export default {
  name: 'Logout',
  mounted(){
      localStorage.removeItem('token')
      localStorage.removeItem('userData')
      router.push('/login')
  }
}
</script>
