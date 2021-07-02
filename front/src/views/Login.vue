<template>
    <div>    
        <h2>Login</h2>    
        <form v-on:submit="signin()">    
            <input v-model="login" type="text" name="login" /><br>    
            <input v-model="password" type="password" name="password" /><br>    
            <input type="submit" value="Login" />    
        </form>    
    </div>
</template>

<script>
const axios = require('axios');
const API_URL = 'http://api-voltron.herokuapp.com/api/';

export default {
    name: "Login",
    data(){
        return {
            login: "",
            password: ""
        }
    },
    methods:{
        signin() {

            axios.post(API_URL +'login', {
                login: this.login,
                password: this.password
            })
            .then(response => {
                this.$router.push('allFields');
                console.log(response.data);
            })
            .catch(error => {
                console.log(error.message)
            })
        }
    }
}

</script>
