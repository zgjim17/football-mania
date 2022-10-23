<template>
  <div class="container">
    <div class="top">
      <div class="left">
        <div v-if="articles" class="mainarticles">
          <h2>Latest Breaking News</h2>
          <div>
            <router-link
              :to="{ name: 'ArticleView', params: { id: selectedArticle.id } }"
            >
              <div class="article" style="position: relative">
                <img
                  :src="selectedArticle.image"
                  alt=""
                  style="width: 100%"
                  class="mainArticlePhoto"
                />

                <h2
                  class="mainArticleTitle"
                  style="position: absolute; width: 100%; bottom: 0; right: 0"
                >
                  {{ selectedArticle.title }}
                </h2>
              </div>
            </router-link>
          </div>

          <!-- <div class="articlesWagon">
            <div
              class="miniArticles"
              v-for="article in articles.filter(article => article.important === 'true').slice(0, 5)"
              :key="article"
            >
              <img
                :src="article.image"
                alt=""
                class="articlePhoto"
                @mouseover="changeMainArticle(article)"
              />
            </div>
          </div> -->
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
            @click="$router.push('/club/' + standing.team.id)"
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

            <td style="width: 50%; text-align: left">
              {{ standing.team.name }}
            </td>

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

    <div class="bottom" style="display: flex">
      <div
        class="leagueArticles"
        v-for="leagueNews in latestArticleLeagues"
        :key="leagueNews"
      >
        <h5>{{ leagueNews }} News</h5>
        <div
          class="leagueArticle"
          v-for="article in articles
            .filter((article) =>
              article.leagues.some((league) => league == leagueNews)
            )
            .sort((a, b) => b.id - a.id)
            .slice(0, 3)"
          :key="article.id"
          @click="this.$router.push('/article/' + article.id)"
          style="cursor: pointer"
        >
          <img :src="article.image" alt="" />
          <h5 class="leagueArticleTitle">{{ article.title }}</h5>
        </div>
        
        <router-link :to="{name: 'AllArticles'}">

         <button style="text-transform: none" class="leagueChoiceButton">See more...</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import articlesJSON from "@/assets/articlesJSON.json";

export default {
  setup() {
    window.localStorage.setItem('gont', 3)

    const latestArticleLeagues = ["Premier League", "La Liga", "Serie A", 'Ligue One'];

    const leagues = [
      { name: "France", id: 2015 },
      { name: "Germany", id: 2002 },
      { name: "England", id: 2021 },
      { name: "Italy", id: 2019 },
      { name: "Spain", id: 2014 },
    ];

    const articles = articlesJSON.articles;

    // const getArticles = () =>
    //   axios
    //     .get("http://localhost:3000/articles")
    //     .then(
    //       (res) => (
    //         (articles.value = res.data.sort((a, b) => b.id - a.id)),
    //         (selectedArticle.value = articles.value.filter(article => article.important === 'true').sort((a,b) => b.id - a.id)[0])
    //       )
    //     );  

    // getArticles();
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

    fetchLeagueData();

    const selectedArticle = ref(articles[0]);

    const changeMainArticle = (article) => {
      selectedArticle.value = article;
    };

    console.log(articles);
    return {
      articles,
      tabela,
      leagues,
      changeLeagueId,
      selectedLeagueId,
      changeMainArticle,
      selectedArticle,
      latestArticleLeagues,
    };
  },
};
</script>

<style scoped>
.leagueArticle {
  display: flex;
  flex-direction: column;
  margin-bottom: 1vw;
  /* background-color:  red; */
  padding: 0 1vw;
}

.leagueArticle:hover {
  color: #60bf81;
}

.leagueArticleTitle {
  text-align: left;
  margin: 0;
  font-size: 0.8vw;
  font-weight: 400;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.leagueArticles {
  /* background-color: yellow; */
  width: 15%;
}

.leagueArticles img {
  width: 100%;
  border-style: solid;
  border-width: 0.12vw;
  border-color: #427354;
  box-shadow: 0px 0px 1vw 1px #1a3e27;
  border-radius: 10px;
  margin-bottom: 0.5vw;
}

.leagueArticles img:hover {
  border-style: solid;
  border-color: #60bf81;
}

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
.top {
  /* background-color: orange;  */
  display: flex;
}
</style>