const API_URL =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=bc226ee8f2ab25b8d63299685133e478&page-1';
const SEAECH_API = `https://api.themoviedb.org/3/search/movie?api_key=bc226ee8f2ab25b8d63299685133e478&query="`;
const IMAGE_PATH = 'https://image.tmdb.org/t/p/w1280';

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');
getmovies(API_URL);
async function getmovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  createMovielement(data.results);
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const search_data = search.value;
  if (search_data && search_data != '') {
    searchmovi(SEAECH_API + search_data);
    search.value = '';
  } else {
    window.location.reload();
  }
});

async function searchmovi(url) {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.results);
  const array = data.results;
  createMovielement(data.results);
}
function createMovielement(movies) {
  main.innerHTML = '';
  movies.forEach(movie => {
    const { poster_path, title, vote_average, overview } = movie;
    const createEL = document.createElement('div');
    createEL.classList.add('movi');
    createEL.innerHTML = `
    <img src="${IMAGE_PATH + poster_path}" alt="${title}" />
    <div class="titleover">
      <h3>${title}</h3>
      <span class="${callcvolte(vote_average)}">${vote_average}</span>
    </div>
    <div class="overview">
      <h4>overview</h4>
      ${overview}
      </div>
    `;
    main.appendChild(createEL);
  });
}

function callcvolte(rating) {
  if (rating >= 7) {
    return 'green';
  } else if (rating >= 4) {
    return 'orange';
  } else {
    return 'red';
  }
}
