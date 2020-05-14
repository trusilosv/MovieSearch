'use strict';
var slider;
async function getMovie(str, page) {
    const url = `https://www.omdbapi.com/?s=${str}&page=${page}&apikey=6bbdd328`;
    let res = await fetch(url);
    let data = await res.json();
    return data;
}
async function translation(str) {
    const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200514T045835Z.62def7e35ebc8937.ddbe63185a35d26ed37e6ec58ec99e5ad4edf91b&text=${str}&lang=ru-en`;
    let res = await fetch(url);
    let data = await res.json();
    return data;
}
async function getRerating(id) {
    const url = `https://www.omdbapi.com/?i=${id}&apikey=6bbdd328`;
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
        this.element_loading = 0;
        this.element_loadinglodingcomplit = 0;
        this.node = document.querySelector('.slider__wrapper');
        this.cleardom();
        this.click_next_t = 0;
    }

    cleardom() {

        this.node.innerHTML = '';
        document.querySelector('.loding').style.display = 'block';
        slider = new multiItemSlider('.slider');
        document.querySelector('.error').style.display = 'none';
    }
    async loading_next() {

        let moviesmass = await getMovie(this.search_str, this.page);
        if (!moviesmass.Search) {
            if (this.movies.length == 0)
                document.querySelector('.error').style.display = 'block';
            document.querySelector('.loding').style.display = 'none';
        } else {
            this.page++;
            for (let item of moviesmass.Search) {
                {
                    this.element_loading++
                        let reiting = await getRerating(item.imdbID);
                    this.movies.push(new Movie(item.Title, item.Poster, item.Year, reiting.imdbRating));
                    this.element_loadinglodingcomplit++;
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

                document.querySelector('.loding').style.display = 'none';
            }, 0);
        }
    }
    click_next() {
        this.click_next_t++;
        if (this.click_next_t % 10 === 3)
            this.loading_next();
    }

}


let listMovie = new ListMovie('avengers', 'slider__wrapper');
document.querySelector('.button__search').addEventListener('click', () => {
    listMovie = new ListMovie(document.querySelector('#inpur__search').value, 'slider_wrapper');
});
document.addEventListener('keydown', (event) => {

    if (event.code == 'Enter')

        listMovie = new ListMovie(document.querySelector('#inpur__search').value, 'slider_wrapper');
});