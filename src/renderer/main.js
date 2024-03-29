/*  eslint-env node */
import Vue from 'vue';
import axios from 'axios';
import Toasted from 'vue-toasted';

import App from './App';
import router from './router';
import store from './store';
import db from './datastore';
require('semantic');
require('semantic-ui-css/semantic.css');
require('semantic-ui-css/semantic.js');
if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

Vue.use(Toasted, {
  position: 'bottom-right',
  duration: 3000
});

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app');

Vue.prototype.$db = db;
