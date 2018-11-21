// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import Cookies from 'js-cookie'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import i18n from './lang' // Internationalization

import App from './App'
import router from './router'
import store from './store'

import '@/icons'

Vue.config.productionTip = false

Vue.use(Element, {
  size: Cookies.get('size') || 'medium',// 设置element-ui默认尺寸
  i18n: (key, value) => i18n.t(key, value)
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})
