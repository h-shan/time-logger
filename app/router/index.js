import Vue from 'vue'
import Router from 'vue-router'
import Tasks from '@/components/Tasks.vue'
import Accounts from '@/components/Accounts.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/tasks' },
    {
      path: '/tasks',
      name: 'Tasks',
      components: {
        body: Tasks
      }
    },
    {
      path: '/accounts',
      name: 'Accounts',
      components: {
        body: Accounts
      }
    }
  ]
})
