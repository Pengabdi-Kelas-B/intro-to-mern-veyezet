const fs = require("fs");
const axios = require("axios").default;

async function generateJsonDB() {
  const pokemonApiURL = "https://pokeapi.co/api/v2/pokemon/?limit=100";

  try {
    // 1. Fetch daftar Pokemon
    const response = await axios.get(pokemonApiURL);

    // 2. Ambil detail untuk setiap Pokemon, termasuk gambar dan URL
    const pokemonList = await Promise.all(
      response.data.results.map(async (pokemon) => {
        const details = await axios.get(pokemon.url);
        return {
          name: details.data.name,
          image: details.data.sprites.front_default, // Menambahkan URL gambar
        };
      })
    );

    // 3. Tulis data ke db.json
    const sample = { pokemon: pokemonList };
    fs.writeFileSync("db.json", JSON.stringify(sample, null, 4));
    console.log("Pokémon data has been generated and saved to db.json");
  } catch (error) {
    console.error("Error fetching data from PokeAPI:", error.message);
  }
}

generateJsonDB();
