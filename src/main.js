import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Buefy from 'buefy'
import './registerServiceWorker'
import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'

Sentry.init({
  dsn: 'https://22e3f51844a248c4878e72c887a72fe8@sentry.io/1500618',
  integrations: [new Integrations.Vue({ Vue, attachProps: true })]
})

Vue.use(Buefy)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
