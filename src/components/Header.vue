<template>
  <div class="container1">
    <div class="headeri">
      <div class="navigimet" style="display: flex; align-items: center">
        <router-link to="/"
          ><img src="https://i.ibb.co/hCyx054/greenwhite.png" alt="a"
        /></router-link>

        <router-link :to="{ name: 'Home' }">Home</router-link>
        <router-link :to="{ name: 'AdminDashboard' }">Admin Page</router-link>
        <router-link :to="{ name: 'AllLeagues' }">Leagues</router-link>
        <router-link :to="{ name: 'AllArticles' }">Articles</router-link>
        <!-- <router-link :to="{ name: 'PostPage' }">Clubs</router-link> -->
      </div>

      <!-- <div class="search">
        <input type="text" />
        <button>GO</button>
      </div> -->
      <div class="searchbar">
        <input
          class="searchField"
          type="search"
          placeholder="Search"
          aria-label="Search"
          style="margin-right: 1vw"
          v-on:keypress.enter="this.$router.push('/search/' + searchTag)"
        />
        <button
          class="butoni"
          type="submit"
          @click="this.$router.push('/search/' + searchTag)"
        >
          Search
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
img {
  /* height: 30px; */
  width: 200px;
  width: 12vw;
}

.searchField {
  font-family: "Josefin Sans", sans-serif;
  height: 1.5rem;
}

.butoni {
  color: #60bf81;
  background-color: black;
  border-style: solid;
  border-color: #60bf81;
  border-width: 0.1vw;
  padding: 0.3vw 1vw;
  cursor: pointer;
  border-radius: 5px;

  font-family: "Josefin Sans", sans-serif;
  text-transform: uppercase;
}

.butoni:hover {
  color: black;
  background-color: #60bf81;
}

.headeri {
  /* background-color: red; */
  margin: auto;
  height: 8vh;
  width: 80vw;

  display: flex;
  justify-content: space-between;
  /* justify-content: center; */
  align-items: center;
}

.container1 {
  /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#000000+0,000000+100&0.65+0,0+100 */
  background: -moz-linear-gradient(
    top,
    rgba(0, 0, 0, 0.65) 0%,
    rgba(0, 0, 0, 0) 100%
  ); /* FF3.6-15 */
  background: -webkit-linear-gradient(
    top,
    rgba(0, 0, 0, 0.65) 0%,
    rgba(0, 0, 0, 0) 100%
  ); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.65) 0%,
    rgba(0, 0, 0, 0) 100%
  ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#a6000000', endColorstr='#00000000',GradientType=0 );

  width: 100vw;

  overflow: hidden;

  display: flex;
  align-items: center;
}

ul {
  display: flex;
  list-style: none;
  padding: 0;
}

a {
  text-transform: uppercase;
  /* font-size: 1rem; */
  font-size: 1.1vw;
  font-weight: 400;
  text-decoration: none;
  color: white;
  margin-right: 1vw;
}

a:hover {
  color: #b7dfc5;
}

a.router-link-exact-active {
  color: #60bf81;
}
</style>