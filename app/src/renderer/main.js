import Vue from 'vue'
import VueMaterial from 'vue-material'
import Electron from 'vue-electron'
import Router from 'vue-router'

import App from './App'
import VueMaterialCss from './assets/style/vue-material.css'
import MaterialIcon from './assets/style/icon.css'
import routes from './routes'

Vue.use(VueMaterial)
Vue.use(Electron)
Vue.use(Router)
Vue.config.debug = true

Vue.material.registerTheme({
  default: {
    primary: {
      color: 'blue',
      hue: 900
    },
    accent: {
      color: 'orange',
      hue: 'A700'
    }
  },
  field: {
    primary: {
      color: 'orange',
      hue: 'A700'
    }
  }  
})

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes
})

/* eslint-disable no-new */
new Vue({
  router,
  ...App
}).$mount('#app')