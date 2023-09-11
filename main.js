const form = document.getElementById("form")
const input = document.getElementById("pokemon-id")
const container = document.querySelector(".pokemon-container")
// ----------------------------------------------------------- // 


const fetchPokemon = async (number) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`)
        const data = await response.json();
        
        const name = data.name
        const types = data.types.map(type => type.type.name).join(' / ')
        const height = (data.height / 10).toFixed(1);
        const weight = (data.weight / 10).toFixed(1);
        const img = data.sprites.other["official-artwork"].front_default;
        
        const createPokemonTemplate = (name, img, types, height, weight) => {
            return `
            <div class="description">
            <img src="${img}" alt="${name}">
            <h3 class="name">${name}</h3>
            <p class="type">Tipo: ${types}</p>
            <p class="height">Altura: ${height} m</span>
            <p class="weight">Peso: ${weight} kg</span>
            </div>
            `
        }
        const pokemonTemplate = createPokemonTemplate(name, img, types, height, weight)
        container.innerHTML = pokemonTemplate
    } catch (error) {
        showError("No se ha encontrado el pokémon")
    }
};


const showError = (msg) => {
    const errorMsg = document.createElement("div")
    errorMsg.classList.add("error")
    errorMsg.textContent = msg
    container.innerHTML = "";
    container.appendChild(errorMsg)
};


const searchPokemon = async (e) => {
    e.preventDefault();
    const pokemonId = input.value
    if (!pokemonId) {
        showError('Ingrese un número válido')
        return;
    }
    await fetchPokemon(pokemonId);
};


const init = () => {
    form.addEventListener("submit", searchPokemon);
};

init();