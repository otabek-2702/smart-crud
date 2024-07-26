import { createApp } from 'vue'

// Vuetify
import 'vuetify/styles'
import './assets/main.css'
import "vue3-toastify/dist/index.css";
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Components
import App from './App.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import router from './router'
import LoadingSpinner from './components/loading-spinner/LoadingSpinner.vue';

const vuetify = createVuetify({
  components,
  directives,
})


createApp(App)
  .use(router)
  .use(vuetify)
  .component('loading-spinner', LoadingSpinner)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount('#app')

