const apiKey = "10172222448242bbb7920b0752486d0c"
const moviePosterUrl = "https://image.tmdb.org/t/p/w500"

// https://www.youtube.com/watch?v=

const searchBtn = document.querySelector('#search-movie-btn');
const inputMovie = document.querySelector('#movie-input');
const movieElement = document.querySelector('.movie-container');

const movieTitle = document.querySelector("#movie-title");
const moviePoster = document.querySelector("#movie-poster");
const movieDescription = document.querySelector('#movie-description');
const movieDateReleased = document.querySelector('.movie-release-date');


const movieBackgroud = document.querySelector('.movie-background');
const movieContent = document.querySelector('.movie-content');
const errorMessage = document.querySelector('.error-message');

// Funções

const getMovieData = async (movie) => {
    try {
        const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=pt-BR&query=${movie}&page=1`);
        const data = await res.json();

        if (data.total_results === 0) {
            throw new Error(data.status_message);
        }
        return data;

    } catch (error) {
        movieBackgroud.classList.add("hide");
        movieContent.classList.add("hide");
        errorMessage.classList.remove("hide");
    }
};

const showMovieData = async (movie) => {
    const data = await getMovieData(movie);

    movieTitle.innerText = data.results[0].title;
    moviePoster.setAttribute('src', moviePosterUrl + data.results[0].poster_path);
    movieDescription.innerText = data.results[0].overview;
    movieDateReleased.innerText = data.results[0].release_date;

};

// Eventos

inputMovie.addEventListener("keyup", (e) => {

    if (e.keyCode === 13) {
        const movie = inputMovie.value;
        movieBackgroud.classList.remove("hide");
        errorMessage.classList.add("hide");
        movieElement.classList.remove('hide');

        showMovieData(movie);
        inputMovie.clear()
    }

})


searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const movie = inputMovie.value;

    movieBackgroud.classList.remove("hide");
    errorMessage.classList.add("hide");
    movieElement.classList.remove('hide');

    showMovieData(movie);
})