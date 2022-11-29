import Vue from "vue";
import Vuex from "vuex";

import personListStore from "./module/personListStore";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    personListStore,
  },
});
