 
import Vue from 'vue'
import Router from 'vue-router'
import InicioSesion from './components/Pages/InicioSesion/InicioSesion'
import Chat from './components/Pages/chat/chat'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: InicioSesion
    },
    {
      path: '/chat',
      name: 'chat',
      component: Chat
    }
  ]
})