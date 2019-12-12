<template>
    <v-container>
        <v-layout text-center wrap>
            <v-card class="mx-auto form" min-width="440" max-width="544" outlined>
                <v-list-item three-line>
                    <v-list-item-content>
                        <v-row>
                            <v-col cols="3" sm="3" md="3">
                                <v-select
                                v-model="codigoPais"
                                :items="['+52']"
                                label="codigo"
                                ></v-select>
                            </v-col>
                            <v-col cols="9" sm="9" md="9">
                                <v-text-field v-model="NumTel" label="Numero de telefono"></v-text-field>
                            </v-col>
                        </v-row>
                        <div id="recaptcha-container" class="captcha"></div>
                    </v-list-item-content>
                </v-list-item>
                <v-card-actions>
                    <v-btn text v-on:click="SignIn">Iniciar sesion</v-btn>
                </v-card-actions>
            </v-card>
        </v-layout>
        <v-dialog v-model="ingresaCodigo" max-width="490">
            <v-stepper v-model="registrarUsuario" value="1">
                <v-stepper-step :complete="registrarUsuario > 1" step="1"></v-stepper-step>
                <v-stepper-content step="1">

                    <v-card>
                        <v-card-title class="headline">Ingresa codigo de verificacion</v-card-title>
                        <v-card-actions>
                            <v-text-field v-model="codigoVerificacion"></v-text-field>
                            <v-spacer></v-spacer>
                            <v-btn color="green darken-1" text @click="ValidaCodigo">
                                Continuar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-stepper-content>
                <v-stepper-step step="2"></v-stepper-step>
                <v-stepper-content step="2">
                    <v-row>
                        <v-col cols="12" sm="12" md="12">
                            <span>Registrarse</span>
                        </v-col>
                    </v-row>
                     <v-row>
                        <v-col cols="12" sm="12" md="12">
                            <v-text-field v-model="usuario" label="Usuario"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-btn color="green darken-1" text @click="agregaUsuario">
                                Continuar
                    </v-btn>
                </v-stepper-content>
            </v-stepper>
        </v-dialog>
    </v-container>
</template>

<script>
    import firebase from 'firebase'
    import store from '../../../api/auth/store'
    import { db} from '../../../main'

    export default {

        name: 'InicioSesion',

        components: {},

        data: () => ({
            //
            recaptchaVerifier: firebase.auth.RecaptchaVerifier,
            ingresaCodigo: false,
            confirmationResult: null,
            codigoVerificacion: '',
            registrarUsuario: 1,
            usuario:'',
            NumTel:'',
            uid:'',
            codigoPais:''

        }),
        mounted() {
            var recaptcha = document.getElementById('recaptcha-container');
            this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(recaptcha);
        },
        methods: {
            SignIn() {
                if(this.NumTel != '' && this.NumTel.length > 9){
                    const appVerifier = this.recaptchaVerifier;
                    const phoneNumberString = this.codigoPais + this.NumTel;
                    firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
                    .then(confirmationResult => {
                        // SMS sent. Prompt user to type the code from the message, then sign the
                        // user in with confirmationResult.confirm(code).
                        this.confirmationResult = confirmationResult
                        this.ingresaCodigo = true
                    })
                    .catch(error => {
                        alert('error', error);
                    });
                }
            },
            ValidaCodigo() {
                this.confirmationResult.confirm(this.codigoVerificacion).then(r => {
                    db.collection('Usuarios').where('UID', '==', r.user.uid).onSnapshot((val) => {
                        if (val.docs.length < 1){
                            this.uid = r.user.uid
                            this.registrarUsuario = 2
                        }else{
                            var fields = val.docs[0]._document.proto.fields
                            store.commit('setUsuario',
                            {UID:fields.UID.stringValue, 
                            Telefono: fields.Telefono.stringValue,
                            Usuario: fields.Usuario.stringValue})
                            this.ingresaCodigo = false
                            this.$router.push('chat')
                        }
                    })

                })
            },
            agregaUsuario() {
                if(this.uid != '' && this.usuario != '' && this.NumTel != '' ){
                    firebase.firestore().collection('Usuarios').add({
                        UID: this.uid,
                        Usuario: this.usuario,
                        Telefono: this.NumTel
                    })
                    store.commit('setUsuario',
                    {
                        UID: this.uid,
                        Usuario: this.usuario,
                        Telefono: this.NumTel
                    })
                        this.ingresaCodigo = false
                        this.$router.push('chat')
                }           
            }
        }
    };
</script>

<style scoped>
    .form {
        margin-top: 50px;
    }
    .v-stepper__step{
        display:none;
    }
</style>