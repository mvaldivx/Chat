<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <span class="mr-2">Maurisoft ®</span>
      </div>
      <v-spacer></v-spacer>
      <div class="d-flex align-center" v-if="getUsuario.Usuario">
        <span class="mr-2" v-if="!modificaNombre">{{getUsuario.Usuario}}
        </span>
        <v-text-field height="15" style="padding-top: 20px; width:120px; margin-left:10px;" single-line
         v-if="modificaNombre" v-model="getUsuario.Usuario">
        </v-text-field>
        
        <v-btn small text icon v-if="!modificaNombre" v-on:click="modificarNombre" >
              <v-icon size="15">mdi-pencil</v-icon>
        </v-btn>
        <v-btn small text icon v-if="modificaNombre" v-on:click="NombreModificado">
              <v-icon size="15">mdi-check</v-icon>
        </v-btn>
        <v-btn text icon v-on:click="logout">
              <v-icon>mdi-power</v-icon>
        </v-btn>
      </div>
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import StoreAuth from './api/auth/store'
import {db} from './main'
import storeconfig from './api/store'
export default {
  name: 'App',

  data: () => ({
    //
    modificaNombre:false
    
  }),
    computed:{
      getUsuario:{
        get(){
          return StoreAuth.state.usuario
        },
        set(dat){
          StoreAuth.commit('setUsuario',dat)
        }
        
      }
    },
    methods:{
      modificarNombre(){
        this.modificaNombre = true
      },
      NombreModificado(){
        this.getUsuario = this.getUsuario
        this.modificaNombre = false
      },
      logout(){
        StoreAuth.commit('setUsuario',{})
        localStorage.removeItem('usr')
        this.$router.push('/')
      }
    },
    created(){
      if(!StoreAuth.state.usuario.Usuario){
        if(localStorage.usr){
           StoreAuth.commit('setUsuario',JSON.parse(localStorage.usr))
           if(this.$router.currentRoute.fullPath != '/chat')
            this.$router.push('chat')
        }
      }
    }
};
</script>

<style scoped>

</style>
