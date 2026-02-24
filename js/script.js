const url = "https://pokeapi.co/api/v2/pokemon?limit=2000";
const listaPokemon = document.getElementById("lista-pokedex");

async function CarregarCardPokemon() {
    const typeColors = {
        normal: '#A8A878',
        fire: '#F08030',
        water: '#6890F0',
        electric: '#F8D030',
        grass: '#78C850',
        ice: '#98D8D8',
        fighting: '#C03028',
        poison: '#A040A0',
        ground: '#E0C068',
        flying: '#A890F0',
        psychic: '#F85888',
        bug: '#A8B820',
        rock: '#B8A038',
        ghost: '#705898',
        dragon: '#7038F8',
        dark: '#705848',
        steel: '#B8B8D0',
        fairy: '#EE99AC'
    };
    try {
        console.log("Carregando pokemons...");
        const resposta = await fetch(url);
        const dados = await resposta.json();
        const pokemons = dados.results;
        console.log("Pokemons:", pokemons);
        for (const pokemon of pokemons) {
            const pokemonResponse = await fetch(pokemon.url);
            const pokemonData = await pokemonResponse.json();
            const card = document.createElement("div");
            card.setAttribute("class", "card mb-3");
            card.style.maxWidth = "540px";
            card.innerHTML = `
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split("/")[6]}.png" 
                        class="img-fluid rounded-start" alt="${pokemon.name}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${pokemon.name.toUpperCase()}</h5>
                            <p class="card-text">Index: ${pokemon.url.split("/")[6]}</p>
                            <p class="card-text"> Tipos: ${pokemonData.types.map(type => `<span style="background-color:
                                ${typeColors[type.type.name] || '#f8f9fa'}; color: white; padding: 2px 4px; border-radius: 4px;">
                                ${type.type.name}</span>`).join(", ")}</p> 
                        </div>
                    </div>
                </div>
            `;
            const li = document.createElement("li");
            li.setAttribute("class", "list-group-item list-group-item-secondary");
            li.appendChild(card);
            listaPokemon.appendChild(li);
        }
    } catch (error) {
        console.error("Erro ao carregar os pokemons:", error);
    }
}
CarregarCardPokemon();

//Função para filtrar os pokemons com base na busca
const inputBusca = document.getElementById("txt-busca");
inputBusca.addEventListener("input", () => {
    const termoBusca = inputBusca.value.toLowerCase();
    const todosPokemons = listaPokemon.getElementsByTagName("li");
    for (const item of todosPokemons) {
        if (item.textContent.toLowerCase().includes(termoBusca)) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }   
    }
});