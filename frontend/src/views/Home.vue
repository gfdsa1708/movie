<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  created () {
    this.$http.get('/api/actor')
    .then((res) => {
      console.log(res.data);
      }
        ,(err) => {console.log(err)})
    .catch((err) => {console.log(err)});
  },
}
</script>
