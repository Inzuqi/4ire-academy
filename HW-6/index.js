//path of least resistance
const modalScreen = document.querySelector('.modal-view');
const internalModal = document.querySelector('.modal-proper');
const titleInteract = document.querySelector('.movies');

function filmView(img, title, rating, genres, year, filmId) {
    const cont = document.querySelector('.movies');
    const genre = genres.map((item) => item.genre).join('/');
    const temp = `
    <div class="movie">
        <img src="${img}" class = "image" />
        <div class = "movie-information" ></div>
            <div class = "movie-title"  data-id = "${filmId}">${title}</div>
            <div class = "movie-rating">Rating: ${rating}</div>
            <div class = "movie-basic-info">
                <div class = "movie-genre">${genre}</div>
                <div class = "movie-year">${year}</div>
            </div>
    </div>`;
    cont.insertAdjacentHTML('beforeend', temp);
}

let promise = fetch('https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=1', {
    method: 'GET',
    headers: {
        'X-API-KEY': '009498cc-20df-44da-a4f3-484078aa8726',
        'Content-Type': 'application/json',
    },
});

promise
    .then((res) => res.json())
    .then((data) => {
        data.films.map(({ posterUrl, nameRu, rating, genres, year, filmId }) => {
            filmView(posterUrl, nameRu, rating, genres, year, filmId);
        }, console.log(data));
    });

titleInteract.addEventListener('click', (e) => {
    if (e.target.className === 'movie-title') {
        console.log(`ID: ${e.target.getAttribute('data-id')}`);
        modalScreen.style.display = 'flex';
        window.addEventListener('click', (e) => {
            if (e.target == modalScreen) {
                modalScreen.style.display = 'none';
                internalModal.innerHTML = '';
            }
        });
    } else return;

    //analogous to the previous block of code written in class, scratch the .map, since .map doesn't work here. Considering that, accessing the object is the easiest way to get the data needed.
    let id = e.target.getAttribute('data-id');
    let modalPromise = fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`, {
        method: 'GET',
        headers: {
            'X-API-KEY': '009498cc-20df-44da-a4f3-484078aa8726',
            'Content-Type': 'application/json',
        },
    });

    modalPromise
        .then((res) => res.json())
        .then((data) => {
            buildModal(data);
            console.log(data);
        });
});

function buildModal(fetchedData) {
    let modal = `
    <div class = "movie-rating__modal">
        <ul>
            <li> GoodReview: ${fetchedData.ratingGoodReview}</li>
            <li> Kinopoisk: ${fetchedData.ratingKinopoisk} </li>
            <li> IMDB: ${fetchedData.ratingImdb}</li>
            <li> Movie Critics: ${fetchedData.ratingFilmCritics}</li>
        </ul>    
    </div>
    <div class = "movie-information__modal" >
        <div class = "movie-title__modal">${fetchedData.nameRu}</div>
        <div class = "movie-length">Продолжительность: ${fetchedData.filmLength}м</div>
        <div class = "movie-description">${fetchedData.description}</div>
            <div class = "movie-external-links">
                <a href="${fetchedData.webUrl}">Kinopoisk</a>
                <a href = "https://www.imdb.com/title/${fetchedData.imdbId}/">IMDB</a>
            </div>
        </div>
    </div>
    `;
    internalModal.insertAdjacentHTML('beforeend', modal);
}
