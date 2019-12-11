import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import page404 from '@/views/404'
import Team from '@/views/Team'
import AddGame from '@/views/AddGame'
import Player from '@/views/Player'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/team/:id',
    name: 'Team',
    component: Team
  },
  {
    path: '/team/:id/add-game',
    name: 'Add game',
    component: AddGame
  },
  {
    path: '/team/:teamID/:playerID',
    name: 'Player',
    component: Player
  },
  {
    path: '*',
    component: page404
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
