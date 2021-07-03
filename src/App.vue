<template>
  <div class="topnav" id="myTopnav">
    <a class="active" @click="this.$router.push('/')">Home</a>
    <a href="#tousleschamps">Tous les champs</a>
    <a href="#meschamps">Mes champs</a>
    <a @click="this.$router.push('/santedesvignes')">Santé des vignes</a>
    <a @click="this.$router.push('/profile')">Mon compte</a>
    <a href="javascript:void(0);" class="icon" onclick="myFunction()">
      <i class="fa fa-bars"></i>
    </a>
  </div>
  <router-view></router-view>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;800&display=swap');

  * {
    font-family: 'Poppins', sans-serif;
    margin:0;
    padding: 0;
    box-sizing: border-box;
  }

  #app {
    max-width: 100%;
  }

  body {
    background-image: linear-gradient(62deg, #b0b2b3 0%, #35747c 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding:32px;
  }

  img {
    width: 350px;
    border-radius: 8px;
  }

  .card {
    max-width: 100%;
    width: 740px;
    background:white;
    border-radius: 16px;
    padding:32px;
  }

  .card__title {
    text-align:center;
    font-weight: 800;
  }

  .card__subtitle {
    text-align: center;
    color:#666;
    font-weight: 500;
    padding-bottom: 10px;
  }

  .button {
    background: #2196F3;
    color:white;
    border-radius: 8px;
    font-weight: 800;
    font-size: 15px;
    border: none;
    width: 100%;
    padding: 16px;
    transition: .4s background-color;
  }

  .card__action {
    color:#2196F3;
    text-decoration: underline;
  }

  .card__action:hover {
    cursor:pointer;
  }

  .button:hover {
    cursor:pointer;
    background: #1976D2;
  }

  .button--disabled {
    background:#cecece;
    color:#ececec
  }
  .button--disabled:hover {
    cursor:not-allowed;
    background:#cecece;
  }
  .colorRed {
    color: #f32133;
  }

  /* Add a black background color to the top navigation */
.topnav {
  background-color: #333;
  overflow: hidden;
}

/* Style the links inside the navigation bar */
.topnav a {
  float: left;
  display: block;
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

/* Add an active class to highlight the current page */
.topnav a.active {
  background-color: #04AA6D;
  color: white;
}

/* Hide the link that should open and close the topnav on small screens */
.topnav .icon {
  display: none;
}

</style>
