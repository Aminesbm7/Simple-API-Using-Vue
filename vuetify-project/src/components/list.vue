<template>
  <!-- Llista de Pokémon... -->
  <div class="background">
    <h1 class="titul">Llista de Pokémon</h1>
    <div v-if="loading">Cargant...</div>
    <div v-else class="pokemon-list">
      <div v-for="pokemon in pokemons" :key="pokemon.name" class="pokemon-item" @click="openModal(pokemon)">
        <div class="pokemon-image">
          <img :src="pokemon.image" :alt="pokemon.name" style="width: 100px; height: 100px;">
        </div>
        <div class="pokemon-name">{{ pokemon.name }}</div>
      </div>
    </div>
    <!-- Modal para els detalls del Pokémon -->
    <div v-if="selectedPokemon">
      <v-dialog v-model="modalOpen">
        <div class="modal" :style="{ backgroundColor: getModalHeaderColor(selectedPokemon.name) }">
          <div class="modal-header">
            <v-card-title class="modal-title">{{ selectedPokemon.name }}</v-card-title>
          </div>
          <div class="modal-body">
            <v-img class="modal-image" :src="selectedPokemon.image" :alt="selectedPokemon.name" style="width: 700px; height: 300px;"></v-img>
            <div>Altura: {{ selectedPokemon.height }}</div>
            <div>Pes: {{ selectedPokemon.weight }}</div>
            <div>Habilitats:</div>
            <ul class="modal-abilities">
              <li v-for="(ability, index) in selectedPokemon.abilities" :key="index">{{ ability }}</li>
            </ul>
          </div>
          <div class="modal-footer">
            <v-btn @click="closeModal">Tancar</v-btn>
          </div>
        </div>
      </v-dialog>
    </div>
    <div class="button-container">
      <v-btn class="explore-button" @click="buttonClicked">
        <v-icon left>mdi-pokeball</v-icon> GO BACK
      </v-btn>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      loading: true,
      pokemons: [],
      selectedPokemon: null,
      modalOpen: false
    };
  },
  async created() {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=30');
      this.pokemons = response.data.results.map(pokemon => ({
        name: pokemon.name,
        url: pokemon.url,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.getPokemonIdFromUrl(pokemon.url)}.png`
      }));
      this.loading = false;
    } catch (error) {
      console.error('Error al obtener los Pokémon:', error);
      this.loading = false;
    }
  },
  methods: {
    buttonClicked() {
      this.$router.push('/');
    },
    async openModal(pokemon) {
      try {
        const response = await axios.get(pokemon.url);
        this.selectedPokemon = {
          name: response.data.name,
          height: response.data.height,
          weight: response.data.weight,
          abilities: response.data.abilities.map(ability => ability.ability.name),
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.getPokemonIdFromUrl(pokemon.url)}.png`
          // Agrega más detalles del Pokémon según lo necesites
        };
        this.modalOpen = true; // Open the modal
      } catch (error) {
        console.error('Error al obtener los detalles del Pokémon:', error);
      }
    },
    closeModal() {
      this.modalOpen = false; // Close the modal
    },
    getPokemonIdFromUrl(url) {
      const parts = url.split('/');
      return parts[parts.length - 2];
    },
    getModalHeaderColor(pokemonName) {
      // Example function to calculate color based on Pokémon name
      const hash = pokemonName.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
      const hue = hash % 360;
      return `hsl(${hue}, 70%, 50%)`;
    }
  }
};
</script>


<style scoped>
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
  bottom: 150px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

.modal {
  max-width: 400px;
  margin: 0 auto;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.modal-header {
  color: white;
  padding: 20px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.modal-body {
  padding: 20px;
  background-color: aliceblue;
  color: black;
}

.modal-footer {
  background-color: #f2f2f2;
  padding: 20px;
  text-align: right;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.modal-image {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}

.modal-title {
  margin: 0;
  font-size: 24px;
}

.modal-abilities {
  list-style-type: none;
  padding-left: 0;
}

.modal-abilities li {
  margin-bottom: 8px;
}

.pokemon-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 20px;
  justify-items: center;
  margin-top: 120px;
}

.pokemon-item {
  cursor: pointer;
  transition: transform 0.2s ease;
}

.pokemon-item:hover {
  transform: scale(1.05);
}

.pokemon-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.pokemon-name {
  margin-top: 10px;
  text-align: center;
}

.titul {
  text-align: center;
  margin-top: 70px;
}

.background {
  background-image: url('../../public/list.jpg');
  background-size: cover;
  background-position: center;
  position: relative;
  height: 100vh;
  overflow: hidden;
}

</style>
