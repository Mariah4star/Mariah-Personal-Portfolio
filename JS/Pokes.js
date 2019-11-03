async function getPokeData(url) {
    try{
        const response = await fetch(url)
        const data = await response.json()
        console.log(data)
        populateDOM(data.results)
    } catch (error) {
        console.error(error)
}
}

const data = getPokeData('https://pokeapi.co/api/v2/pokemon')
 
let mainArea = document.querySelector('main')

function populateDOM(pokeArray) {
pokeArray.forEach((pokemon) => {
    console.log(pokemon)
    let pokeDiv = document.createElement('div')
    let name = document.createElement('h1')
    let pic = document.createElement('img')
    
    pokeDiv.setAttribute('class', 'charDiv')
    pic.setAttribute('class', 'picDiv')

   let pokeNum = getPokeNumber(pokemon.url)

    name.textContent = pokemon.name
    pic.src = `../Images/${pokeNum}.png`

    pokeDiv.appendChild(name)
    pokeDiv.appendChild(pic)

    mainArea.appendChild(pokeDiv)
} ) 
}

function getPokeNumber(charURL) {
    let end = charURL.lastIndexOf('/')
    let charID = charURL.substring(end -2, end)
    if (charID.indexOf('/') !== -1) {
    return `00${charID.slice(1, 2)}`
    } else {
      return `0${charID}`
    }
  }
  