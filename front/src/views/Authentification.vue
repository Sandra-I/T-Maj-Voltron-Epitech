<template>
  <div>
      <div class="container" v-if="mode=='login'">
      <b-card bg-variant="dark" text-variant="white" title="Connexion">
        <b-form class="form">
            <!-- Login -->
            <label for="login"> Login </label>
            <b-form-input id="login" v-model="dataLogin.login"> </b-form-input>

            <!-- Password -->
            <label for="password"> Mot de passe </label>
            <b-form-input id="password" v-model="dataLogin.password"> </b-form-input>
        </b-form>
        
        <b-button variant="primary" v-on:click="connect()">Valider</b-button>
        <b-card-footer class="card-footer">
            Tu n'as pas encore de compte?
            <span @click="switchToRegister()"> Créer un compte</span>
        </b-card-footer>
      </b-card>
  </div>
   <div class="container" v-if="mode =='register'">
      <b-card bg-variant="dark" text-variant="white" title="Inscription">
        <b-form class="form">
            <!-- Firstname -->
            <label for="firstname"> Prenom </label>
            <b-form-input id="firstname" v-model="dataRegister.firstname"> </b-form-input>

            <!-- Lastname -->
            <label for="lastname"> Nom </label>
            <b-form-input id="lastname" v-model="dataRegister.lastname"> </b-form-input>

            <!-- Login -->
            <label for="login"> Login </label>
            <b-form-input id="login"  v-model="dataRegister.login"> </b-form-input>

            <!-- Password -->
            <label for="pwd"> Mot de passe </label>
            <b-form-input id="pwd" type="password" v-model="dataRegister.password"> </b-form-input>
 
        </b-form>
        
        <b-button variant="primary" v-on:click="register()">Valider</b-button>
        <b-card-footer class="card-footer">
            Vous avez déjà un compte?
            <span @click="switchToLogin()"> Connectez-vous!</span>
        </b-card-footer>
      </b-card>
  </div>
  </div>
</template>

<script>
const axios = require('axios');

const baseURL = 'http://api-voltron.herokuapp.com/api';

export default {
  name: "Authentification",
  data: function() {
      return {
          dataLogin: {
            login: '',
            password: ''
          },
          dataRegister:{
            login: '',
            password: '',
            firstname: '',
            lastname: ''
          },
          mode: 'login'
        }
  },
  //Méthodes de l'objet
  methods: {
    connect(){
        axios.post(`${baseURL}/login`, this.dataLogin)
        .then(response => {
            localStorage.setItem('user', JSON.stringify(response.data));
            localStorage.setItem('isLogged', true); 
            this.$router.push('/myField');
        })
        .catch(error => {
            console.log(error.message)
        })
    },
    register(){
        axios.post(`http://localhost:5000/api/register`, this.dataRegister)
        .then(response => {
            localStorage.setItem('user', JSON.stringify(response.data));
            localStorage.setItem('isLogged', true);;
            this.$router.push('/myField');
        })
        .catch(error => {
            console.log(error.message)
        })
    },
    switchToLogin(){
        this.mode='login'
    },
    switchToRegister(){
        this.mode='register'
    }
  },
  mounted () {
      console.log("isLogged : " + localStorage.getItem('isLogged'))
  }
  
};
</script>

<style scoped>
.container{
  margin-top: 60px;
}
.form{
    margin: 10px;
    text-align: left;
}
.form input {
    margin: 10px 0px 10px 0px;
}
.card-footer{
    margin-top: 10px;
}
</style>