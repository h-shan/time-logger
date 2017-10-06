import Vue from 'vue';
import Vuex from 'vuex';
import VModal from 'vue-js-modal';
import modules from './modules';

Vue.use(Vuex);
Vue.use(VModal);

export default new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== 'production'
});
