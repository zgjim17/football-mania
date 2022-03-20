<template>
  <div class="container1">
    <div class="cont">
      <div class="aboutus middle">
        <p class="titull">About Us</p>
        FootballMania is a majectist website about Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Nam assumenda id aliquam ab, itaque vitae
        quasi odit vel tempore delectus!
      </div>
      <div class="quicklinks middle">
        <p class="titull">Quick Links</p>
        <a href="#">Chelsea</a>
        <a href="#">Manchester United</a>
        <a href="#">Barcelona</a>
        <a href="#">Real Madrid</a>
        <a href="#">PSG</a>
      </div>

      <div class="connect middle">
        <p class="titull">Follow Us</p>
        <div class="icons">
          <a href="#"> <i class="bi bi-facebook icons"></i></a>
          <a href="#"> <i class="bi bi-instagram icons"></i></a>
          <a href="#"> <i class="bi bi-twitter icons"></i></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.icons i {
  color: white;
  margin: 0.5vw;
  font-size: 1.8rem;
}
.icons i:hover {
  color: #60bf81;
}

.titull {
  font-size: 1.2rem;
  font-weight: 400;
  color: #60bf81;
  margin: 0;
  margin-bottom: 1vw;
}

.middle {
  margin: auto;
  display: flex;
  /* align-items: center; */
  justify-content: center;
  /* padding: 2vw; */
  padding: 0 2vw 0 2vw;
}
.connect {
  /* background-color: blue; */
  width: 33%;
  display: flex;
  flex-direction: column;
}

.quicklinks {
  /* background-color: green; */
  width: 33%;
  display: flex;
  flex-direction: column;
  border-left: solid;
  border-left-color: #60bf81;
  border-left-width: 1px;
  border-right: solid;
  border-right-color: #60bf81;
  border-right-width: 1px;
}

.quicklinks a {
  color: white;
  text-decoration: none;
}

.quicklinks a:hover {
  color: #60bf81;
}

.aboutus {
  width: 33%;
  display: flex;
  flex-direction: column;

  /* background-color: blue; */
}

.container1 {
  background-color: #011717;
  width: 100vw;

  /* position: fixed;
  bottom: 0;
  left: 0;
  right: 0; */

  padding: 2vw;

  font-weight: 300;
}
.cont {
  max-width: 70vw;
  display: flex;
  flex-direction: row;
  margin: auto;
}
</style>