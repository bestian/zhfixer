import Vue from 'vue'
import App from './App.vue'
import autofocus from 'vue-autofocus-directive'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './registerServiceWorker'

Vue.use(VueAxios, axios)

Vue.directive('autofocus', autofocus)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
