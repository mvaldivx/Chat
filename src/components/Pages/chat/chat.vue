<template>
    <v-container>
        <v-layout text-center wrap>
            <div class="chat" id="chat">
                <div class="mensaje" v-for="(msg,i) in Mensajes" :key="i">
                    <v-row>
                        <v-col cols="2" sm="2" md="2" class="avatar">
                            <v-avatar color="#796aa3" size="35">
                                <span class="white--text">{{msg.nombre.substring(0,2)}}</span>
                            </v-avatar>
                        </v-col>
                        <v-col cols="10" sm="10" md="10" class="content">
                            <div class="usuario">{{msg.nombre}}, {{formatDate(msg.fecha)}}</div>
                            <div class="relleno">
                                <div class="texto">{{msg.mensaje}}</div>
                            </div>
                        </v-col>
                    </v-row>
                </div>
            </div>
            <v-row>
                <v-col cols="10" sm="10" md="10" class="mensajes" >
                        <v-textarea
                        outlined
                        rows="1"
                        row-height="15"
                        height="13"
                        v-model="mensaje"
                        v-on:keydown="keydowntextarea($event)"
                        ></v-textarea>
                </v-col>
                <v-col cols="2" sm="2" md="2" class="btnEnviar" >
                    <v-btn height="55" color="#3b76d8" v-on:click="sendMessage"> <v-icon color="white">mdi-send</v-icon></v-btn>
                </v-col>
            </v-row>
        </v-layout>
    </v-container>
</template>

<script>
import StoreAuth from '../../../api/auth/store'
import store from './store'
import io from 'socket.io-client';
import config from '../../../api/config'

export default {
    name: 'chat',

    components: {},

    data: () => ({
        mensaje:'',
        socket : io(config.SERVER_CLIENT_IP + ':' + config.SERVER_CLIENT_PORT)
    }),
    computed:{
        Mensajes:{
            get(){
                this.updateScroll()
                return store.state.mensajes
            },
            set(data){
                store.commit('setMensajes',data)
            }
            
        }
    },
    mounted(){
        
        if(!StoreAuth.state.usuario.Usuario){
            this.$router.replace('/')
        }else{
            store.dispatch('getMessage')
            this.socket.on('message',(data)=>{
                this.Mensajes = [...this.Mensajes, data]
            })
            
        }
    },
    methods:{
        sendMessage(){
            if(this.mensaje != ''){
                var usr = StoreAuth.state.usuario
                var msg = {nombre: usr.Usuario, UID: usr.UID, mensaje: this.mensaje, fecha: new Date()}
                store.dispatch('sendMessage',msg).then(()=>{
                    this.mensaje = ''
                })
            }
        },
        formatDate(date){
            var d = new Date(date);
            return (d.getHours() > 12 ? d.getHours() - 12 : d.getHours()) + ':' + d.getMinutes() + ' ' + (d.getHours() > 12 ? 'p.m.' : 'a.m.') 
        },
        updateScroll(){
            var scroll = document.getElementById('chat')
            if(scroll){
                setTimeout(()=>{
                    scroll.scrollTo(0,scroll.scrollHeight)
                },10)
                
            }
                
        },
        keydowntextarea(event){
            if(event.key === 'Enter'){
                this.sendMessage()
            }
        }
    }
}
</script>

<style scoped>
.chat{
    background-color:#fffcf5;
    width:100vw;
    height:70vh;
    border-style:solid;
    border-width: thin;
    border-radius: 5px;
    border-color: #cfcfcf;
    overflow-x: auto;
}

.btnEnviar{
    padding-left: 0; 
}
.mensajes{
    padding-right: 0; 
}

.mensajes, .btnEnviar{
    padding-top: 5px;
    margin-bottom:0;
    padding-bottom: 0;
    height: 15vh;
}
.mensajes .v-input, .mensajes .v-input__control{
    height: 13vh;
}

.mensaje{
    width: 300px;
    margin: 5px;
    min-height: 45px;
}
.mensaje .usuario{
    text-align: initial;
    margin-left:5px;
    font-size: .85em;
}
.relleno{
    background-color: #b8cff5;
    border-radius: 7px;
    min-height: 30px;
    width: fit-content;
}
.texto{
    padding-left:10px;
    padding-right: 10px;
    text-align: initial;
}
.avatar{
    padding-right:0;

}
.content{
    padding-left:0;
}
</style>