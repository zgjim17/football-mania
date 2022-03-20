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
              :items="clubs"
              :minInputLength="1"
              :itemProjection="itemProjectionFunction"
              @selectItem="addTag"
              @onInput="onInputEventHandler"
              @onFocus="onFocusEventHandler"
              @onBlur="onBlurEventHandler"
            >
            </simple-typeahead>

            <button v-for="tag in teamTags" :key="tag">{{ tag }}</button>
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

    const form = reactive({
      title: "",
      body: "",
      image: base64,
    });

    const teamTags = ref([]);
    const addTag = (item) => {
      teamTags.value.push(item);
    };

    const submitFormen = () => {
      axios
        .post("http://localhost:8000/api/articles", form)
        .then((response) => {
          this.$router.push({ name: "ArticlesList" });
        });
    };

    // axios.post("http://localhost:8000/api/articles",artikulli);

    return { ndryshimiFajllit, submitFormen, form, clubs, teamTags, addTag };
  },
};
</script>

<style scoped>
input,
textarea {
  background-color: rgb(255, 255, 255);
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

/* 
.titleDiv {
  background-color: red;
}

.textDiv {
  background-color: blue;
}

.imageDiv {
  background-color: orange;
}

.tagsDiv{
  background-color: red;
} */

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

.container {
  /* display: flex;
  flex-direction: column; */

  background-color: peru;
  /* padding: 1vw; */

  font-size: 1.5vw;
}
</style>