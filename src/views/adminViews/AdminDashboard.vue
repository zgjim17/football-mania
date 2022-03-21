<template>
  <div class="container">
    <router-link :to="{ name: 'CreateArticle' }"
      ><button class="butoni">Create an article</button></router-link
    >

    <div v-for="article in articles" :key="article.id" class="articleList">
      <h4>{{ article.title }}</h4>
      <div style="display: flex; justify-content: center; align-items: center">
        <button @click="editArticle">Edit</button
        ><button @click="deleteArticle(article.id)">Delete</button>
      </div>
    </div>
    <!-- {{ articles }} -->
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";

export default {
  setup() {
    const articles = ref(null);

    const getArticles = async () =>
      await axios
        .get(`http://localhost:3000/articles`)
        .then((res) => (articles.value = res.data));

    getArticles();

    const deleteArticle = (id) => {
      axios
        .delete("http://localhost:3000/articles/" + id)
        .then((response) => console.log(response))

      console.log(id);
      // getArticles()
    };
    return { articles, deleteArticle };
  },
};
</script>

<style scoped>
.articleList {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: 70%;
  margin: auto;
  background-color: purple;
}

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