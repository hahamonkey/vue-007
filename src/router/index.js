import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/login'
import Navbar from '@/views/layout/components/Navbar'



Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      component: Navbar,
      name: 'Navbar',
    }
  ]
})


