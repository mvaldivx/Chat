import Vuex   from 'vuex';
import Vue   from 'vue';

Vue.use(Vuex);
const store = new Vuex.Store({
    state:{
        port :'',
        ip:''
    },
    mutations:{
        setconfig(state,newState){
            state.ip = newState.ip,
            state.port = newState.port
        }
    },
    actions:{}
})
export default store