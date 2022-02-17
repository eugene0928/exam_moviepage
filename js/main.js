const appendDiv = document.querySelector("#append")
const prevBtn = document.querySelector("#prevBtn")
const nextBtn = document.querySelector("#nextBtn")
let pageNum = document.querySelector("#pageNum")
const filterBtn = document.querySelector("#filterBtn")
let search = document.querySelector("#search")
let min = document.querySelector("#min")
let max = document.querySelector("#max")
let score = document.querySelector("#score")
const topMovie = document.querySelector("#topMovie")
const popular = document.querySelector("#popular")
const upcoming = document.querySelector("#upcoming")



/**
 * window load handler 
 */
window.addEventListener('load', async () => {

    pageNum.textContent = window.localStorage.getItem("page") || '1'
    let token = window.localStorage.getItem("token") || tokenTop

    let movies = await fetch(token + pageNum.textContent)
    movies = await movies.json() 
    
    // call function to render movies
    renderMovies(movies.results)

    // update base
    window.localStorage.setItem('token', token)
    window.localStorage.setItem("page", pageNum.textContent)

    // prev button active status
    if(pageNum.textContent == '1') {
        prevBtn.disabled = true
    }
})

/**
 * next button handler
 */
nextBtn.onclick = async () => {

    pageNum.textContent = window.localStorage.getItem("page")
    pageNum.textContent = (+pageNum.textContent + 1).toString()

    let token = window.localStorage.getItem("token")

    let new_movies = await fetch(token + pageNum.textContent)
    new_movies = await new_movies.json()

    // render movies function
    renderMovies(new_movies.results)

    // update base
    window.localStorage.setItem("page", pageNum.textContent)

    // to active prev button 
    prevBtn.disabled = false
}

/**
 * prev button handler
 */
prevBtn.onclick = async () => {

    pageNum.textContent = window.localStorage.getItem("page")
    pageNum.textContent = (+pageNum.textContent - 1).toString()

    let token = window.localStorage.getItem("token")

    let new_movies = await fetch(token + pageNum.textContent)
    new_movies = await new_movies.json()

    // render movies function 
    renderMovies(new_movies.results)

    // update base
    window.localStorage.setItem("page", pageNum.textContent)

    // check prev button status
    if (pageNum.textContent == '1' ) {
        prevBtn.disabled = true
    }
}

/**
 * filter button handler
 */
filterBtn.onclick = async () => {
    let token = window.localStorage.getItem("token")
    let page = window.localStorage.getItem("page")

    let movies = await fetch(token + page)
    movies = await movies.json()

    let searchValue = search.value.trim()

    let regEx = new RegExp(searchValue, 'gi')
    console.log(movies.results)

    // find needed movies
    let filteredMovies = movies.results.filter( el => {
        let data = el.release_date.split("-")

        if(el.title.match(regEx)?.length && !score.value && !min.value && !max.value) {
            return el
        }
        else if((el.title.match(regEx)?.length && +min.value <= +data[0]) && +min.value <= +data[0] && !score.value && !max.value) {
            return el
        }
        else if((el.title.match(regEx)?.length && +max.value >= +data[0]) && +max.value >= +data[0] && !score.value) {
            return el
        }
        else if((el.title.match(regEx)?.length && (score.value) && +score.value <= +el.vote_average) && +score.value <= +el.vote_average) {
            return el
        }
        
     }) 

     // render movies function
    renderMovies(filteredMovies)

    // clear input 
    search.value = null
    min.value = null
    max.value = null
    score.value = null

}

/**
 * top kinolar button handler
 */
topMovie.onclick = async () => {
    window.localStorage.setItem("page", 1)

    pageNum.textContent = window.localStorage.getItem("page")
    let movies = await fetch(tokenTop + pageNum.textContent)
    movies = await movies.json()

    // render movies function
    renderMovies(movies.results)

    // update base
    window.localStorage.setItem("token", tokenTop)

    // prev button status
    prevBtn.disabled = true
}

/**
 * popular button handler
 */
popular.onclick = async () => {
    window.localStorage.setItem("page", 1)

    pageNum.textContent = window.localStorage.getItem("page")
    let movies = await fetch(tokenPopular + pageNum.textContent)
    movies = await movies.json()

    // render movies function
    renderMovies(movies.results)

    // update base
    window.localStorage.setItem("token", tokenPopular)

    // prev button status
    prevBtn.disabled = true
}

/**
 * upcoming button handler 
 */
upcoming.onclick = async () => {
    window.localStorage.setItem("page", 1)

    pageNum.textContent = window.localStorage.getItem("page")
    let movies = await fetch(tokenUpComing + pageNum.textContent)
    movies = await movies.json()

    // render movies function
    renderMovies(movies.results)

    // update base
    window.localStorage.setItem("token", tokenUpComing)

    // prev button status
    prevBtn.disabled = true
}

/**
 * render 1page all movies
 * @param {movies[]} movies 
 * @returns void
 */
function renderMovies(movies) {

    // clear previous movies
    appendDiv.innerHTML = null

    // make movie cards
    for(let movie of movies) {
        const [div1, img, div2, h3, span1, span2] = createEl('div', 'img', 'div', 'h3', 'span', 'span')

        div1.classList.add('movie')
        img.src = "https://image.tmdb.org/t/p/w500/" + movie.poster_path
        img.alt = movie.title

        div2.classList.add('movie-info')
        h3.textContent = movie.title
        span1.classList.add('orange')
        span1.textContent = movie.vote_average

        span2.classList.add('date')
        span2.textContent = movie.release_date

        div2.append(h3, span1)
        div1.append(img, div2, span2)
        appendDiv.append(div1)
    }
}
