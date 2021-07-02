<template>
  <div class="hello">
    <h1>Welcome to the IA page!</h1>
  </div>
</template>

<script>
const axios = require('axios');

export default {
  name: 'Ia',
  methods: {
    test () {
      const baseURL = 'http://api-voltron.herokuapp.com/api/';
      axios.get(`${baseURL}/images_process/lasted`)
      .then(response => {
        console.log(response.data);
        var image = new Image();
        image.src = `data:image/png;base64,${response.data.image}`;
      })
      .catch(error => {
        console.log(error.message)
      })
    }
  },
  mounted () {
    this.test();
  }
}
</script>