import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import animated from 'animate.css'
import VueWow from 'vue-wow'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSweetalert2 from 'vue-sweetalert2'
import 'vue2-animate/dist/vue2-animate.min.css'
import draggable from 'vuedraggable'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChevronUp, faPlaceOfWorship, faHorse, faAtlas, faAtom, faSignInAlt, faSignOutAlt, faUser, faPen, faTrashAlt, faUndo, faSave } from '@fortawesome/free-solid-svg-icons'
import { faAlgolia } from '@fortawesome/free-brands-svg-icons'

import './plugins/bootstrap-vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './style/style.scss'

// axios 預設傳送認證資訊
axios.defaults.withCredentials = true

Vue.config.productionTip = false

Vue.use(animated)
Vue.use(VueWow)
Vue.use(VueAxios, axios)
Vue.use(VueSweetalert2)

library.add(faChevronUp, faPlaceOfWorship, faHorse, faAlgolia, faAtlas, faAtom, faSignInAlt, faSignOutAlt, faUser, faPen, faTrashAlt, faUndo, faSave)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('draggable', draggable)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
