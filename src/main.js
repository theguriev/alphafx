import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueCompositionApi from '@vue/composition-api'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import '@/assets/css/reset.css'
import '@/assets/css/variables.css'
import '@/assets/css/style.css'
import '@/assets/css/element.css'

Vue.config.productionTip = false
Vue.use(ElementUI, { locale })
Vue.use(VueCompositionApi)

console.log(process.env.VUE_APP_API_URL)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
