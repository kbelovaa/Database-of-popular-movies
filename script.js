(function() {
    const API_KEY = '88bb319131881a47bed8630b8e3c0e5e';
    const API_URL = 'https://api.themoviedb.org/3/';
    const API_IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

    const POPULAR_URL = `discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`;
    
    window.DataService = {
        getMovies: getMovies,
        getPicturePath: getPicturePath,
        searchMovies: searchMovies
    }
    
    async function getMovies() {
        const result = await fetch(API_URL + POPULAR_URL);
        const data = await result.json();

        return data.results;
    }

    function getPicturePath(poster_path) {
        return API_IMG_PATH + poster_path;
    }

    async function searchMovies(query) {
        const SEARCH_URL = `search/movie?api_key=${API_KEY}&query=${query}&page=1`;

        const result = await fetch(API_URL + SEARCH_URL);
        const data = await result.json();

        return data.results;
    }
})();

const $movieList = document.getElementById('main');
const $movieTemplate = document.getElementById('movieTemplate');
const $searchForm = document.getElementById('searchForm');
const $mainPageBtn = document.getElementById('mainBtn');
const $searchTitle = document.getElementById('mainTitle');

const moviesHTML = [];

showPopularMovies();

async function showPopularMovies() {
    const movies = await DataService.getMovies();

    $searchTitle.innerHTML = 'Popular movies';

    showMovies(movies);
}

function showMovies(movies) {
    moviesHTML.length = 0;

    movies.forEach(drawMovieCard);

    $movieList.innerHTML = moviesHTML.join('');

    $movieList.insertBefore($searchTitle, $movieList.firstChild);
}

function drawMovieCard(movie) {        
    movie.imageSrc = DataService.getPicturePath(movie.poster_path);

    let template = $movieTemplate.innerHTML;

    const matches = template.match(/\{\{.+?\}\}/g);
    // {{title}}, {{sdfsfs}}

    matches.forEach(match => {
        const name = match.replace('{{', '').replace('}}', '');
        template = template.replace(match, movie[name]);
    })

    moviesHTML.push(template);
}  

$searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const $input = document.getElementById('search');
    
    const searchMovies = await DataService.searchMovies($input.value);

    $searchTitle.innerHTML = `Search results for "${$input.value}"`;
    
    showMovies(searchMovies);

    $input.value = '';
});

$mainPageBtn.addEventListener('click', showPopularMovies);
