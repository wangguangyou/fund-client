// import 'core-js/stable';
// import 'regenerator-runtime/runtime';

import 'modern-normalize/modern-normalize.css';
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'
import 'boxicons/css/boxicons.min.css'
if (!Element.prototype.matches)
  Element.prototype.matches = Element.prototype.msMatchesSelector ||
  Element.prototype.webkitMatchesSelector;

if (!Element.prototype.closest)
  Element.prototype.closest = function (s) {
    var el = this;
    if (!document.documentElement.contains(el)) return null;
    do {
      if (el.matches(s)) return el;
      el = el.parentElement;
    } while (el !== null);
    return null;
  };
Vue.use(Vuesax, {
  // options here
})

Vue.config.productionTip = false
Vue.config.devtools = true;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');