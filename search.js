const moviesListEl = document.querySelector('.movies');
const input = document.querySelector('.search__input');

async function searchMovies(searchTerm) {
    const movies = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=a314fffb`);
    const moviesData = await movies.json();

    console.log(moviesData);

    // if (moviesData.Response === "False") {
    //     moviesListEl.innerHTML = `<p>${Response.Error}</p>`;
    //     return;
    // }

    moviesListEl.innerHTML = moviesData.Search
        .map(movie => movieData(movie))
        .join('');
}

searchMovies("batman");

function movieData(movie) {
    return `<div class="movie">
        <img src="${movie.Poster}" class="movie__poster"
        onerror="this.closest('.movie').remove()" >
        <h3 class="movie__title">${movie.Title}</h3>
        <p class="movie__year">${movie.Year}</p>
    </div>`;
}

function handleSearch() {
    searchMovies(input.value);
}

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        searchMovies(input.value);
    }
})