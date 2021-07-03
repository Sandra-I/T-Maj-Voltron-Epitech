<template>
  <div>
    <!-- Utilisateur connecté -->
    <div  class="container" v-if="isLogged == 'true'">
    <b-card title="Tout mes champs">
      <b-table striped hover :items="gridData" :fields="fields">
      </b-table>
      <b-button class="btn" variant="success" v-on:click="clickBtnAdd()"> Ajouter </b-button>
    </b-card>
    
    <!-- Ajouter un champs -->
    <b-card class= "card" v-if="actionBtnAdd" title="Ajouter un champs">
      <b-form class="form">
        <!-- Nom du champs -->
        <label for="nameField">Nom du champs</label>
        <b-form-input type="text" id="nameField" v-model="data.name"></b-form-input>
        <!-- Longueur du champs -->
        <label for="lengthField">Longueur du champs</label>
        <b-form-input type="text" id="lengthField" v-model="data.length"></b-form-input>
        <!-- Largeur du champs -->
        <label for="widthField">Largeur du champs</label>
        <b-form-input type="text" id="widthField" v-model="data.width" ></b-form-input>
        <!-- Resources -->
        <label for="resources">Ressource du champs</label>
        <b-form-input type="text" id="resources" v-model="data.resource"></b-form-input>
        <!-- Resources_types -->
        <label for="resources_types">Type de ressource du champs</label>
        <b-form-input type="text" id="resources_types" v-model="data.resource_type" ></b-form-input>
        <!-- Latitude -->
        <label for="latitude">Latitude du champs</label>
        <b-form-input type="text" id="latitude" v-model="data.lat" ></b-form-input>
        <!-- Longitude -->
        <label for="longitude">Longitude du champs</label>
        <b-form-input type="text" id="longitude" v-model="data.long"></b-form-input>
        <!-- Altitude -->
        <label for="altitude">Altitude du champs</label>
        <b-form-input type="text" id="altitude" v-model="data.altitude"></b-form-input>
      </b-form>
      <!-- Button-->
      <b-button class="btn" type="submit" variant="success" v-on:click="addField()">Valider</b-button>
      <b-button class="btn" variant="dark" v-on:click="clickBtnAdd()"> Fermer </b-button>
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
const axios = require('axios');

const baseURL = 'http://api-voltron.herokuapp.com/api';

export default {
  name: "MyField",
  components: {},
  data: function() {
    return {
      isLogged: false,
      actionBtnAdd: false,
      user: JSON.parse(localStorage.getItem('user')),
      data: {
        name:'',
        length:'',
        width:'',
        resource:'',
        resource_type:'',
        lat:'',
        long:'',
        altitude:'',
        user_id: JSON.parse(localStorage.getItem('user'))._id
      },
      fields: [
                    {
                        key: 'name',
                        label: 'Nom du champs'
                    },
                    {
                        key: 'resource',
                        label: 'Ressource'
                    },
                     {
                        key: 'resource_type',
                        label: 'Type de ressource'
                    },
                    ,
                     {
                        key: 'length',
                        label: 'Longueur'
                    },
                    ,
                     {
                        key: 'width',
                        label: 'Largeur'
                    },
                    ,
                     {
                        key: 'lat',
                        label: 'Latitude'
                    },
                    ,
                     {
                        key: 'long',
                        label: 'Longitude'
                    },
                    ,
                     {
                        key: 'altitude',
                        label: 'Altitude'
                    },

                ],
                gridData : Array
    };
  },
  //Méthodes de l'objet
  methods: {
    addField(){
      axios.post(`${baseURL}/fields`, this.data)
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {
            console.log(error.message)
        })
    },
    async myfields(){
      const response = await axios.get(`http://localhost:5000/api/fields/user/${this.user._id}`);
      this.gridData = response.data;
      this.myfields();
      console.log(response.data);
    },
    clickBtnAdd() {
      if (!this.actionBtnAdd){
        this.actionBtnAdd = true;
      }else {
        this.actionBtnAdd = false;
      }
    }
  },
  mounted(){
    this.myfields();
    this.isLogged = localStorage.getItem('isLogged');
    console.log("User id " + this.user._id);

  }
};
</script>

<style scoped>
.container{
  margin-top: 60px;
}
.btn{
  margin: 10px;
}
.form{
    margin: 10px;
    text-align: left;
}
.form input {
    margin: 10px 0px 10px 0px;
}
.card{
  margin-top:20px;
}
</style>