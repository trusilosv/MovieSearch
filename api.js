'use strict';
alert('смена языка на клавишу(en). Переводит  название фильмов  нового запроса(ru) ');

var slider;
async function getMovie(str, page) {
    const url = `https://www.omdbapi.com/?s=${str}&page=${page}&apikey=ad16c671`;
    let res = await fetch(url);
    let data = await res.json();
    return data;
}
async function translation(str, l1, l2) {
    const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200514T045835Z.62def7e35ebc8937.ddbe63185a35d26ed37e6ec58ec99e5ad4edf91b&text=${str}&lang=${l1}-${l2}`;
    let res = await fetch(url);
    let data = await res.json();
    return data;
}
async function getRerating(id) {
    const url = `https://www.omdbapi.com/?i=${id}&apikey=ad16c671`;
    let res = await fetch(url);
    let data = await res.json();
    return data;
}
document.querySelector('#inpur__search').focus();
class Movie {
    constructor(title, imgurl, year, rating) {
        this.dom_title = document.createElement('a');
        this.dom_img = document.createElement('img');
        this.dom_year = document.createElement('p');
        this.dom_rating = document.createElement('p');
        this.dom_element = document.createElement('div');
        this.dom_title.innerHTML = title;
        this.imgurl = imgurl;
        this.dom_year.innerHTML = year;
        this.dom_rating.innerHTML = rating;
        this.dom_img.src = 'no-cover.png';
        this.domadd = false;
    }
    dom_add(node = document.body) {
        this.dom_element.classList.add('movie');
        this.dom_title.classList.add('title');
        this.dom_year.classList.add('text');
        this.dom_rating.classList.add('text');
        this.dom_element.appendChild(this.dom_title);
        this.dom_element.appendChild(this.dom_img);
        this.dom_element.appendChild(this.dom_year);
        this.dom_element.appendChild(this.dom_rating);

        if (this.imgurl != 'N/A')
            this.dom_img.src = this.imgurl;

        this.dom_img.classList.add('movie_img');
        node.appendChild(this.dom_element);

    }
}
class ListMovie {
    constructor(search_str, node) {
        this.movies = [];
        this.page = 1;
        this.search_str = search_str;
        this.loading_next();
        this.element_page = 1;
        this.node = document.querySelector('.slider__wrapper');
        this.clear_node();
        this.click_next_t = 0;
        this.item = 4;
    }

    clear_node() {

        this.node.innerHTML = '';

        slider = new multiItemSlider('.slider');
        document.querySelector('.error').innerHTML = 'No results for …';
        document.querySelector('.error').style.display = 'none';
        _transform = 0;
        slider.transform();
        slider.itemsadd(0);
        slider.items_temp();
    }
    async loading_next() {
        try {


            document.querySelector('.loding').style.display = 'block';
            let moviesmass;
            if (document.querySelector('.language').innerHTML == 'en')
                moviesmass = await getMovie(this.search_str, this.page);
            else {
                let Englishname = await translation(this.search_str, 'ru', 'en');

                moviesmass = await getMovie(Englishname.text[0], this.page);


            }
            if (!moviesmass.Search) {
                document.querySelector('.error').style.display = 'block';
                if (moviesmass.Error == "Movie not found!") {} else document.querySelector('.error').innerHTML = moviesmass.Error;
                document.querySelector('.loding').style.display = 'none';
            } else {
                this.page++;
                for (let item of moviesmass.Search) {
                    {
                        let reiting = await getRerating(item.imdbID);
                        this.movies.push(new Movie(item.Title, item.Poster, item.Year, 'imdb:' + reiting.imdbRating));
                        this.movies[this.movies.length - 1].dom_title.href = `https://www.imdb.com/title/${item.imdbID}`;
                        if (document.querySelector('.language').innerHTML == 'ru')
                            this.movies[this.movies.length - 1].dom_title.innerHTML = (await translation(item.Title, 'en', 'ru')).text[0];
                    }
                }

                setTimeout(() => {

                    this.movies.forEach(element => {
                        if (!element.domadd) {
                            let moviesa = document.createElement('div');
                            moviesa.classList.add('slider__item');
                            document.querySelector('.slider__wrapper').appendChild(moviesa);
                            element.dom_add(moviesa);
                            element.domadd = true;
                        };
                    });
                    slider.itemsadd(this.movies.length - this.item);
                    document.querySelector('.loding').style.display = 'none';
                }, 0);
            }
        } catch (e) {
            document.querySelector('.loding').style.display = 'none';
            document.querySelector('.error').innerHTML = 'Error';
            document.querySelector('.error').style.display = 'block';

        }
    }
    click_next() {
        this.click_next_t++;
        if (this.click_next_t % 10 === 3)
            this.loading_next();
    }

}


let listMovie = new ListMovie('iron man', 'slider__wrapper');
document.querySelector('.button__search').addEventListener('click', () => {
    newsearch();
});
document.querySelector('.slider__control_right').addEventListener('click', () => {
    listMovie.click_next();
});

document.addEventListener('keydown', (event) => {

    if (event.code == 'Enter')

        newsearch();
});

function newsearch() {
    listMovie = new ListMovie(document.querySelector('#inpur__search').value, 'slider_wrapper');
    _transform = 0;

}
window.onresize = () => {
    listMovie.item = Math.trunc(document.querySelector('.slider').style.width / 260);
    slider.itemsadd(listMovie.movies.length - listMovie.item);
};
window.onload(async() => { alert() });