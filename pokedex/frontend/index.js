let pokemonData = [];

// Fetch data from mock server
async function fetchPokemon() {
  try {
    const response = await fetch("http://localhost:3000/pokemon");
    if (!response.ok) {
      throw new Error("HTTP call failed");
    }
    const data = await response.json();
    pokemonData = data; // Get data from db.json directly
    renderApp(); // Render app after data is fetched
  } catch (error) {
    console.error("Failed to fetch Pokémon data:", error);
    renderApp(); // Render app even if there is an error
  }
}

// Card component
function PokemonCard(props) {
  return React.createElement(
    "div",
    {
      className:
        "m-4 p-4 border border-gray-300 rounded-lg shadow-lg transition-transform transform hover:scale-105"
    },
    React.createElement("img", {
      src: props.image,
      alt: props.name,
      className: "w-40 h-40 object-contain mx-auto"
    }),
    React.createElement("h2", {
      className: "mt-2 text-xl font-semibold text-center text-gray-800"
    }, props.name),
    React.createElement("p", {
      className: "mt-1 text-center text-gray-600"
    }, `ID: ${props.id}`) // Add ID below the name
  );
}

// List component
function PokemonList() {
  if (!pokemonData || pokemonData.length === 0) {
    return React.createElement(
      "p",
      { className: "text-center text-gray-500" },
      "Loading Pokémon data..."
    );
  }

  return React.createElement(
    "div",
    { className: "flex flex-wrap justify-center" },
    pokemonData.map((pokemon) =>
      React.createElement(PokemonCard, {
        name: pokemon.name,
        image: pokemon.image, // Get image from the existing data
        id: pokemon.id, // Pass ID to the properties
        key: pokemon.id // Ensure a unique key for each card
      })
    )
  );
}

// App component
function App() {
  return React.createElement(
    "div",
    { className: "bg-gray-100 min-h-screen p-6" },
    React.createElement(
      "header",
      { className: "text-center mb-6" },
      React.createElement(
        "h1",
        { className: "text-4xl font-bold text-blue-600" },
        "Pokedex"
      )
    ),
    React.createElement(PokemonList, null)
  );
}

// Function to render the app
function renderApp() {
  ReactDOM.render(React.createElement(App), document.getElementById("root"));
}

// Initial render
renderApp();

// Fetch and display the Pokémon data
fetchPokemon();
