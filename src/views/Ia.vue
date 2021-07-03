<template>
  <div class="card">
    <h1 class="card__title">Santé des vignes</h1>
    <p class="card__subtitle">Malade ou pas malade ?</p>
    <img v-if="isSick" :src="'data:image/jpeg;base64,'+ base64"/>
    <div class="card__subtitle">
      <p v-if="isSick">
        Maladie potentielle repérée sur les vignes !
      </p>
      <p v-else>
        Pas de maladie repérée sur les vignes !
      </p>
    </div>
  </div>
</template>

<script>
const axios = require('axios');

export default {
  name: 'Ia',
  data () {
    return {
      base64: '',
      lastImageIdProcess: '',
      isSick: false
    }
  },
  methods: {
    test () {
      const baseURL = 'http://api-voltron.herokuapp.com/api/';
      axios.get(`${baseURL}/images_process/lasted`)
      .then(response => {
        if (this.lastImageIdProcess !== response.data.image._id) {
          console.log('faire quelque chose')
          this.isItSick(response.data.status);
          this.base64 = response.data.image.base_64;
          this.lastImageIdProcess = response.data.image._id;
        } else {
          console.log('Pas de nouvelles images')
        }
      })
      .catch(error => {
        console.log(error.message);
      })
    },
    isItSick (status) {
      if (status < 0.5) {
        console.log('status < 0.5 pas malade');
        return this.isSick = false;
      } else {
        console.log('status > 0.5 malade');
        return this.isSick = true;
      }
    }
  },
  mounted () {
    this.test();
  }
}
</script>