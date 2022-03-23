<template>
  <div class="container">
    <div class="articleTitle">
      <h2>{{ article.title }}</h2>
    </div>

    <div class="articleImage">
      <img :src="article.image" alt="" />
    </div>

    <div class="articleTags">
      <router-link v-for="tag in article.tags" :key="tag" :to="{ name: 'ClubView', params: { id: tag.id } }">
        <button >{{ tag.name }}</button>
      </router-link>
    </div>
    <div class="articleBody">
 
        <p style="white-space: pre-line; ">{{ article.body }}</p>
   
    </div>

    <!-- <p>{{artikle}}</p> -->
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { reactive } from "vue";
import axios from "axios";

export default {
  setup() {
    const article = reactive({});
    const route = useRoute();
    const id = route.params.id;

    const getArticle = async () => {
      try {
        const rezultati = await axios.get(
          "http://localhost:3000/articles/" + id
        );

        article.title = rezultati.data.title;
        article.body = rezultati.data.body;
        article.image = rezultati.data.image;
        article.tags = rezultati.data.tags;
      } catch (err) {
        console.log(err);
      }
    };

    getArticle();

    return { article };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  margin-bottom: 5vw;
  /* background-color: purple; */
}

.articleTitle {
  /* background-color: red; */
  padding: 1vw 1vw 0 1vw;
  font-size: 1.5vw;
  text-align: justify;
}

.articleTitle h2 {
  margin: 0;
  font-weight: 500;
}

.articleImage {
  /* background-color: blue; */
  padding: 1vw;
}
.articleImage img {
  max-width: 100%;
  border-style: solid;
  border-width: 0.12vw;
  border-color: #60bf81;
  box-shadow: 0px 0px 1vw 1px #1a3e27;
  border-radius: 10px;
}

.articleBody {
  /* background-color: pink; */
  text-align: justify;
  font-size: 1.1vw;
  padding: 0 1vw;
}

.articleTags {
  /* background-color: black; */
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.articleTags button {
  /* text-transform: uppercase; */
  font-family: "Josefin Sans", sans-serif;
  font-size: 1vw;
  padding-top: 0.4vw;
  padding-bottom: 0.3vw;
  margin: 0 0.5vw;

  color: #60bf81;
  background-color: black;
  border-style: solid;
  border-color: #60bf81;
  border-radius: 10px;

  cursor: pointer;
}

.articleTags button:hover {
  background-color: #60bf81;
  color: black;
}
</style>