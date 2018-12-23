import Vue from 'vue';
import App from './App.vue';
import router from './_router/router';
import store from './_store/store';
import './registerServiceWorker';

// Global site imports and variables
import { sync } from 'vuex-router-sync';

import './styles/quasar.styl';
import 'quasar-framework/dist/quasar.ie.polyfills';
import iconSet from 'quasar-framework/icons/fontawesome';
import 'quasar-extras/animate';
import 'quasar-extras/roboto-font';
import 'quasar-extras/material-icons';
import 'quasar-extras/fontawesome';
import 'quasar-extras/ionicons';
import 'quasar-extras/mdi';
// Quasar import this way will have to do for now.
import Quasar, * as All from 'quasar-framework/dist/quasar.mat.esm.js';

Vue.use(Quasar, {
  components: All,
  directives: All,
  plugins: All,
});

sync(store, router);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
