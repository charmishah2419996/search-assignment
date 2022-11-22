import Vue from 'vue'
import App from './App.vue'
import { store } from './store';
import ElementUI from 'element-ui';
Vue.config.productionTip = false

Vue.use(ElementUI);
console.log("HWEW")

new Vue({
  render: h => h(App),
  store,
}).$mount('#app')
