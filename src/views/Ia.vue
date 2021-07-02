<template>
  <div class="hello">
    <h1>Welcome to the IA page!</h1>
  </div>
</template>

<script>
const axios = require('axios');

export default {
  name: 'Ia',
  data () {
    return {
      // leafImage: '',
      lastImageIdProcess: ''
    }
  },
  methods: {
    test () {
      const baseURL = 'http://api-voltron.herokuapp.com/api/';
      axios.get(`${baseURL}/images_process/lasted`)
      .then(response => {
        console.log(response.data.status);
        // const base6 = response.data.image.base_64;
        const healthStatus = response.data.status;

        this.isItSick(healthStatus)
        // var image = new Image();
        // image.src = `data:image/png;base64,${response.data.image}`;
      })
      .catch(error => {
        console.log(error.message)
      })
    },
    isItSick (status) {
      if (status < 0.5) {
        console.log('status < 0.5 pas malade')
      } else {
        console.log('status > 0.5 malade')
      }
    }
  },
  mounted () {
    this.test();
  }
}
</script>