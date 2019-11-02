
/*async function getJokesData(url) {
const response = await fetch(url)
return await response.json()
}*/

async function getAPIData(url) {
try {
    const response = await fetch (url)
    const data = await response.json()
    return data
} catch (error ) {
    console.error(error)
}
}
// now, use the returned async data
const theData = getAPIData(`https://official-joke-api.appspot.com/random_ten`)
.then(data => {
    for (const poke of data.results) {
    getAPIData 
    .then(pokedata => {
        populateDOM(pokedata)
    })
    }
})

console.log(theData)

let mainArea = document.querySelector('main')

function populateDOM(single_pokemon) {
    let pokeScene = document.createElement('div')
    let pokeCard = document.createElement('div')
    let pokeFront = document.createElement('div')
    let pokeBack = document.createElement('div')
    let name = document.createElement('h1')
    let pic = document.createElement('img')

    pokeScene.setAttribute('class', 'scene')
    pokeCard.setAttribute('class', 'card')
    pokeFront.setAttribute('class', 'card__face card__face--front')
    pokeBack.setAttribute('class', 'card__face card__face--front')
    pic.setAttribute('class', 'picDivs')

    let pokeNum = getPokeNumber(single_pokemon.id)
    
    pokeBack.appendChild(name)
    name.textContent = `${single_pokemon.name} height: ${
        single_pokemon.height}`

    pic.src = /* put image source here */

    pokeCard.appendChild(pokeFront)
    pokeCard.appendChild(pokeBack)

    pokeFront.appendChild(pic)
    pokeFront.appendChild(name)
    pokeScene.appendChild(pokeCard)

    mainArea.appendChild(pokeScene)

    pokeCard.addEventListener('click', function()


function getPokeNumber(ID) {
  if(id < 10) return `00${ID}`
  if(id > 9 && ID < 100) {
      return `0${ID}`
  } else return ID
}