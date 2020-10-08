import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/styles/tailwind.css';
import axios from 'axios'
import VueAxios from 'vue-axios'
import vuetify from './plugins/vuetify';
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

//  reference https://stackoverflow.com/questions/36170425/detect-click-outside-element
Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    el.clickOutsideEvent = function (event) {
      // here I check that click was outside the el and his children
      if (!(el == event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unbind: function (el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  },
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
