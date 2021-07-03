<template>
  <div class="card">
    <h1 class="card__title">Santé des vignes</h1>
    <p class="card__subtitle">Malade ou pas malade ?</p>
    <p>{{user.firstname}} {{user.lastname}} {{user.email}} {{user.id}}</p>
    <div class="card__subtitle">
      <img class="img" v-if="isSick" :src="'data:image/jpeg;base64,'+ base64"/>
    </div>
    <div class="card__subtitle">
      <h3 v-if="isSick" class="colorRed">
        Maladie potentielle repérée sur les vignes !
      </h3>
      <h3 v-else>
        Pas de maladie repérée sur les vignes !
      </h3>
      <button @click="checkStore()" class="button">Store</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';
import emailjs from 'emailjs-com';

export default {
  name: 'Ia',
  data () {
    return {
      base64: '',
      lastImageIdProcess: '',
      isSick: false
    }
  },
  computed: {
    ...mapState({
      user: 'userInfos',
    })
  },
  methods: {
    getLastImageProcess () {
      const baseURL = 'http://api-voltron.herokuapp.com/api/';
      axios.get(`${baseURL}/images_process/lasted`)
      .then(response => {
        if (this.lastImageIdProcess !== response.data.image._id) {
          console.log('nouvelles images')
          this.isItSick(response.data.status);
          this.base64 = response.data.image.base_64;
          this.lastImageIdProcess = response.data.image._id;
        } else {
          console.log('Pas de nouvelles images');
        }
      })
      .catch(error => {
        console.log(error.message);
      })
    },
    isItSick (status) {
      if (status < 0.5) {
        return this.isSick = false;
      } else {
        this.sendEmailAlert();
        return this.isSick = true;
      }
    },
    sendEmailAlert () {
      var templateParams = {
        to_email: this.user.email,
        to_name: this.user.firstname
      };
      emailjs.init("user_MfUUTFhCzCsBRtj45OCUH");
      emailjs.send('service_mbfftpo', 'template_alerte', templateParams)
      .then((result) => {
        console.log('SUCCESS!', result.status, result.text);
      }, (error) => {
        console.log('FAILED...', error);
      });
    },
    setIntervalGetLastImageProcess () {
      // 300000 millisecondes = 5 minutes
      setInterval (this.getLastImageProcess, 300000);
    }, 
    checkStore () {
      console.log('this.user', this.user)
    }
  },
  mounted () {
    this.setIntervalGetLastImageProcess();
  },
  created () {
    this.getLastImageProcess();
  }
}
</script>