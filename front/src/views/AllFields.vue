<template>
    <div class="container">
        <b-table striped hover :items="gridData" :fields="fields">
        </b-table>
    </div>
</template>

<script>
    const axios = require('axios');

    const baseURL = 'http://api-voltron.herokuapp.com/api';

    export default {
        name:'AllFields',
        data(){
            return{
                fields: [
                    {
                        key: 'name',
                        label: 'Nom du champs'
                    },
                    {
                        key: 'resources',
                        label: 'Ressource'
                    },
                     {
                        key: 'resources_types',
                        label: 'Type de ressource'
                    },

                ],
                gridData : Array
            }
        },
        methods : {
            async allfields (){
                const response = await axios.get(`${baseURL}/fields`);
                this.gridData = response.data;
            }
        },
        mounted () {
            this.allfields();
        }
    }
</script>

<style scoped>
.container{
  margin-top: 60px;
}

</style>