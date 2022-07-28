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
