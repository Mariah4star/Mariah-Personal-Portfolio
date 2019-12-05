import { films } from "../assets/films.js"
import { people } from "../assets/people.js"
import { planets } from "../assets/planets.js"

console.log('I am javascipt running in your page')

let sectionArea = document.querySelector('section')

films.forEach(function (film) {
  let filmDiv = document.createElement('div')
  let filmTitle = document.createElement('h1')
  let filmCrawl = document.createElement('p')

  filmTitle.textContent = film.title
  filmCrawl.textContent = film.opening_crawl

  filmDiv.appendChild(filmTitle)
  filmDiv.appendChild(filmCrawl)

  sectionArea.appendChild(filmDiv)
});

let mainArea = document.querySelector('main')
people.forEach((person) => {
  let personDiv = document.createElement('div')
  let name = document.createElement('h1')
  let gender = document.createElement('p')
  let pic = document.createElement('img')

  pic.setAttribute('class', 'picDiv')
  personDiv.setAttribute('class', 'charDiv')

  let charNum = getCharNumber(person.url)

  name.textContent = person.name
  gender.textContent = person.gender
  pic.src = `https://starwars-visualguide.com/assets/img/characters/${charNum}.jpg`

  personDiv.appendChild(name)
  personDiv.appendChild(gender)
  personDiv.appendChild(pic)

  mainArea.appendChild(personDiv)
});

function getCharNumber(charURL) {
  let end = charURL.lastIndexOf('/')
  let charID = charURL.substring(end - 2, end)
  if (charID.indexOf('/') !== -1) {
    return charID.slice(1, 2)
  } else {
    return charID
  }
}

const allDivs = Array.from(document.querySelectorAll('div'))

const mainHeader = document.querySelector('header')

let maleButton = document.createElement('button')
maleButton.textContent = 'Male Characters'

maleButton.addEventListener('click', () => {
  femaleCharacters.forEach(character => {
    let matchedDiv = allDivs.find(oneDiv => {
      return oneDiv.firstChild.textContent === character.name
    })

    if (matchedDiv.getAttribute("style") === "display: none;") {
      matchedDiv.setAttribute("style", "display: revert;")
    } else {
      matchedDiv.setAttribute("style", "display: none;")
    }

    otherCharacters.forEach(character => {
      let matchedDiv = allDivs.find(oneDiv => {
        return oneDiv.firstChild.textContent === character.name
      })
      if (matchedDiv.getAttribute("style") === "display: none;") {
        matchedDiv.setAttribute("style", "display: revert;")
      } else {
        matchedDiv.setAttribute("style", "display: none;")
      }
    })
  })
})

let otherButton = document.createElement('button')
otherButton.textContent = 'Other Characters'

otherButton.addEventListener('click', () => {
  femaleCharacters.forEach(character => {
    let matchedDiv = allDivs.find(oneDiv => {
      return oneDiv.firstChild.textContent === character.name
    })
    if (matchedDiv.getAttribute("style") === "display: none;") {
      matchedDiv.setAttribute("style", "display: revert;")
    } else {
      matchedDiv.setAttribute("style", "display: none;")
    }

    maleCharacters.forEach(character => {
      let matchedDiv = allDivs.find(oneDiv => {
        return oneDiv.firstChild.textContent === character.name
      })
      if (matchedDiv.getAttribute("style") === "display: none;") {
        matchedDiv.setAttribute("style", "display: revert;")
      } else {
        matchedDiv.setAttribute("style", "display: none;")
      }
    })
  })
})

let femaleButton = document.createElement('button')
femaleButton.textContent = 'Female Characters'

femaleButton.addEventListener('click', () => {
  maleCharacters.forEach(character => {
 let matchedDiv = allDivs.find(oneDiv => {
    return oneDiv.firstChild.textContent === character.name
  })
  if(matchedDiv.getAttribute("style") === "display: none;" ) {
    matchedDiv.setAttribute("style", "display: revert;")
  } else {
    matchedDiv.setAttribute("style", "display: none;")
  }

  otherCharacters.forEach(character => {
    let matchedDiv = allDivs.find(oneDiv => {
       return oneDiv.firstChild.textContent === character.name
     })
     if(matchedDiv.getAttribute("style") === "display: none;" ) {
    } else {
      matchedDiv.setAttribute("style", "display: none;")
    }
    }) 
  })
})


mainHeader.appendChild(maleButton)
mainHeader.appendChild(femaleButton)
mainHeader.appendChild(otherButton)

const maleCharacters = people.filter(person => person.gender === 'male')
const femaleCharacters = people.filter(person => person.gender === 'female')
const otherCharacters = people.filter(person => person.gender != 'female' && person.gender != 'male')

console.log(maleCharacters)
console.log(femaleCharacters)
console.log(otherCharacters)

let areaArea = document.querySelector('area')

planets.forEach((planet) => {
  let planetDiv = document.createElement('div')
  let planetName = document.createElement('h3')
  let planetPic = document.createElement('img')

  let planNumber = getPlanNumber(planet.url)

  planetName.textContent = planet.name
  planetPic.src = `https://starwars-visualguide.com/assets/img/planets/${planNumber}.jpg`

  planetPic.addEventListener('error', (event) => {
    let badImage = event.target
    badImage.src = '../Images/Planets.png'
  })

  planetDiv.appendChild(planetPic)
  planetDiv.appendChild(planetName)

  areaArea.appendChild(planetDiv)
})

function getPlanNumber(planURL) {
  let end = planURL.lastIndexOf('/')
  let planID = planURL.substring(end - 2, end)
  if (planID.indexOf('/') !== -1) {
    return planID.slice(1, 2)
  } else {
    return planID
  }
}