import Vue from "vue";
import Vuex from "vuex";

import todostore from "./module/todostore";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    todostore,
  },
});
