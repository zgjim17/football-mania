<template>
 
 
  <div class="container">
    <div class="leagues">
      <div
        class="liga"
        v-for="league in mainLeagues"
        :key="league"
        @click="this.$router.push('/league/' + league.id)"
      >
        <img class="competitionLogo" :src="league.competitionLogo" alt="" />
        <div class="informata">
          <img class="competitionFlag" :src="league.countryFlag" alt="" />
          {{ league.name }}
        </div>
      </div>
    </div>

    <button v-for="club in clubs" :key="club">{{ club }}</button>
  </div>
</template>

<script >
import { ref } from "vue";
import clubs from "@/assets/clubs.json";
import mainLeagues from "@/assets/mainLeagues.json";
// import articles from '@/assets/articles.json'

export default {
  setup() {
 

    const data = { username: "Zgjimi", id: 4 };

    const submitoForm = () => {
      fetch("src/assets/articles.json", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };

    console.log(clubs, "a");
    return { mainLeagues, clubs };
  },
};
</script>

<style scoped>
.competitionFlag {
  height: 1.5vh;
}

.competitionLogo {
  max-width: 50%;
}

.leagues {
  padding: 1vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.liga {
  display: flex;
  flex-direction: column;
  margin: 0 1vw 2vw 1vw;
  align-items: center;
  max-width: 15vw;
}

.leagueButton,
.liga {
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

.liga:hover {
  color: black;
  background-color: #60bf81;
}

.container {
  /* background-color: red; */
}
</style>