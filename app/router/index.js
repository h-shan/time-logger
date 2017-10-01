import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello.vue'
import Accounts from '@/components/Accounts.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/accounts',
      name: 'Accounts',
      component: Accounts
    }
  ]
})
