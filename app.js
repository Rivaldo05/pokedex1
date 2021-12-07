const GetPokemonurl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
const numPokemons = 898;

/*
    const pokemonPromisses = []

    for(let i = 1; i <= 150; i++){
        pokemonPromisses.push(fetch(GetPokemonurl(i)).then(Response => Response.json()))

    } mesma coisa que o código a baixo, porem mais feio*/

const generatepokemonpromisses = () => Array(numPokemons).fill().map((_, index) =>
    fetch(GetPokemonurl(index + 1)).then(Response => Response.json())
)

const generateHtml = pokemons => pokemons.reduce((accumulator, pokemon) => { // evita o uso do "pokemon."(accumulator, name, id, types)src ="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemon.id}.png"/>
        const types = pokemon.types.map(typeInfo => typeInfo.type.name)
        accumulator += `
        <li class="card ${types[0]}">
        <img class="card-image" alt = "${pokemon.name}" src ="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"> 
            <h2 class = "card-title">${pokemon.id} - ${pokemon.name}</h2>
            <p class ="card-subtitle">${types.join(' | ')}</p>
        </li>
        `

        return accumulator
    }, '')


const insertpokmonintopage = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]')
    ul.innerHTML = pokemons
}

const pokemonPromisses = generatepokemonpromisses()

Promise.all(pokemonPromisses)
    .then(generateHtml)
    .then(insertpokmonintopage)


    // requisição ajax, promisses e api