const searchInput = document.querySelector('.landing__search--input');

function handleSearch(event) {
    event.preventDefault();

    const value = searchInput.value.trim();
    if(!value) return;

    localStorage.setItem('search', value);

    window.location.href = 'search.html';
};

searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            handleSearch(e);
        }
    })

