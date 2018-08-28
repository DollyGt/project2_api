let movieId = getParameterByName('id');
console.log(movieId);

setTimeout(function(){
    getMovieDetailApiCall(movieId);
    getSimiliarApiCall(movieId);
}, 500);


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function getMovieDetailApiCall(movieId) {
    console.log(movieId);
    let request = new XMLHttpRequest();
    request.open("GET", "https://api.themoviedb.org/3/movie/" + movieId + "?api_key=a1fa65b33d89e3f619006594e9eb848b&page=1");
    request.send();

    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let res = JSON.parse(this.responseText);
            //debugger;
            displayMovieDetails(res);
        }
        else if (this.readyState == 4 && this.status == 404) {
            console.log("not found")
        }

    }
}

function getSimiliarApiCall(movieId) {
    console.log(movieId);
    let request = new XMLHttpRequest();
    request.open("GET", "https://api.themoviedb.org/3/movie/" + movieId + "/similar?api_key=a1fa65b33d89e3f619006594e9eb848b");

    request.send();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let res = this.responseText;
            res = JSON.parse(res);
            displaySimiliar(res.results);
        }
        else if (this.readyState == 4 && this.status == 404) {
            console.log("not found")
        }

    }
}

function displayMovieDetails(movieDetailData){
    let genres = arrayToString(movieDetailData.genres);
    let countries = arrayToString(movieDetailData.production_countries);
    let companies = arrayToString(movieDetailData.production_companies);
    let movie_details = "<div class='row animated fadeIn'>";

    movie_details += "<div class='col-sm-12'>";
    movie_details += "<h1>"+movieDetailData.title+ "</h1>";
    movie_details += "<h5>"+movieDetailData.tagline+ "</h5>";
    movie_details += "<p class='overview'>" + movieDetailData.overview + "</p>";
    movie_details += "</div>";
    
    movie_details += "<div class='col-sm-6'>";

    if (movieDetailData.poster_path) {
        movie_details += "<img src='https://image.tmdb.org/t/p/w300_and_h450_bestv2/" + movieDetailData.poster_path + "' width='100%'/><br><br>"
    } else {
        movie_details += "<img src='http://via.placeholder.com/300x450' width='100%'/><br><br>"
    }
    movie_details += "</div>";
    
    movie_details += "<div class='col-sm-6'>";
    movie_details += '<p><b>Other info</b></p>';
    movie_details +='<table class="table table-bordered table-condensed"><tbody>';
    movie_details +='<tr><td class="td-label">Release date</td><td class="td-value">'+movieDetailData.release_date +'</td></tr>';
    movie_details +='<tr><td class="td-label">Genres</td><td class="td-value">'+genres+'</td></tr>';
    movie_details +='<tr><td class="td-label">Runtime</td><td class="td-value">'+movieDetailData.runtime+' mins</td></tr>';
    movie_details +='<tr><td class="td-label">Popularity</td><td class="td-value">'+movieDetailData.popularity+'</td></tr>';
    movie_details +='<tr><td class="td-label">Country</td><td class="td-value">'+countries+'</td></tr>';
    movie_details +='<tr><td class="td-label">Language</td><td class="td-value">'+movieDetailData.original_language+'</td></tr>';
    movie_details +='<tr><td class="td-label">Production</td><td class="td-value">'+companies+'</td></tr>';
    movie_details +='<tr><td class="td-label">Vote average</td><td class="td-value">'+movieDetailData.vote_average+'</td></tr>';
    movie_details +='<tr><td class="td-label">Vote count</td><td class="td-value">'+movieDetailData.vote_count+'</td></tr>';
    movie_details +='</tbody></table>';
    movie_details +='</div></div>';

    document.getElementById("movie-detail").innerHTML = movie_details;
}
    
function displaySimiliar(movies){
    let similar_movies = "<div class='row animated fadeIn'>";
    similar_movies += "<div class='col-sm-12 text-center'>";
    if (movies.length == 0) {
        similar_movies += "<h2 id='similiar-title' class=' oops'>Oops !! There are no similar films</h2>";
    } else {
        similar_movies += "<h2 id='similiar-title'>Similar Movies</h2>";
    }
    similar_movies += "</div>";

    for (let i = 0; i < Math.min(movies.length,6); i++) {
        similar_movies += "<div class='col-sm-2 movie'>";
        similar_movies +="";
        if (movies[i].poster_path) {
            similar_movies += "<img src='https://image.tmdb.org/t/p/w300_and_h450_bestv2/" + movies[i].poster_path + "' width='100%'><br>";
        }else {
            similar_movies += "<img src='http://via.placeholder.com/300x450' width='100%'>";
        }
        similar_movies +="<h4 class='text-center'>" + movies[i].title + "</h4>";
        similar_movies +="</a></div>";
    }
    similar_movies += "</div>";
    document.getElementById("similar_movies").innerHTML = similar_movies;
}

function arrayToString(query) {
    let array = []
    for (let i = 0; i <= query.length -1; i++) {
        array.push(query[i].name);
    }
    return array.toString()
}
