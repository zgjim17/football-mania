<template>
  <div class="container">
    <form @submit.prevent="submitFormen" enctype="multipart/form-data">
      <div class="titleDiv">
        <label>Title</label>
        <input type="text" v-model="form.title" />
      </div>
      <div style="display: flex; flex-direction: row">
        <div class="textDiv" style="width: 70%">
          <label>Body</label>
          <textarea
            name=""
            id=""
            cols="30"
            rows="20"
            v-model="form.body"
          ></textarea>
        </div>
        <div style="display: flex; flex-direction: column; width: 30%">
          <div class="imageDiv">
            <label>Thumbnail</label>
            <input type="file" v-on:change="ndryshimiFajllit" />
          </div>
          <div class="tagsDiv">
            <label>Tags</label>
            <simple-typeahead
              id="typeahead_id"
              placeholder="Start writing..."
              :items="clubs.map((club) => club.name)"
              :minInputLength="1"
              :itemProjection="itemProjectionFunction"
              @selectItem="addTag"
              @onInput="onInputEventHandler"
              @onFocus="onFocusEventHandler"
              @onBlur="onBlurEventHandler"
            >
            </simple-typeahead>

            <div class="showTags">
              <h4 class="tags" v-for="tag in teamTags" :key="tag">
                {{ tag.name }}
              </h4>
            </div>
          </div>

          <div class="importantDiv" style="text-align: left">
            <label>Is it an important article?</label><br />
            <input
              type="radio"
              name="important"
              value="true"
              v-model="importantArticle"
            />
            <label>Yes</label><br />
            <input
              type="radio"
              name="important"
              value="false"
              v-model="importantArticle"
            />
            <label>No</label>
          </div>

          <div class="leaguesDiv" style="text-align: left">
            <label>Leagues</label><br />
            <input
              type="checkbox"
              id="premierleague"
              value="Premier League"
              v-model="leagues"
            />
            <label for="premierleague">Premier League</label>
            <input
              type="checkbox"
              id="seriea"
              value="Serie A"
              v-model="leagues"
            />
            <label for="seriea">Serie A</label>
            <input
              type="checkbox"
              id="laliga"
              value="La Liga"
              v-model="leagues"
            />
            <label for="laliga">La Liga</label>
            <input
              type="checkbox"
              id="bundesliga"
              value="Bundesliga"
              v-model="leagues"
            />
            <label for="bundesliga">Bundesliga</label>
            <input
              type="checkbox"
              id="ligueone"
              value="Ligue One"
              v-model="leagues"
            />
            <label for="ligueone">Ligue One</label>
            <input type="checkbox" id="other" value="Other" v-model="leagues" />
            <label for="other">Other</label>
          </div>
        </div>
      </div>
      <button type="submit">Create</button>
    </form>
  </div>
</template>
 
<script>
import { reactive, ref } from "vue";
import SimpleTypeahead from "vue3-simple-typeahead";
import "vue3-simple-typeahead/dist/vue3-simple-typeahead.css"; //Optional default CSS
import clubs from "@/assets/clubs.json";
import axios from "axios";

export default {
  name: "my-vue-component",

  components: {
    SimpleTypeahead,
  },

  setup() {
    const base64 = ref();
    const ndryshimiFajllit = async (event) => {
      const file = event.target.files[0];
      base64.value = await convertBase64(file);
    };

    const convertBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
          resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
          reject(error);
        };
      });
    };
    const teamTags = ref([]);

    const importantArticle = ref();

    const leagues = ref([]);


    const form = reactive({
      title: "",
      body: "",
      image: base64,
      tags: teamTags,
      important: importantArticle,
      leagues: leagues,
    });

    const addTag = (name) => {
      const selectedTeam = clubs.find((club) => club.name == name);

      if (!teamTags.value.includes(selectedTeam)) {
        teamTags.value.push(selectedTeam);
        console.log("success");
      } else {
        alert("Can't include the same team twice");
      }

      document.getElementById("typeahead_id").focus();
    };
    const submitFormen = () => {
      axios.post("http://localhost:3000/articles", form).then((response) => {
        this.$router.push({ name: "Home" });
      });

      this.$router.push({name: 'Home'});
    };

    // axios.post("http://localhost:8000/api/articles",artikulli);

    return {
      ndryshimiFajllit,
      submitFormen,
      form,
      clubs,
      teamTags,
      addTag,
      importantArticle,
      leagues,
    };
  },
};
</script>

<style scoped>
input,
textarea {
  /* background-color: rgb(255, 255, 255); */
  border-style: solid;
  border-color: #60bf81;
  border-width: 0.2vw;
  padding: 1vw;
  cursor: pointer;
  border-radius: 5px;
  font-family: "Josefin Sans", sans-serif;

  font-size: 1vw;
}

input {
  font-size: 1.1vw;
}

.titleDiv,
.textDiv,
.imageDiv,
.tagsDiv {
  /* margin-bottom: 1vw; */
  padding: 1vw;
  display: flex;
  flex-direction: column;
  text-align: left;
 
}

.importantDiv,
.leaguesDiv {
  padding: 1vw;
  font-size: 1vw;
}

.showTags {
  margin-top: 1vw;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.tags {
  font-family: "Josefin Sans", sans-serif;
  font-size: 0.8vw;
  padding-top: 0.4vw;
  padding-bottom: 0.3vw;
  padding-left: 1vw;
  padding-right: 1vw;

  color: #60bf81;
  background-color: black;
  border-style: solid;
  border-color: #60bf81;
  border-radius: 10px;

  margin: 0 0.5vw 0.5vw 0;
}

.container {
  /* display: flex;
  flex-direction: column; */

  /* background-color: peru; */
  /* padding: 1vw; */

  font-size: 1.5vw;
}

.tagsDiv textarea{
  width: 100%;
  color: red;
}

#simple-typeahead-input input{
  width: 100%;
}

.simple-typeahead{
  width: 100%;
  font-size: 1vw;
  color:  #60bf81;
  
   
}
</style>