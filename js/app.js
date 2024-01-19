//variables
let timer;
let ratingsHtml;
//selectors
const inputSearch = document.querySelector("#search");
const banner = document.querySelector(".banner");
const cardsContainer = document.querySelector(".cards-container");

//events
inputSearch.addEventListener("input", (event) => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    getMovies(event.target.value);
  }, 500);
});

// function loadEventListenersBtn() {
//   const btnShow = document.querySelectorAll(".btn-show");
//   console.log(btnShow);
// }
// btnShow.addEventListener("click", () => {
//   const movieID = btnShow.getAttribute("movie-id");
//   showMovie;
// });

cardsContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-show")) {
    const movieID = event.target.getAttribute("movie-id");
    console.log(movieID);
    showMovie(movieID);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  getMovies("");
});

//functions
async function getMovies(title) {
  try {
    const URL = `http://www.omdbapi.com/?s=${title}&apikey=25044804`;
    const respuesta = await fetch(URL);
    const movies = await respuesta.json();
    imprimirDatos(movies.Search);
  } catch (error) {
    console.log(error);
  }
}

function imprimirDatos(movies) {
  clearMovies();

  if (!movies) {
    const titleAlert = document.createElement("h2");
    titleAlert.classList.add("alert");
    titleAlert.textContent = "No se encontraron peliculas con este nombre";
    cardsContainer.appendChild(titleAlert);
    return;
  }
  movies.forEach((movie) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `<img
          src="${movie.Poster}"
          alt="Poster"/>
          <h2 class="title-card">${movie.Title}</h2>
          <p>Year<span>${movie.Year}</span></p>
          <p>tipo<span>${movie.Type}</span></p>
          <button type="button" class="btn-show" movie-id="${movie.imdbID}">Ver mas</button>`;
    cardsContainer.appendChild(card);
  });

  // loadEventListenersBtn();
}

function clearMovies() {
  while (cardsContainer.firstChild) {
    cardsContainer.removeChild(cardsContainer.firstChild);
  }
}

async function showMovie(movieID) {
  try {
    const URL = `http://www.omdbapi.com/?i=${movieID}&apikey=25044804`;
    const respuesta = await fetch(URL);
    const movieEncontrada = await respuesta.json();
    console.log(movieEncontrada.Ratings);
    clearMovies();
    banner.style.display = "none";

    if (movieEncontrada.Ratings.length > 0) {
      ratingsHtml = movieEncontrada.Ratings.map((score) => {
        return `<p>${score.Source}<span>${score.Value}</span></p>`;
      });
    } else {
      ratingsHtml = [`<p><span>N/A</span></p>`];
    }

    const card = document.createElement("div");
    card.classList.add("card");
    card.style.width = "100%";
    card.innerHTML = `<img
          src="${movieEncontrada.Poster}"
          alt="Poster" style="width: 30%;"/>
          <h2 class="title-card">${movieEncontrada.Title}</h2>
          <p>Year<span>${movieEncontrada.Year}</span></p>
          <p>Rated<span>${movieEncontrada.Rated}</span></p>
          <p>Released<span>${movieEncontrada.Released}</span></p>
          <p>Runtime<span>${movieEncontrada.Runtime}</span></p>
          <p>Genre<span>${movieEncontrada.Genre}</span></p>
          <p>Director<span>${movieEncontrada.Director}</span></p>
          <p>Writer<span>${movieEncontrada.Writer}</span></p>
          <p>Actors<span>${movieEncontrada.Actors}</span></p>
          <p>Plot<span>${movieEncontrada.Plot}</span></p>
          <p>Language<span>${movieEncontrada.Language}</span></p>
          <p>Country<span>${movieEncontrada.Country}</span></p>
          <p>Awards<span>${movieEncontrada.Awards}</span></p>
          <p>Ratings</p>
          ${ratingsHtml.join("")}
          <p>Metascore<span>${movieEncontrada.Metascore}</span></p>
          <p>imdbRating<span>${movieEncontrada.imdbRating}</span></p>
          <p>imdbVotes<span>${movieEncontrada.imdbVotes}</span></p>
          <p>imdbID<span>${movieEncontrada.imdbID}</span></p>
          <p>DVD<span>${movieEncontrada.DVD}</span></p>
          <p>BoxOffice<span>${movieEncontrada.BoxOffice}</span></p>
          <p>Production<span>${movieEncontrada.Production}</span></p>
          <p>Website<span>${movieEncontrada.Website}</span></p>
          `;
    cardsContainer.appendChild(card);
  } catch (error) {
    console.log(error);
  }
}
