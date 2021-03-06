const GetPokemonurl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
const numPokemons = 898
;

/*
    const pokemonPromisses = []

    for(let i = 1; i <= 150; i++){
        pokemonPromisses.push(fetch(GetPokemonurl(i)).then(Response => Response.json()))

    } mesma coisa que o código a baixo, porem mais feio*/

const generatepokemonpromisses = () => Array(numPokemons).fill().map((_, index) =>
    fetch(GetPokemonurl(index + 1)).then(Response => Response.json())
)


const generateHtml = pokemons => pokemons.reduce((accumulator, pokemon) => { // evita o uso do "pokemon."(accumulator, name, id, types)src ="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemon.id}.png"/>

    //pega os atks
    const abilities = pokemon.abilities.map(movimentoIndex =>
        `<li class="card-subtitle">➔ ${movimentoIndex.ability.name}</li>`
        )

       // pega as habilidades
    /*const moves = pokemon.moves.map( (movivento) => {
        const mov = movivento.move.name
        for(let i =0; i<= mov.length-1; i++){
           return `<li>${mov.join('')}</li>`
           
        }
    })*/


    // pega os tipos
    const types = pokemon.types.map(typeInfo => typeInfo.type.name)

    accumulator += `
        <li class="card ${types[0]}">
        <img class="card-image" alt = "${pokemon.name}" src ="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"> 
            <h2 class = "card-title">${pokemon.id} - ${pokemon.name}</h2>
            
            <p class="card-subtitle">${types.join(' | ')}</p>
            <ul class = "atklist">
                <li class="card-subtitle"> ATks: </li>
                ${abilities.join('')}
            </ul>
        </li>
        `
        
        
    return accumulator
    }, '')


const insertpokmonintopage = pokemon => {
    const ul = document.querySelector('[data-js="pokedex"]')
    ul.innerHTML = pokemon
}

const pokemonPromisses = generatepokemonpromisses()

Promise.all(pokemonPromisses)
    .then(generateHtml)
    .then(insertpokmonintopage)


    // requisição ajax, promisses e api