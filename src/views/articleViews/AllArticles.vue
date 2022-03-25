<template>
  <div class="container">
    <div class="leagueChoiceButtons">
      <button
        class="leagueChoiceButton"
        v-for="league in leagueOptions"
        :key="league"
        @click="changeLeague(league)"
      >
        {{ league }}
      </button>
    </div>

    <div class="articles">
      <div
        class="article"
        v-for="article in articles"
        :key="article.id"
        @click="this.$router.push('/article/' + article.id)"
        style="cursor: pointer"
      >
        <img :src="article.image" alt="" />

        <div >
          <h2 class="articleTitle">{{ article.title }}</h2>

          <p class="paragraf">
            {{ article.body }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
export default {
  setup() {
    const leagueOptions = [
      "All",
      "Premier League",
      "La Liga",
      "Serie A",
      "Bundesliga",
      "Ligue One",
    ];

    const changeLeague = (league) => {
      if (league === "All") {
        articles.value = axios
          .get("http://localhost:3000/articles")
          .then(
            (res) => (articles.value = res.data.sort((a, b) => b.id - a.id))
          );
      } else {
        selectedLeague.value = league;
        getArticles();
      }
    };

    const selectedLeague = ref("Premier League");

    const articles = ref(null);

    const getArticles = () =>
      axios
        .get("http://localhost:3000/articles")
        .then(
          (res) =>
            (articles.value = res.data
              .filter((article) =>
                article.leagues.some(
                  (league) => league === selectedLeague.value
                )
              )
              .sort((a, b) => b.id - a.id))
        );

    getArticles();

    console.log(articles);

    return { articles, leagueOptions, changeLeague };
  },
};
</script>

<style scoped>
.container {
  /* background-color: red; */
}

.leagueChoiceButton {
  text-transform: uppercase;
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

.leagueChoiceButton:hover {
  background-color: #1a3e27;
}

.leagueChoiceButton:focus {
  color: black;
  background-color: #60bf81;
}

.articles {
  width: 100%;
  /* background-color: orange; */
  margin-top: 1vw;
}

.articles img {
  max-width: 15vw;
  margin: 0 1vw 0 1vw;
  border-style: solid;
  border-width: 0.12vw;
  border-color: #60bf81;
  box-shadow: 0px 0px 1vw 1px #1a3e27;
  border-radius: 10px;
}

.article {
  display: flex;
  flex-direction: row;
  margin-bottom: 1vw;
  /* background-color: purple; */
  text-align: left;
}

.paragraf {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 200;
}

.articleTitle {
  text-align: justify;
  margin: 0.5vw 0 0 0;  
  font-size: 1.5vw;
  font-weight: 600;
}

.article:hover{
    color: #60bf81;
}
</style>