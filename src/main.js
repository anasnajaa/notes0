import Vue from 'vue';
import App from './App.vue';
import BootstrapVue from 'bootstrap-vue';
import UUID from 'vue-uuid';
import router from './router';
import store from './store';
import vueMoment from 'vue-moment';
//import './registerServiceWorker'

import '../custom.scss'

Vue.config.productionTip = false;

Vue.use(vueMoment);
Vue.use(UUID);
Vue.use(BootstrapVue);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
