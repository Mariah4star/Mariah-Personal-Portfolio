class Pokemon {
    constructor(pokemon_id, pokemon_name) {
        this.id = pokemon_id
        this.name = pokemon_name
    }
}


const Poke = new Pokemon(150, 'Mewtwo')

const newButton = document.querySelector('#newcard')
newButton.addEventListener('click', function () {
    let pokeID = prompt("Please enter a Pokemon ID")
    if (pokeID > 0 && pokeID <= 807 ) {
    getAPIData(`https://pokeapi.co/api/v2/pokemon/${pokeID}`)
    .then(result => {
        populateDOM(result)
    })
} else{
    alert('As of yet not more pokemon above 807, try another one')
}
})

async function getAPIData(url) {
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

const theData = getAPIData('https://pokeapi.co/api/v2/pokemon/?limit=30')
    .then(data => {
        for (const pokemon of data.results) {
            getAPIData(pokemon.url)
                .then(pokedata => {
                    populateDOM(pokedata)
                })
        }
    })

let mainArea = document.querySelector('main')

function populateDOM(single_pokemon) {
    let pokeScene = document.createElement('div')
    let pokeCard = document.createElement('div')
    let pokeFront = document.createElement('div')
    let pokeBack = document.createElement('div')
    let name = document.createElement('h1')
    let pic = document.createElement('img')
    let picture = document.createElement('img')

    pokeScene.setAttribute('class', 'scene')
    pokeCard.setAttribute('class', 'card')
    pokeFront.setAttribute('class', 'charDiv card__face card__face--front')
    pokeBack.setAttribute('class', 'card__face card__face--back')
    pic.setAttribute('class', 'picDiv')
    picture.setAttribute('class', 'pictureDiv')

    pokeCard.addEventListener('click', function () {
        pokeCard.classList.toggle('is-flipped');
    });

    let pokeNum = getPokeNumber(single_pokemon.id)

    name.textContent = `#${single_pokemon.id} ${single_pokemon.name[0].toUpperCase()}${(single_pokemon.name.slice(1))}`
    pic.src= `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${pokeNum}.png` 
    picture.src = "../Images/pokecardBack.png"

    pokeFront.appendChild(pic)
    pokeFront.appendChild(name)

    pokeBack.appendChild(picture)

    pokeCard.appendChild(pokeFront)
    pokeCard.appendChild(pokeBack)
    pokeScene.appendChild(pokeCard)

    mainArea.appendChild(pokeScene)
}


function getPokeNumber(id) {
    if (id < 10) return `00${id}`
    if (id > 9 && id < 100) {
        return `0${id}`
    } else return id
}
