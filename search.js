const moviesListEl = document.querySelector('.movies');
const input = document.querySelector('.search__input');
const searchButton = document.querySelector('.search__btn');
const resultsHeaderEl = document.querySelector('.results__header--title');
const filterEl = document.querySelector('#filter');
let currentSearchTerm = "";


async function searchMovies(searchTerm, showHeader = true) {
    currentSearchTerm = searchTerm;
    const movies = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=a314fffb`);
    const moviesData = await movies.json();

    if (!moviesData.Search) {
        moviesListEl.innerHTML = `<div class="movie__no-results">
        <h3>No movies found for <span class="crimson">"${searchTerm}"</span></h3>`;
        searchButton.classList.remove("loading");
    }

    let moviesSearchList = moviesData.Search;
    moviesSearchList = filterMovies(moviesSearchList);
    moviesListEl.innerHTML = moviesSearchList.map(movie => movieData(movie)).join('');

    if(showHeader) {
        resultsHeaderEl.innerHTML = `<h1 class="results__header--title">Search results for <span class="crimson">"${searchTerm}"</span></h1>`;
    }
}

searchMovies("movie", false);

function movieData(movie) {
    return `<div class="movie">
        <img src="${movie.Poster}" class="movie__poster"
        onerror="this.closest('.movie').remove()" >
        <h3 class="movie__title">${movie.Title}</h3>
        <p class="movie__year">${movie.Year}</p>
    </div>`;
}

function filterMovies(movies) {
    const value = filterEl.value;

    if(value === 'A_TO_Z') {
        movies.sort((a, b) => a.Title.toLowerCase().localeCompare(b.Title.toLowerCase()));
    }

    if(value === 'Z_TO_A') {
        movies.sort((a, b) => b.Title.toLowerCase().localeCompare(a.Title.toLowerCase()));
    }

    if(value === 'NEW_TO_OLD') {
        movies.sort((a, b) => b.Year - a.Year);
    }

    if(value === 'OLD_TO_NEW') {
        movies.sort((a, b) => a.Year - b.Year);
    }
    return movies;
}

function handleFilterChange(event) {
    if(currentSearchTerm) {
        searchMovies(currentSearchTerm);
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function handleSearch(event) {
    event.preventDefault();
    searchButton.classList.add("loading");

    await searchMovies(input.value);

    await delay(200);


    searchButton.classList.remove("loading");

}

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        handleSearch(e);
    }
});

