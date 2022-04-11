<template>
  <div class="container">
    <div style="display: flex; flex-direction: column">
      <div class="top" style="display: flex">
        <div class="teamLogo">
          <img :src="team.crestUrl" alt="" />
        </div>

        <div class="teamInfo">
          <h1 style="color: #60bf81">{{ team.name }}</h1>
          <h3 style="font-weight: 400">
            <a :href="team.website">Official Website</a> <br />
          </h3>
          <h3 style="font-weight: 300">
            {{ team.venue }} <br />
            {{ team.area.name }}
          </h3>
        </div>
      </div>

      <div class="bottom">
        <div class="teamArticles">
          <h3 style="color: #60bf81">Latest {{ team.name }} News</h3>
          <div
            class="article"
            v-for="article in teamArticles"
            :key="article.id"
            @click="this.$router.push('/article/' + article.id)"
            style="cursor: pointer"
          >
            <img :src="article.image" alt="" />
            <h5 class="articleTitle">{{ article.title }}</h5>
          </div>
        </div>

        <div class="teamPlayers">
          <h3 style="color: #60bf81">Full {{ team.name }} Squad</h3>
          <table>
            <tr v-for="player in team.squad" :key="player.id">
              <td style="width: 25%">{{ player.position }}</td>
              <td>{{ player.name }}</td>
              <td style="width: 20%">{{ player.nationality }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { ref } from "vue";
import articlesJSON from "@/assets/articlesJSON.json";

export default {
  setup() {
    const route = useRoute();
    const id = route.params.id;

    const team = ref(null);

    const fetchTeamData = () => {
      fetch(`http://api.football-data.org/v2/teams/${id}`, {
        headers: {
          "X-Auth-Token": "cba23374de4d43258440be820d1d35d9",
        },
      })
        .then((res) => res.json())
        .then((data) => (team.value = data));
    };

    fetchTeamData();
    const teamArticles = ref(null);

    const fetchArticles = () => {
      // fetch(`http://localhost:3000/articles`)
      //   .then((res) => res.json())
      //   .then(
      //     (data) =>
      //       (teamArticles.value = data.filter((article) =>
      //         article.tags.some((tag) => tag.id == id)
      //       ))
      //   );
        teamArticles.value = articlesJSON.articles.filter(article => article.tags.some(tag => tag.id == id))

    };

    fetchArticles();

    console.log(teamArticles);

    console.log(team);
    return { team, teamArticles };
  },
};
</script>

<style scoped>
.bottom {
  display: flex;
}
.teamPlayers {
  width: 50%;
}

.teamPlayers table {
  margin: auto;
  width: 90%;

  border-style: solid;
  border-color: #60bf81;
  border-width: 0.12vw;

  border-collapse: separate;
  border-spacing: 0;
  border-radius: 10px;

  box-shadow: 0px 0px 1vw 1px #1a3e27;
  overflow: hidden;
}

.teamPlayers table tr {
  font-size: 1vw;
  background-color: rgba(0, 0, 0, 0.299);
  cursor: pointer;
}

.teamPlayers table tr td {
  height: 1.2vw;
  vertical-align: center;
  border-bottom: 0.01vw solid #b7dfc5;
}

.articleTitle {
  text-align: justify;
  margin: 0;
  font-size: 1.3vw;
  font-weight: 400;
  padding: 0 1vw;
}

.article {
  display: flex;
  flex-direction: row;
  margin-bottom: 1vw;
}

.teamArticles {
  width: 50%;
  /* background-color: orange; */
}

.teamArticles img {
  width: 40%;
  margin: 0 0 0 1vw;
  border-style: solid;
  border-width: 0.12vw;
  border-color: #60bf81;
  box-shadow: 0px 0px 1vw 1px #1a3e27;
  border-radius: 10px;
}

.teamInfo {
  padding: 1vw;
  /* background-color: green; */
  width: 70%;
  text-align: left;
}

.teamLogo {
  /* background-color: red; */
  width: 30%;
  padding: 1vw;
}

.teamLogo img {
  width: 60%;
  padding: 1vw;
  background-color: white;
  border-style: solid;
  border-width: 0.12vw;
  border-color: #60bf81;
  box-shadow: 0px 0px 1vw 1px #1a3e27;
  border-radius: 10px;
}
.container {
  /* background-color: blue; */
}
</style>