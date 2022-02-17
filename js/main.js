const appendDiv = document.querySelector("#append")


window.addEventListener('load', async () => {

    let movies = await fetch(tokenTop)
    movies = await movies.json() 
    
    renderMovies(movies.results)
})

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
