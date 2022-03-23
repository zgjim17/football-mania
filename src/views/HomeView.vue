<template>
  <div class="container">
    <div class="left">
      <div class="mainarticles">
        <div>
          <router-link
            :to="{ name: 'ArticleView', params: { id: selectedArticle.id } }"
          >
            <div class="article">
              <img
                :src="selectedArticle.image"
                alt=""
                class="mainArticlePhoto"
              />

              <h2 class="mainArticleTitle">
                {{ selectedArticle.title }}
              </h2>
            </div>
          </router-link>
        </div>
 

        <div class="articlesWagon">
          <div
            class="miniArticles"
            v-for="article in articles.slice(0, 5)"
            :key="article"
          >
            <img
              :src="article.image"
              alt=""
              class="articlePhoto"
              @mouseover="changeMainArticle(article)"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="selectLeague">
        <button
          class="leagueChoiceButton"
          v-for="league in leagues"
          :key="league"
          @click="changeLeagueId(league.id)"
        >
          {{ league.name }}
        </button>
      </div>

      <table class="leagueTable">
        <tr
          class="leagueRow"
          v-for="standing in tabela.standings[0].table.slice(0, 10)"
          :key="standing"
          @click="$router.push('/club/'+ standing.team.id)"

        >
          
          <td style="width: 10%">{{ standing.position }}</td>

          <td
            style="
              margin: auto;
              vertical-align: center;
              width: 10%;
              text-align: left;
            "
          >
            <img
              style="max-width: 1.3vw"
              :src="standing.team.crestUrl"
              alt=""
            />
          </td>

          <td style="width: 50%; text-align: left">{{ standing.team.name }}</td>

          <td style="width: 10%">{{ standing.playedGames }}</td>
          <td style="width: 20%">{{ standing.points }} pts</td>
        </tr>
        <tr class="leagueRow">
          <td colspan="5" style="border-bottom: none">
            <router-link
              :to="{
                name: 'LeagueView',
                params: { id: tabela.competition.id },
              }"
            >
              Click to see full table</router-link
            >
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from 'axios'
// import articles from "@/assets/articles.json";
export default {
  setup() {
    const leagues = [
      { name: "France", id: 2015 },
      { name: "Germany", id: 2002 },
      { name: "England", id: 2021 },
      { name: "Italy", id: 2019 },
      { name: "Spain", id: 2014 },
    ];

    const articles = ref(null);

    const getArticles = () =>
      axios
        .get("http://localhost:3000/articles")
        .then(
          (res) => (
            (articles.value = res.data),
            (selectedArticle.value = articles.value[0])
          )
        );


getArticles()
    const selectedLeagueId = ref(2021);

    const changeLeagueId = (id) => {
      selectedLeagueId.value = id;

      fetchLeagueData();
    };

    const tabela = ref(null);

    const fetchLeagueData = () =>
      fetch(
        `http://api.football-data.org/v2/competitions/${selectedLeagueId.value}/standings`,
        {
          headers: {
            "X-Auth-Token": "cba23374de4d43258440be820d1d35d9",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => (tabela.value = data));

    console.log(tabela);

    fetchLeagueData();

    const selectedArticle = ref(articles[0]);

    const changeMainArticle = (article) => {
      selectedArticle.value = article;
    };

    return {
      articles,
      tabela,
      leagues,
      changeLeagueId,
      selectedLeagueId,
      changeMainArticle,
      selectedArticle,
    };
  },
};
</script>

<style scoped>
.leagueChoiceButton {
  text-transform: uppercase;
  font-family: "Josefin Sans", sans-serif;
  font-size: 0.8vw;
  padding-top: 0.4vw;
  padding-bottom: 0.3vw;

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

.selectLeague {
  margin-bottom: 1vw;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.leagueTable {
  width: 100%;

  border-style: solid;
  border-color: #60bf81;
  border-width: 0.12vw;

  border-collapse: separate;
  border-spacing: 0;
  border-radius: 10px;

  box-shadow: 0px 0px 1vw 1px #1a3e27;
  overflow: hidden;
}

.leagueRow {
  font-size: 1vw;
  background-color: rgba(0, 0, 0, 0.68);
  cursor: pointer;
}

.leagueRow:hover {
  background-color: #1a3e27;
  color: #b7dfc5;
}

.leagueRow td {
  height: 2vw;
  vertical-align: center;
  border-bottom: 0.01vw solid #b7dfc5;
}

.mainArticleTitle {
  background-color: rgba(0, 0, 0, 0.687);
  padding: 1vw;
  position: relative;
  font-size: 0.9vw;
  font-weight: 400;

  /* margin-top: -100px;
  border-style: solid;
  border-width: 0.12vw;
  border-color: #60bf81; */
}

.mainArticlePhoto {
  max-width: 100%;
  border-style: solid;
  border-width: 0.12vw;
  border-color: #60bf81;
  box-shadow: 0px 0px 1vw 1px #1a3e27;
  border-radius: 10px;
}
.articlePhoto {
  max-width: 100%;
  border-style: solid;
  border-width: 0.12vw;
  border-color: #b7dfc5;
  /* box-shadow: 0px 0px 1vw 1px #1a3e27; */
  border-radius: 10px;
}

.articlePhoto:hover {
  box-shadow: 0px 0px 1vw 1px #1a3e27;
  border-color: #60bf81;
  /* border-width: 0.2vw; */
}

.miniArticles {
  max-width: 18%;
}

.articlesWagon {
  display: flex;
  justify-content: space-between;
}

.left {
  /* background-color: green; */
  width: 60%;
  overflow: hidden;
  padding: 1vw;
}

.right {
  /* background-color: red; */
  width: 40%;
  padding: 1vw;
}
.container {
  /* background-color: orange;  */
  display: flex;
}
</style>