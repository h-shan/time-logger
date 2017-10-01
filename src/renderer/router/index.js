import Vue from 'vue';
import Router from 'vue-router';

import Tasks from '@/components/Tasks';
import Accounts from '@/components/Accounts';
import Payable from '@/components/Payable';
import Jira from '@/components/Jira';
// import RegisterAccount from '@/components/RegisterAccount'

Vue.use(Router);

export default new Router({
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
      },
      children: [
        {
          path: '',
          redirect: 'payable'
        },
        {
          path: 'payable',
          name: 'Payable',
          components: {
            body: Payable
          }
        },
        {
          path: 'jira',
          name: 'Jira',
          components: {
            body: Jira
          }
        }
      ]
    }
  ]
});
