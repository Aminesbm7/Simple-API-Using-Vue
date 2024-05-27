<template>
  <v-app>
    <div v-if="$route.path !== '/pokemon'" class="main-container">
      <v-img src="/public/poke.png" class="background-image"></v-img>
      <img src="/drag.gif" class="drag" alt="drag"/>
      <img src="/tort.gif" class="tort" alt="tort"/>
      <img src="/dog.gif" class="dog" alt="dog"/>
      <img src="/dev.gif" class="dev" alt="dev"/>
      <img src="/nse.gif" class="nse" alt="nse"/>
      <img src="/pika.gif" class="pika" alt="pika"/>
      <v-layout class="button-container" fill-height align-center justify-center>
        <v-btn class="explore-button" @click="buttonClicked">
          <v-icon left>mdi-pokeball</v-icon> Explore Pokémon
        </v-btn>
      </v-layout>
    </div>
    <router-view v-if="$route.path === '/pokemon'"></router-view>
  </v-app>
</template>

<script>
import backgroundImage from '/public/poke.png';
export default {
  data() {
    return {
      backgroundImage: backgroundImage, // Imatge fons
      showMainContent: true
    };
  },
  methods: {
    buttonClicked() {
      this.showMainContent = false;
      // Redirect a pagina secundaria
      this.$router.push('/pokemon');
    }
  }
};
</script>

<style scoped>
.main-container {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
}


.drag {
  position: absolute;
  top: 85%;
  right: 25%;
  transform: translate(-50%, -50%);
  z-index: 1; /* Coloco el gif sobre la imatge de fons */
}

.tort {
  position: absolute;
  top: 55%;
  right: 25%;
  transform: translate(-50%, -50%);
  z-index: 1; /* Coloco el gif sobre la imatge de fons */
}

.dog {
  position: absolute;
  top: 62%;
  right: 10%;
  transform: translate(-50%, -50%);
  z-index: 1; /* Coloco el gif sobre la imatge de fons */
}

.dev {
  position: absolute;
  top: 67%;
  left: 20%;
  transform: translate(-50%, -50%);
  z-index: 1; /* Coloco el gif sobre la imatge de fons */
}

.nse {
  position: absolute;
  top: 82%;
  left: 35%;
  transform: translate(-50%, -50%);
  z-index: 1; /* Coloco el gif sobre la imatge de fons */
}

.pika {
  position: absolute;
  top: 55%;
  left: 35%;
  transform: translate(-50%, -50%);
  z-index: 1; /* Coloco el gif sobre la imatge de fons */
}

.explore-button {
  background-color: #ffcc00;
  color: #333;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.explore-button:hover {
  background-color: #ffc700;
}

/* Center the button */
.button-container {
  position: absolute;
  top: 60%;
  left: 93%;
  transform: translate(-50%, -50%);
}
</style>
