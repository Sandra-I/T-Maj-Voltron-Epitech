<template>
  <div  class="container">
    <b-card title="Tout mes champs">
      <b-button class="btn" variant="danger"> Supprimer </b-button>
      <b-button class="btn" variant="success" v-on:click="clickBtnAdd()"> Ajouter </b-button>
    </b-card>
    
    <b-card v-if="actionBtnAdd" title="Ajouter un champs">
      <b-form @submit="onSubmit" @reset="onReset">
        <!-- Nom du champs -->
        <label for="nameField">Nom du champs</label>
        <b-form-input type="text" id="nameField" ></b-form-input>
        <!-- Longueur du champs -->
        <label for="lengthField">Longueur du champs</label>
        <b-form-input type="text" id="lengthField" ></b-form-input>
        <!-- Largeur du champs -->
        <label for="widthField">Largeur du champs</label>
        <b-form-input type="text" id="widthField" ></b-form-input>
        <!-- Resources -->
        <label for="resources">Ressource du champs</label>
        <b-form-input type="text" id="resources" ></b-form-input>
        <!-- Resources_types -->
        <label for="resources_types">Type de ressource du champs</label>
        <b-form-input type="text" id="resources_types" ></b-form-input>
        <!-- Latitude -->
        <label for="latitude">Latitude du champs</label>
        <b-form-input type="text" id="latitude" ></b-form-input>
        <!-- Longitude -->
        <label for="longitude">Longitude du champs</label>
        <b-form-input type="text" id="longitude" ></b-form-input>
        <!-- Altitude -->
        <label for="altitude">Altitude du champs</label>
        <b-form-input type="text" id="altitude" ></b-form-input>
        
        <!-- Button-->
        <b-button class="btn" type="submit" variant="success">Submit</b-button>
        <b-button class="btn" type="reset" variant="danger">Reset</b-button>
        
      </b-form>

      <b-button class="btn" variant="dark" v-on:click="clickBtnAdd()"> Fermer </b-button>
    </b-card>
    
    
  </div>
</template>

<script>
export default {
  name: "MyField",
  components: {},
  data: function() {
    return {
      actionBtnAdd: false
    };
  },
  //Méthodes de l'objet
  methods: {
    clickBtnAdd() {
      if (!this.actionBtnAdd){
        this.actionBtnAdd = true;
      }else {
        this.actionBtnAdd = false;
      }
    }
  }
};
</script>

<style scoped>
.container{
  margin:60px;
}
.btn{
  margin: 10px;
}
</style>