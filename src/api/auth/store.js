import { db } from '../../main'
import Vuex     from 'vuex'
import Vue      from 'vue'

Vue.use(Vuex)


const store = new Vuex.Store({
    state:{
        usuario:{}
    },
    mutations:{
        setUsuario(state, newState){
            localStorage.usr = JSON.stringify(newState)
            state.usuario = newState
        }
    },
    actions:{
    }

})

export default store;