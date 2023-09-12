const form = document.getElementById("form")
const input = document.getElementById("pokemon-id")
const container = document.querySelector(".pokemon-container")
// ----------------------------------------------------------- // 


const fetchPokemon = async (number) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`)
        const data = await response.json();

        container.innerHTML =
        `
            <div class="description">
                <img src="${data.sprites.other["official-artwork"].front_default}" alt="${data.name}">
                <h3 class="name">${data.name}</h3>
                <p>Número: ${data.id}
                <p>Tipo: ${data.types.map(type => type.type.name).join(' / ')}</p>
                <p>Altura: ${(data.height / 10).toFixed(1)}m</span>
                <p>Peso: ${(data.weight / 10).toFixed(1)}kg</span>
            </div>
        `;

    } catch (error) {
        showError(`No se ha encontrado el pokémon con el número ${input.value}`)
    }
};


const showError = (msg) => {
    container.innerHTML = `<p class="error">${msg}</p>`
};


const searchPokemon = async (e) => {
    e.preventDefault();
    const pokemonId = input.value
    if (!pokemonId) {
        showError('Ingrese un número para buscar el pokémon deseado')
        return;
    }
    await fetchPokemon(pokemonId);
    form.reset();
};


const init = () => {
    form.addEventListener("submit", searchPokemon);
};

init();