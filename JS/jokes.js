async function getAPIData(url) {
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

const theData = getAPIData('https://official-joke-api.appspot.com/random_ten')
    .then(data => {
        for (const joke of data.results) {
            getAPIData(joke.url)
                .then(jokedata => {
                    populateDOM(jokedata)
                })
        }
    })

    let mainArea = document.querySelector('main')