<template>
  <div class="container">
    <h2>{{ article.title }}</h2>

    <!-- <h2>{{ $route.params.id }}</h2> -->
    <img :src="article.image" alt="" style="width: 70%" />
    <h5>{{ article.description }}</h5>

    <!-- <p>{{artikle}}</p> -->
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { reactive } from "vue";
import axios from 'axios'

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
        article.description = rezultati.data.body;
        article.image = rezultati.data.image;
      } catch (err) {
        console.log(err);
      }
    };

    getArticle();

    return { article };
  },

  // data() {
  //   return {
  //     artikle: {}
  //   }
  // },
  // created() {
  //   this.axios.get("http://localhost:8000/api/articles/" + id)
  //             .then((res) => this.artikle = res.data)
  // }
};
</script>

<style>
</style>