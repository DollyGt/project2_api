let movieId = getParameterByName('id');

console.log(movieId);

getMovieDetailApiCall(movieId);


// movie genres api call
// https://api.themoviedb.org/3/movie/{movie_id}/keywords?api_key=a1fa65b33d89e3f619006594e9eb848b
// reviews: https://api.themoviedb.org/3/movie/{movie_id}/reviews?api_key=a1fa65b33d89e3f619006594e9eb848b&language=en-US&page=1

// functions


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
    let request1 = new XMLHttpRequest();
    let request2 = new XMLHttpRequest();

    request1.open("GET", "https://api.themoviedb.org/3/movie/" + movieId + "?api_key=a1fa65b33d89e3f619006594e9eb848b&page=1");
    request2.open("GET", "https://api.themoviedb.org/3/movie/" + movieId + "/similar?api_key=a1fa65b33d89e3f619006594e9eb848b");

    request1.send();
    request2.send();

    request1.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let request1data = this.responseText;
            request2.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    let request2data = this.responseText;
                    displayMovieDetails(request1data, request2data);
                }
                else if (this.readyState == 4 && this.status == 404) {
                    console.log("error");
                }
            }
        }
        else if (this.readyState == 4 && this.status == 404) {
            console.log("not found")
        }

    }
}

function displayMovieDetails(movieDetail, similarMovies){

    let movieDetailData = JSON.parse(movieDetail);
    let similarMoviesData = JSON.parse(similarMovies);

    let genres = arrayToString(movieDetailData.genres);
    let countries = arrayToString(movieDetailData.production_countries);
    let companies = arrayToString(movieDetailData.production_companies);
    let movie_title = "<h1>"+movieDetailData.title+"</h1>";
    let movie_details = "<div class='row'>";

    movie_details += "<div class='col-sm-12'>";
    movie_details += "<h5>"+movieDetailData.tagline+ "</h5>";
    movie_details += "<p class='overview'>" + movieDetailData.overview + "</p>";
    movie_details += "</div>";
    movie_details += "</div>";
    movie_details += "<div class='row'>";
    movie_details += "<div class='col-sm-6'>";

    if (movieDetailData.poster_path) {
        movie_details += "<img src='https://image.tmdb.org/t/p/w300_and_h450_bestv2/" + movieDetailData.poster_path + "' width='300'></div>"
    } else {
        movie_details += "<img src='http://via.placeholder.com/300x450' width='300'></div>"
    }
    
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




    let similar_movies = "<h2>Similar Movies</h2><div class='row'>";

    if (similarMoviesData.results.length == 0) {
        similar_movies += "<h5> There are no similar movies :(</h5></div>";
    }

    for (let i = 0; i < Math.min(similarMoviesData.results.length,4); i++) {
        similar_movies += "<div class='col-sm-3'><a href='#' onclick='getMovieDetailApiCall(" + similarMoviesData.results[i].id +")'>";
        if (similarMoviesData.results[i].poster_path) {
            similar_movies += "<img src='https://image.tmdb.org/t/p/w300_and_h450_bestv2/" + similarMoviesData.results[i].poster_path + "' width='100%'><br>";
        }else {
            similar_movies += "<img src='images/placeholder.png' width='100%'>";
        }
        similar_movies +="<h4>" + similarMoviesData.results[i].title + "</h4><br>";
        similar_movies +="</a></div>";
    }
    similar_movies += "</div>";

    document.getElementById("movie_title").innerHTML = movie_title;
    document.getElementById("movie_detail").innerHTML = movie_details;
    document.getElementById("similar_movies").innerHTML = similar_movies;
}

function arrayToString(query) {
    let array = []
    for (let i = 0; i <= query.length -1; i++) {
        array.push(query[i].name);
    }
    return array.toString()
}
