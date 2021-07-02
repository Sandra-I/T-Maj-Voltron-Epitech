<template> 
    <div class="topnav">
        <a href=""> Mes Champs</a>
        <a href=""> Mon Compte </a>
    </div>
    
</template>

<script>
export default {
  name: 'DashBDD'
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;800&display=swap');

/* Add a black background color to the top navigation */
.topnav {
  background-color: #333;
  overflow: hidden;
  font-family: 'Poppins', sans-serif;
}

/* Style the links inside the navigation bar */
.topnav a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

/* Change the color of links on hover */
.topnav a:hover {
  background-color: #ddd;
  color: black;
}

/* Add a color to the active/current link */
.topnav a.active {
  background-color: #04AA6D;
  color: white;
}

</style>