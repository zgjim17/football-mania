<template>
  <div class="container">
    <router-link :to="{ name: 'CreateArticle' }"
      ><button class="butoni">Create an article</button></router-link
    >

     

  
  </div>
</template>

<script> 
export default {
  setup() {
     
 

    return {   };
  },
};
</script>

<style scoped>
.butoni {
  padding: 1vw;
  margin: 2vw;
  background-color: rgb(253, 194, 253);
  color: purple;
  font-family: "Saira", sans-serif;
  font-size: 1.1rem;
  border-radius: 20px;
  border-style: solid;
  border-color: purple;
}

.butoni:hover {
  background-color: rgb(233, 134, 233);
  cursor: pointer;
}

.container {
  background-color: red;
}
</style>