import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import FilmList from '@/components/FilmList.vue';
import Film from '@/components/Film.vue';
Vue.use(VueRouter)

const routes = [
  {
    path: '/films/page/:pageNo',
    name: 'FilmList',
    component: FilmList,
    props: (route) => ({pageNo : Number(route.params.pageNo)})  
  },
  {
    path: '/film/:filmId',
    name: 'Film',
    component: Film,
    props: (route) => ({filmId : Number(route.params.filmId)})  
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
