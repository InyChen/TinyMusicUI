import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import SideBar from '@/components/SideBar'
import Search from '@/components/Search'
import Player from '@/components/Player'

Vue.use(Router)

export default new Router({
  // mode: "history",
  routes: [
    {
      path: '/',
      name: 'Main',
      components: {
        default: Main,
        sidebar: SideBar
      }
    },
    {
      path: '/search',
      name: 'Search',
      components: {
        default: Search,
        sidebar: SideBar
      }
    },
    {
      path: '/player',
      name: 'Player',
      component: Player
    }
  ]
})
