
//--------- HOME PAGE LISTS ----------
//--------- API call and listing of movies by popularity,release date & vote ----------

homePageMovieListsApiCall("popularity.desc");
homePageMovieListsApiCall("release_date.desc");
homePageMovieListsApiCall("vote_average.desc");
homePageMovieListsApiCall("revenue.desc");
getGenres();

//--------- SEARCH & RESULTS ----------
//--------- API call and movie list search results ----------

function searchResultsApiCall() {
    console.log('search api call');

    let request = new XMLHttpRequest();
    let movieInputValue = document.getElementById("movie").value;
    let genre = '';

    let el = document.getElementById("genres-select");

    //let opt = el.options[el.selectedIndex];


    //console.log('genre : '+opt.value);

    if(movieInputValue !== ''){
        let top10 = document.getElementById("top10");
        top10.className +=' animated';
        top10.className +=' fadeOut';

        setTimeout(function(){
            top10.className +=' hidden';

            if(genre === ''){
                request.open("GET", "https://api.themoviedb.org/3/search/movie?api_key=a1fa65b33d89e3f619006594e9eb848b&language=en-US&query="+movieInputValue);
            } else {
                request.open("GET", "https://api.themoviedb.org/3/search/movie?api_key=a1fa65b33d89e3f619006594e9eb848b&language=en-US&with_genre="+genre+"&query="+movieInputValue);
            }

            request.send();
            request.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    searchResultsMovieList(this.responseText);
                } else if(this.readyState === 4 && this.status != 200){
                    console.log('search api something wrong '+this.status);
                }
            };
        }, 700);

    } else {
        document.getElementsByName('movie')[0].placeholder='Please type search phrase';
        frontMessage('info','','Please type search phrase');
    }

    return false;
}


function searchResultsMovieList(apiData) {
    let newData = JSON.parse(apiData);
    let count = 0;
    let movie_list_details = "<div class='animated fadeInBottom'><div class='row moviesRow'>";

    if (newData.results.length == 0) {
        console.log("json null");
        frontMessage('danger','No movies match your query!','Please try again');
        return false;
    }

    console.log(newData);

    for (let i = 0; i <=newData.results.length -3; i++) {

        if (count %6 == 0 && count !==0) {
            movie_list_details += "</div><div class='row divider'></div><div class='row moviesRow'>";
        }

        movie_list_details += "<div class='col-sm-2 movie'><a href='result.html?id="+newData.results[i].id+"'>";
           if (newData.results[i].poster_path && newData.results[i].poster_path !== null) {
                movie_list_details += "<img src='https://image.tmdb.org/t/p/w300_and_h450_bestv2/" + newData.results[i].poster_path + "' width='100%'><br>";
            }else {
            movie_list_details += "<img src='http://via.placeholder.com/300x450' width='100%'>";
            }
        movie_list_details += "<h4 class='text-center'>" + newData.results[i].title + "</h4><br>";
        movie_list_details +="</a></div>";

        count ++;
    }

    movie_list_details += "</div></div>";

     document.getElementById("movie_list").innerHTML = movie_list_details;
    // let movieList = document.getElementById("movie_list");
    // movieList.classList+= ' animated';
    // movieList.classList+= ' fadeInBottom';
}

document.onkeyup = function(a) {
    if(a.which === 13) {
        searchResultsApiCall();
    }
};
//--------- MOVIE DETAIL MODAL ----------
//--------- API call and display movie detail modal  ----------

function getMovieDetailApiCall(movieId) {
    console.log(movieId)
    let request1 = new XMLHttpRequest();
    let request2 = new XMLHttpRequest();
    
    request1.open("GET", "https://api.themoviedb.org/3/movie/" + movieId + "?api_key=a1fa65b33d89e3f619006594e9eb848b&page=1");
    
    request2.open("GET", "https://api.themoviedb.org/3/movie/" + movieId + "/similar?api_key=a1fa65b33d89e3f619006594e9eb848b");
    
    request1.send();
    request2.send();
    
    request1.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let request1data = this.responseText
            
            request2.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let request2data = this.responseText
                
                displayMovieDetails(request1data, request2data)
                
            }
            else if (this.readyState == 4 && this.status == 404) {
                console.log("error")
            }
                
            }
            
        }
        else if (this.readyState == 4 && this.status == 404) {
            console.log("error")
        }
        
    }
}

// -----modal-----

