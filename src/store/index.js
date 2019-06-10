import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import user from './modules/user';
import pages from './modules/pages';
import order from './modules/order';
import chart from './modules/chart';
import menus from './modules/menus';
import permission from './modules/permission';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    pages,
    menus,
    order,
    chart
  },
  getters
});

export default store
