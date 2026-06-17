const moviesListEl = document.querySelector('.movies');
const input = document.querySelector('.search__input');
const searchButton = document.querySelector('.search__btn');


async function searchMovies(searchTerm) {
    const movies = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=a314fffb`);
    const moviesData = await movies.json();

    if (!moviesData.Search) {
        moviesListEl.innerHTML = `<div class="movie__no-results">
        <h3>No movies found for <span class="crimson">"${searchTerm}"</span></h3>`;
        searchButton.classList.remove("loading");
    }

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
        return handleSearch(event);
    }
});

