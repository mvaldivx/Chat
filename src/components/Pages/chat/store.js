import Vuex   from 'vuex';
import Vue   from 'vue';
import ApiMessages from '../../../api/Messages/messagesApi'

Vue.use(Vuex);
const store = new Vuex.Store({
    state:{
        mensajes:[]
    },
    mutations:{
        setMensajes(state, newState){
            state.mensajes = newState
        }
    },
    actions:{
        sendMessage({commit},data){
            ApiMessages.sendMessage(data).then(()=>{
                return true
            })
        },
        getMessage({commit}){
            ApiMessages.getMessages().then(data=>{
                return commit('setMensajes',data.data)
            }).catch(err=>{
                console.log('error',err)
            })
        }
    }
})
export default store