async function getMovie(str, page) {
    const url = `https://www.omdbapi.com/?s=${str}&page=${page}&apikey=6bbdd328`;
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
        this.dom_img.src = "no-cover.png";
    }
    dom_add(node = document.body) {
        this.dom_element.classList.add('movie');
        this.dom_element.appendChild(this.dom_title);
        this.dom_element.appendChild(this.dom_img);
        this.dom_element.appendChild(this.dom_year);
        this.dom_element.appendChild(this.dom_rating);
        if (this.imgurl != "N/A")
            this.dom_img.src = this.imgurl;
        this.dom_img.onload(node.appendChild(this.dom_element));
        this.dom_img.classList.add('movie_img');


    }
}
class ListMovie {
    constructor(search_str) {
        this.movies = [];
        this.page = 1;
        this.search_str = search_str;
        this.loading_next();
        this.element_page = 4;
    }
    async loading_next() {
        let moviesmass = await getMovie(this.search_str, this.page);
        this.page++;
        moviesmass.Search.forEach(async element => {
            let reiting = await getRerating(element.imdbID);
            this.movies.push(new Movie(element.Title, element.Poster, element.Year, reiting.imdbRating));
        });

    }
    add_dom() {
        {}
        while (this.movies === []);
    }


}


let d = new ListMovie('men in Black');