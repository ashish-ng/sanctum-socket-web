/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
window.Vue = require('vue');
import router from "./router/index.js";
import store from "./store/index.js";

window.Vue.config.productionTip = false;

Vue.component('app-component', require('./views/App.vue').default);

const app = new Vue({
    router,
    store
}).$mount('#app')

window.Echo.channel('chat')
  .listen('MessageSent', (e) => {
    store.commit('setMessage', {
        message: e.message.message,
        user: e.user
      });
  });
