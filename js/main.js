const appendDiv = document.querySelector("#append")
const prevBtn = document.querySelector("#prevBtn")
const nextBtn = document.querySelector("#nextBtn")
let pageNum = document.querySelector("#pageNum")


/**
 * window load handler 
 */
window.addEventListener('load', async () => {

    let movies = await fetch(tokenTop + pageNum)
    movies = await movies.json() 
    
    renderMovies(movies.results)
    window.localStorage.setItem('token', tokenTop)

    if(pageNum.textContent == '1') {
        prevBtn.disabled = true
    }
})

/**
 * next button handler
 */
nextBtn.onclick = async () => {
    pageNum.textContent = (+pageNum.textContent + 1).toString()

    let token = window.localStorage.getItem("token")

    let new_movies = await fetch(token + pageNum.textContent)
    new_movies = await new_movies.json()

    renderMovies(new_movies.results)

    prevBtn.disabled = false
}

/**
 * prev button handler
 */
prevBtn.onclick = async () => {

    pageNum.textContent = (+pageNum.textContent - 1).toString()

    let token = window.localStorage.getItem("token")

    let new_movies = await fetch(token + pageNum.textContent)
    new_movies = await new_movies.json()

    renderMovies(new_movies.results)

    if (pageNum.textContent == '1' ) {
        prevBtn.disabled = true
    }
}

/**
 * render 1page all movies
 * @param {movies[]} movies 
 * @returns void
 */
function renderMovies(movies) {

    appendDiv.innerHTML = null
    console.log(movies)

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
