<template>
  <div class="container">
    <div class="table">
      <h3 style="text-align: left">{{ tabela.competition.name }} Full Table</h3>
      <table class="leagueTable">
        <tr class="tableInformation">
          <th>Rank</th>
          <th>Logo</th>
          <th>Team Name</th>
          <th>MP</th>
          <th>W</th>
          <th>D</th>
          <th>L</th>
          <th>GF</th>
          <th>GA</th>
          <th>Points</th>
        </tr>

        <tr
          class="leagueRow"
          v-for="standing in tabela.standings[0].table"
          :key="standing"
          
            @click="this.$router.push('/club/'+ standing.team.id)"
        >
          <td style="width: 5%">{{ standing.position }}</td>

          <td style="width: 5%">
            <img
              style="max-width: 1.3vw"
              :src="standing.team.crestUrl"
              alt=""
            />
          </td>

          <td style="width: 50%">{{ standing.team.name }}</td>
          <td style="width: 5%">{{ standing.playedGames }}</td>
          <td style="width: 5%">{{ standing.won }}</td>
          <td style="width: 5%">{{ standing.draw }}</td>
          <td style="width: 5%">{{ standing.lost }}</td>
          <td style="width: 5%">{{ standing.goalsFor }}</td>
          <td style="width: 5%">{{ standing.goalsAgainst }}</td>
          <td style="width: 10%">{{ standing.points }} pts</td>
        </tr>
      </table>

      <!-- {{ matchdayData }} -->
    </div>

    <div class="stats">
      <div class="results">
        <h3 style="text-align: left">Fixtures</h3>
        <table class="leagueTable">
          <tr
            class="leagueRow"
            style="font-size: 0.8vw"
            v-for="match in matchdayData.matches"
            :key="match"
          >
            <td style="width: 5%">
              <img
                :src="`https://crests.football-data.org/${match.homeTeam.id}.png`"
                style="max-width: 1.3vw"
                alt=""
              />
            </td>
            <td style="width: 40%">{{ match.homeTeam.name }}</td>
            <td style="font-size: 1vw; width: 10%">
              
                {{ match.score.fullTime.homeTeam }} -
                {{ match.score.fullTime.awayTeam }}
              
            </td>
            <td style="width: 40%">{{ match.awayTeam.name }}</td>
            <td style="width: 5%">
              <img
                :src="`https://crests.football-data.org/${match.awayTeam.id}.png`"
                style="max-width: 1.3vw"
                alt=""
              />
            </td>
          </tr>
        </table>

        <div class="buttonat">
          <button @click="zbriteMatchDay()">Previous</button>
          MatchDay: {{ matchDay }}
          <button @click="rriteMatchDay()">Next</button>
        </div>
      </div>

      <div class="topScorers">
        <h3 style="text-align: left">Top Goalscorers</h3>
        <table class="leagueTable">
          <tr
            class="leagueRow"
            style="font-size: 0.8vw"
            v-for="(goalscorer, index) in goalscorers.scorers"
            :key="goalscorer"
          >
            <td style="font-size: 1vw">{{ index + 1 }}</td>
            <td>
              <img
                :src="`https://crests.football-data.org/${goalscorer.team.id}.png`"
                style="max-width: 1.3vw"
                alt=""
              />
            </td>
            <td>{{ goalscorer.player.name }}</td>
            <td style="font-size: 1vw">{{ goalscorer.numberOfGoals }} goals</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute();
    const id = route.params.id;

    const tabela = ref(null);

    const fetchLeagueData = () =>
      fetch(`http://api.football-data.org/v2/competitions/${id}/standings`, {
        headers: {
          "X-Auth-Token": "cba23374de4d43258440be820d1d35d9",
        },
      })
        .then((res) => res.json())
        .then((data) => (tabela.value = data));

    console.log(tabela);
    fetchLeagueData();

    const matchDay = ref(1);
    const matchdayData = ref(null);

    const rriteMatchDay = () => {
      matchDay.value++;
      fetchLeagueMatches();
    };
    const zbriteMatchDay = () => {
      matchDay.value--;
      fetchLeagueMatches();
    };

    const fetchLeagueMatches = () => {
      fetch(
        `http://api.football-data.org/v2/competitions/${id}/matches?matchday=${matchDay.value}`,
        {
          headers: {
            "X-Auth-Token": "cba23374de4d43258440be820d1d35d9",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => (matchdayData.value = data));
    };

    console.log(matchdayData);
    fetchLeagueMatches();

    const goalscorers = ref(null);

    const fetchTopScorers = () => {
      fetch(`http://api.football-data.org/v2/competitions/${id}/scorers`, {
        headers: {
          "X-Auth-Token": "cba23374de4d43258440be820d1d35d9",
        },
      })
        .then((res) => res.json())
        .then((data) => (goalscorers.value = data));
    };

    fetchTopScorers();

    return {
      tabela,
      id,
      matchdayData,
      matchDay,
      rriteMatchDay,
      zbriteMatchDay,
      goalscorers,
    };
  },
};
</script>


<style scoped>
.stats {
  display: flex;
  flex-direction: row;
}

.topScorers {
  width: 40%;
}

.buttonat button {
  color: #60bf81;
  background-color: black;
  border-style: solid;
  border-color: #60bf81;
  border-width: 0.1vw;
  padding: 0.4vw 1vw;
  cursor: pointer;
  border-radius: 5px;
  font-family: "Josefin Sans", sans-serif;
  text-transform: uppercase;
  margin-top: 1vw;
  margin-left: 1vw;
  margin-right: 1vw;
  font-size: 1vw;
}

.buttonat button:hover {
  background-color: #60bf81;
  color: #1a3e27;
}

.results {
  display: flex;
  flex-direction: column;
  width: 60%;
}

.table,
.results,
.topScorers {
  padding: 1vw;
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

.tableInformation {
  font-size: 1vw;
  background-color: #1a3e27;
  cursor: pointer;
  /* text-align: left; */
}

.tableInformation th {
  height: 2vw;
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
</style>