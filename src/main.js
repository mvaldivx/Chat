import Vue from 'vue'
import App from './App.vue'

import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import VueFirestore from 'vue-firestore'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import * as firebase from 'firebase';
import  'firebase/firestore'

Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: "AIzaSyD7tRyOenKduf1neTipLIuY541O5_eI92I",
  authDomain: "wschat-9e0c1.firebaseapp.com",
  databaseURL: "https://wschat-9e0c1.firebaseio.com",
  projectId: "wschat-9e0c1",
  storageBucket: "wschat-9e0c1.appspot.com",
  messagingSenderId: "898721662534",
  appId: "1:898721662534:web:d682b07225fc39c9be6c47"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore()

new Vue({
  router,
  store,
  vuetify,
  VueFirestore,
  icons:{
    iconfont: 'mdi'
  },
  render: h => h(App)
}).$mount('#app')
  

         
  