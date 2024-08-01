import { createApp } from 'vue'

import 'vuetify/styles'
import "vue3-toastify/dist/index.css";
import './assets/main.css'
// Vuetify
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import router from './router'

// Components
import App from './App.vue'

import LoadingSpinner from './components/loading-spinner/LoadingSpinner.vue';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'

/* import specific icons */
import { faChevronRight ,faCircleCheck, faEye, faPenToSquare, faTrash} from '@fortawesome/free-solid-svg-icons'
library.add([faChevronRight,faCircleCheck, faEye, faPenToSquare, faTrash])

import ability from './ability';
import { abilitiesPlugin } from '@casl/vue';

const vuetify = createVuetify({
  components,
  directives,
})

createApp(App)
  .use(router)
  .use(vuetify)
  .use(abilitiesPlugin, ability)
  .component('loading-spinner', LoadingSpinner)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount('#app')

