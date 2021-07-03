<template>
  <div>
    <!-- Utilisateur connecté -->
    <div class="container" v-if="isLogged == 'true'">
    <b-card title="Mes informations">
      <b-card-text style="text-align: left;">
        Votre nom : {{user.lastname}} <br>
        Votre prénom : {{user.firstname}} <br>
        Votre login : {{user.login}} <br>
      </b-card-text>
    </b-card>
  </div>
  <!-- Utilisateur non connecté -->
  <div class="container" v-if="isLogged == 'false'" >
     <b-card title="Vous devez être connecté">
       <router-link to="/">
        <b-button class="btn" variant="dark" routerLink> Connexion </b-button>
       </router-link>
     </b-card>
  </div>
  </div>
</template>

<script>


export default {
  name: "MyAccount",
  data() {
    return {
      isLogged: false,
      user: JSON.parse(localStorage.getItem('user'))
    }
  },
  mounted () {
      this.isLogged = localStorage.getItem('isLogged');
  }
};
</script>

<style scoped>
.container{
  margin-top: 60px;
}
</style>