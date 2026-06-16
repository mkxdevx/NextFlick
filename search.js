const moviesListEl = document.querySelector('.movies');
const input = document.querySelector('.search__input');
const searchButton = document.querySelector('.search__btn');

async function searchMovies(searchTerm) {

    const movies = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=a314fffb`);
    const moviesData = await movies.json();
    moviesListEl.innerHTML = moviesData.Search.map(movie => movieData(movie)).join('');
}

searchMovies("movie");

function movieData(movie) {
    return `<div class="movie">
        <img src="${movie.Poster}" class="movie__poster"
        onerror="this.closest('.movie').remove()" >
        <h3 class="movie__title">${movie.Title}</h3>
        <p class="movie__year">${movie.Year}</p>
    </div>`;
}

function handleSearch(event) {
    event.preventDefault();
    searchButton.classList += " loading";

    searchMovies(input.value);

    searchButton.classList.remove("loading");
    
    console.log(searchButton)
}

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        searchMovies(input.value);
    }
})