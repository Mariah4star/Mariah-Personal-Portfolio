async function getAPIData(url) {
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

let allSenators = []
let simpleSenators = []
let republicans = []
let democrats = []
let independant = []

const theData = getAPIData('senators.json').then(data => {
  allSenators = data.results[0].members
  simpleSenators = makeSimpleMap(allSenators)
  republicans = filterSentators(simpleSenators, "R")
  democrats = filterSentators(simpleSenators, "D")
  independant = filterSentators(simpleSenators, "ID")
  console.log(totalVotes(simpleSenators))
  populateDOM(simpleSenators)
})

//map here
function makeSimpleMap(allOfThem) {
  let results = allOfThem.map(senator => {
    return {
      id: senator.id,
      name: `${senator.first_name} ${senator.last_name}`,
      party: senator.party,
      age: `${calculate_age(new Date(senator.date_of_birth))}`,
      gender: senator.gender,
      total_votes: senator.total_votes,
    }
  })
  return results
}
//filter goes here
function filterSentators(simpleList, partyAffilation) {
  return simpleList.filter(senators => senators.party === "partyAffilation")
}

//reduce
const testArray = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 30]

const testReduce = testArray.reduce((acc, num) => {
  return acc + num
}, 0)

function totalVotes(senatorList) {
  const results = senatorList.reduce((acc, senator) => {
    return acc + senator.total_votes;
  }, 0);
  return results;
}

function oldestSenator(senatorList) {
  const results = senatorList.reduce((oldest, senator) => {
    return (oldest.age || 0) > senator.age ? oldest : senator
  }, {})
  return results
}

function sortSenatorsByAge(senatorList) {
  return senatorList.sort((a, b) => {
    return a.age - b.age
  })
}

console.log(testReduce)

const container = document.querySelector('.container')

function populateDOM(senator_arr) {
  senator_arr.forEach(senator => {
    let card = document.createElement('div')
    card.setAttribute('class', 'card')

    let cardImage = document.createElement('div')
    cardImage.setAttribute('class', 'card-image')

    let figure = document.createElement('figure')
    figure.setAttribute('class', 'image')

    let figureImage = document.createElement('img')
    figureImage.src = `https://www.congress.gov/img/member/${senator.id.toLowerCase()}_200.jpg`

    figureImage.alt = 'Placeholder image'

    figure.appendChild(figureImage)
    cardImage.appendChild(figure)
    card.appendChild(cardImage)
    card.appendChild(cardContent(senator))
    container.appendChild(card)

    figureImage.addEventListener("error", event => {
      let badImage = event.target;
      badImage.src = "./Images/Doug Jones.jpeg";
    })
  })
}

function cardContent(senator) {
  let cardContent = document.createElement('div')
  cardContent.setAttribute('class', 'card-content')

  let media = document.createElement('div')
  media.setAttribute('class', 'media')

  let mediaLeft = document.createElement('div')
  mediaLeft.setAttribute('class', 'media-left')

  let figure = document.createElement('figure')
  figure.setAttribute('class', 'image is-48x48')

  let img = document.createElement('img')
  if (senator.party === "R") {
    img.src = "Images/republican-image-new.jpg"
  }
  if (senator.party === "D") {
    img.src = "Images/domcrat.jpg"
  }
  if (senator.party === "ID") {
    img.src = 'Images/lego huh.jpg'

    figureImage.addEventListener('error', (event) => {
      let badImage = event.target
      badImage.src = '../Images/flag.jpg'
    })
  }

  //img.src = "Images/flag.jpg"
  img.alt = 'Placeholder image'

  let mediaContent = document.createElement('div')
  mediaContent.setAttribute('class', 'media-content')

  let titleP = document.createElement('p')
  titleP.setAttribute('class', 'title is-5')
  titleP.textContent = senator.name

  let subtitleP = document.createElement('p')
  subtitleP.setAttribute('class', 'subtitle is-6')
  //subtitleP.textContent = `foo`

  let contentDiv = document.createElement('div')
  contentDiv.setAttribute('class', 'content')
  contentDiv.textContent = "Age"
  let contentBreak = document.createElement('br')
  let ageP = document.createElement('p')
  ageP.textContent = senator.age

  mediaContent.appendChild(titleP)
  mediaContent.appendChild(subtitleP)
  figure.appendChild(img)
  mediaLeft.appendChild(figure)
  media.appendChild(mediaLeft)
  media.appendChild(mediaContent)

  contentDiv.appendChild(contentBreak)
  contentDiv.appendChild(ageP)
  cardContent.appendChild(media)
  cardContent.appendChild(contentDiv)


  return cardContent
}

function calculate_age(dob) {
  var diff_ms = Date.now() - dob.getTime();
  var age_dt = new Date(diff_ms);

  return Math.abs(age_dt.getUTCFullYear() - 1970);
}
