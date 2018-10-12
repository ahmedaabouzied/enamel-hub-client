// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import store from './store'
import firebase from 'firebase';
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify, { theme: {
  primary: '#2196F3',
  secondary: '#424242',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107'
}})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
var config = {
  apiKey: "AIzaSyDyJk3g5pc48JdPnJogvkNJ8YJbwdNO3xE",
  authDomain: "enamel-hub.firebaseapp.com",
  databaseURL: "https://enamel-hub.firebaseio.com",
  projectId: "enamel-hub",
  storageBucket: "enamel-hub.appspot.com",
  messagingSenderId: "465845246424"
};
var firebaseApp = firebase.initializeApp(config);