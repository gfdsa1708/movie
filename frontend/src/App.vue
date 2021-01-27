<template>
  <v-app>
    <Header></Header>
    <v-main>
      <FilmList/>
    </v-main>
  </v-app>
</template>

<script>
import FilmList from './components/FilmList';
import Header from '@/components/Header.vue';

export default {
  name: 'App',

  components: {
    FilmList,
    Header
  },

  data: () => ({
    //
  }),
};
</script>
