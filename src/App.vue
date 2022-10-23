<template>
 


  <Header />
 
  <router-view/>

  <Footer />
</template>

<script>

import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue' 
import axios from 'axios'

export default {
  components: {
    Header,
    Footer
  },
  setup() {
    
  },
}
</script>

<style>
/* @import url("https://fonts.googleapis.com/css2?family=Saira:wght@100;200;300;400;500;600;700;800;900&display=swap"); */
@import url("https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap");
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css");

body {
  margin: 0;
  /* font-family: "Saira", sans-serif; */
  font-family: "Josefin Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  overflow-x: hidden; /*mos me lan me scroll anash */
  background-color: #011717;
  background-color: #111920;
  /* background-color: blue; */

  /* background-image: url("https://i.ibb.co/ts0cvnp/324234.png"); */

  background-size: 100vw;
  background-repeat: no-repeat;

  /* me qito overflow nuk e lajna me u ba dy scrolla me ni faqe */
  /* overflow: hidden; */

  /* spe di a me lan posht te #app a te body nalt */
}

.container {
  max-width: 70vw;
  margin: auto;
  min-height: 100vh;
  padding: 0;
}

a {
  text-decoration: none;
  color: white;
}

#app {
}
</style>
