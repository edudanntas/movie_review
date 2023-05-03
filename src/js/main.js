const apiKey = "10172222448242bbb7920b0752486d0c"
const moviePosterUrl = "https://image.tmdb.org/t/p/w500"
const movieTrailerUrl = "https://www.youtube.com/embed/"

const searchBtn = document.querySelector('#search-movie-btn');
const inputMovie = document.querySelector('#movie-input');
const movieElement = document.querySelector('.movie-container');

const movieTitle = document.querySelector("#movie-title");
const moviePoster = document.querySelector("#movie-poster");
const movieDescription = document.querySelector('#movie-description');
const movieDateReleased = document.querySelector('.movie-release-date');

const movieTrailerButton = document.querySelector("#show-trailer");
const backgroundFade = document.querySelector(".fade");
const movieTrailerContainer = document.querySelector(".movie-trailer-content");
const closeMovieTrailer = document.querySelector(".close-trailer-modal");
const movieTrailer = document.querySelector("iframe");


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

const getMovieTrailer = async (movie) => {
    const dataMovie = await getMovieData(movie);

    try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${dataMovie.results[0].id}/videos?api_key=${apiKey}&language=pt_BR`)
        const data = res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

const showMovieTrailer = async (movie) => {
    const data = await getMovieTrailer(movie);

    movieTrailer.setAttribute('src', `https://www.youtube.com/embed/${data.results[0].key}`);
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

});

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const movie = inputMovie.value;

    movieBackgroud.classList.remove("hide");
    errorMessage.classList.add("hide");
    movieElement.classList.remove('hide');

    showMovieData(movie);
});


movieTrailerButton.addEventListener("click", (e) => {
    e.preventDefault();

    const movie = inputMovie.value;

    showMovieTrailer(movie);

    backgroundFade.classList.remove("hide");
    movieTrailerContainer.classList.remove("hide");


});

closeMovieTrailer.addEventListener("click", (e) => {
    e.preventDefault();

    backgroundFade.classList.add("hide");
    movieTrailerContainer.classList.add("hide");
})