function displayMovieDetails(movieDetail, similarMovies){
    
    let movieDetailData = JSON.parse(movieDetail);
    let similarMoviesData = JSON.parse(similarMovies)
    
   
    function arrayToString(query) {
        let array = []
        for (let i = 0; i <= query.length -1; i++) {
            array.push(query[i].name);
        }
        return array.toString()
    }

    let genres = arrayToString(movieDetailData.genres)
    let countries = arrayToString(movieDetailData.production_countries)
    let companies = arrayToString(movieDetailData.production_companies)
    
    
    let movie_title = movieDetailData.title
    
    let movie_details = "<div class='row'>"
    movie_details += "<div class='col-sm-6'>"
    
    if (movieDetailData.poster_path) {
    movie_details += "<img src='https://image.tmdb.org/t/p/w300_and_h450_bestv2/" + movieDetailData.poster_path + "' width='300'></div>"
    }else {
    movie_details += "<img src='images/placeholder.png' width='300'></div>" 
    }
   
    movie_details += "<div class='col-sm-6'>"
   
    movie_details += movieDetailData.tagline
    movie_details += "<div><strong>Overview:</strong> " + movieDetailData.overview + "</div>";
    movie_details += "<div><strong>Release-date:</strong> " + movieDetailData.release_date + "</div>";
    movie_details += "<div><strong>Genres:</strong> " + genres + "</div>";
    movie_details += "<div><strong>Runtime:</strong> " + movieDetailData.runtime + "mins</div>";
    movie_details += "<div><strong>Popularity:</strong> " + movieDetailData.popularity + "</div>";
    movie_details += "<div><strong>Production-countries:</strong> " + countries + "</div>";
    movie_details += "<div><strong>Original-language:</strong> " + movieDetailData.original_language + "</div>";
    movie_details += "<div><strong>Production-companies:</strong> " + companies + "</div>";
    movie_details += "<div><strong>Vote-average:</strong> " + movieDetailData.vote_average + "</div>";
    movie_details += "<div><strong>Vote-count:</strong> " + movieDetailData.vote_count + "</div>";
    
    
    let similar_movies = "<h4>Similar Movies</h4><div class='row'>"
    
    if (similarMoviesData.results.length == 0) {
        similar_movies += "<h5> There are no similar movies :(</h5></div>"
    }
    
    for (let i = 0; i < Math.min(similarMoviesData.results.length,4); i++) {
        similar_movies += "<div class='col-sm-3'><a href='#' onclick='getMovieDetailApiCall(" + similarMoviesData.results[i].id +")'>"
          if (similarMoviesData.results[i].poster_path) {
                similar_movies += "<img src='https://image.tmdb.org/t/p/w300_and_h450_bestv2/" + similarMoviesData.results[i].poster_path + "' width='100%'><br>"
            }else {
            similar_movies += "<img src='images/placeholder.png' width='100%'>" 
            }
        similar_movies += "<h4>" + similarMoviesData.results[i].title + "</h4><br>"
        similar_movies +="</a></div>"
    }
     similar_movies += "</div>"
    
    document.getElementById("movie_title").innerHTML = movie_title
    document.getElementById("movie_detail").innerHTML = movie_details
    document.getElementById("similar_movies").innerHTML = similar_movies
   
    $("#myModal").modal('show');
}


// -----------end of search for any movies-----


function doRequestGenres(funcToCall) {
    let request = new XMLHttpRequest();
    request.open("GET", "https://api.themoviedb.org/3/genre/movie/list?api_key=e5dce9ac19487be2b65ceb7be99e8ca7" )
    request.send();
    request.onreadystatechange= function (){
        if (this.readyState == 4 && this.status == 200){
            funcToCall(this.responseText)
        }
    }
}

function genreSelect(apiData){
    let genreData = JSON.parse(apiData)
    let genreSelection = "";
    for (let i = 0; i <= genreData.genres.length -1; i++) {
        genreSelection += "<button id='genre" + genreData.genres[i].id + "'class='btn btn-success' onclick='genreAdapt(" + genreData.genres[i].id + ")'>" + genreData.genres[i].name + "</button>"
    }
    document.getElementById('genre_canvas').innerHTML = genreSelection
}

let genreIds = [];
function genreAdapt(genreId) {
    let fullGenreId = "#genre" + genreId;
    if(genreIds.includes(genreId)) {
        $(fullGenreId).css("background-color", "lemonchiffon")
        while (genreIds.indexOf(genreId) !== -1) {
            genreIds.splice(genreIds.indexOf(genreId), 1);
        }
        let genreIdsString = genreIds.join();
        doRequestMain(yearSelect,genreIdsString);
        doRequestMain(showMovies,genreIdsString);
    }else {
        $(fullGenreId).css("background-color", "#C83725")
        genreIds.push(genreId);
        let genreIdsString = genreIds.join();
        doRequestMain(yearSelect,genreIdsString);
        doRequestMain(showMovies,genreIdsString);
    }
}

function getGenres(){

    let request = new XMLHttpRequest();
    let url = "    https://api.themoviedb.org/3/genre/movie/list?api_key=a1fa65b33d89e3f619006594e9eb848b&language=en-US";
    request.open("GET", url);
    request.send();
    request.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let resJson = JSON.parse(this.responseText);
            displayGenresSelectBox(resJson);
        }
        else if (this.readyState === 4 && this.status !== 200) {
            console.log("error with top10 api call");
        }
    };
}










