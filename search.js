const moviesListEl = document.querySelector('.movies');
const input = document.querySelector('.search__input');
const searchButton = document.querySelector('.search__btn');
const resultsHeaderEl = document.querySelector('.results__header--title');
const filterEl = document.querySelector('#filter');
const searchTerm = localStorage.getItem('search');
let currentSearchTerm = "";
let allMovies = [];

async function searchMovies(searchTerm, showHeader = true) {
    currentSearchTerm = searchTerm;

    renderMovieSkeletons();

    const movies = await fetch(`https://www.omdbapi.com/?s=${currentSearchTerm}&apikey=a314fffb`);
    const moviesData = await movies.json();

    if (!moviesData.Search) {
        moviesListEl.innerHTML = `<div class="movie__no-results">
        <h3>No movies found for <span class="crimson">"${currentSearchTerm}"</span></h3>`;
        searchButton.classList.remove("loading");
        return;
    }

    allMovies = moviesData.Search;
    renderMovies(allMovies, showHeader);
}

if (searchTerm) {
    input.value = searchTerm;
    searchMovies(searchTerm);
    localStorage.removeItem('search');
    } 
    else {
        searchMovies("movie", false);
    }

function movieHtml(movie) {
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

function renderMovies(movies, showHeader = true) {
    const filteredMovies = filterMovies([...movies]);

    moviesListEl.innerHTML = filteredMovies.map(movie => movieHtml(movie)).join('');

    if(showHeader) {
        resultsHeaderEl.innerHTML = `
        <h1 class="results__header--title">Search results for <span class="crimson">"${currentSearchTerm}"</span></h1>`;
    }
}

function handleFilterChange(event) {
    if(currentSearchTerm) {
        renderMovies(allMovies);
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function movieSkeletonHtml() {
    return `<div class="movie__skeleton">
        <div class="skeleton skeleton__img"></div>
        <div class="skeleton skeleton__text--title"></div>
        <div class="skeleton skeleton__text--year"></div>
    </div>`
}

function renderMovieSkeletons(count = 10) {
    moviesListEl.innerHTML = Array(count).fill(0).map(() => movieSkeletonHtml()).join('');
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

