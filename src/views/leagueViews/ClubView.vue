<template>
  <div class="container">
    <div style="display: flex; flex-direction: column">
      <div class="top" style="display: flex">
        <div class="teamLogo">
          <img :src="team.crestUrl" alt="" />
        </div>

        <div class="teamInfo">
          <h1>{{ team.name }}</h1>
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
          <div
            class="article"
            v-for="article in teamArticles"
            :key="article.id"
          >
            <img :src="article.image" alt="" />
            <h5 style="text-align: justify">{{ article.title }}</h5>
          </div>
        </div>

        <div class="teamPlayers">
            <table>
                <tr v-for="player in team.squad" :key="player.id">
                    <td>{{player.nationality}}</td> 
                    <td>{{player.name}}</td>
                    <td>{{player.position}}</td>
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
      fetch(`http://localhost:3000/articles`)
        .then((res) => res.json())
        .then(
          (data) =>
            (teamArticles.value = data.filter(
              (article) => article.tags[0].length > 10
            ))
        );
    };

    fetchArticles();

    console.log(teamArticles);

    console.log(team);
    return { team, teamArticles };
  },
};
</script>

<style>
.bottom {
  display: flex;
}
.teamPlayers {
    background-color: pink;
    width: 50%;
}

.article {
  display: flex;
  flex-direction: row;
}

.teamArticles {
  width: 50%;
  background-color: orange;
}

.teamArticles img {
  width: 40%;
}

 

.teamInfo {
  padding: 1vw;
  background-color: green;
  width: 70%;
  text-align: left;
}

.teamLogo {
  background-color: red;
  width: 30%;
  padding: 1vw;
}

.teamLogo img {
  max-width: 15vw;
}
.container {
  background-color: blue;
}
</style>