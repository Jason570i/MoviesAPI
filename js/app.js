//variables
let timer;
let moviesTemp;
//selectors
const inputSearch = document.querySelector("#search");
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
  moviesTemp = [];
  movies.forEach((movie) => {
    moviesTemp.push(movie);
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
console.log(moviesTemp);
  // loadEventListenersBtn();
}

function clearMovies() {
  while (cardsContainer.firstChild) {
    cardsContainer.removeChild(cardsContainer.firstChild);
  }
}

function showMovie(movieID) {
   const findMovie = moviesTemp.find((movie)=> movie.imdbID == movieID)
   console.log(findMovie);

  //  clearMovies();
}
