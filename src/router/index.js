import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/login'
import Layout from '@/views/layout/Layout'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '',
      component: Layout,
      redirect: 'dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: () => import('@/views/dashboard/index'),
          // meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
        }
      ]
    }
  ]
})


