

//--------- HOME PAGE LISTS ----------
//--------- API call and listing of movies by popularity,release date & vote ----------


function homePageMovieListsApiCall(sortBy) {
    
    let request = new XMLHttpRequest();

    request.open("GET", "https://api.themoviedb.org/3/discover/movie?api_key=a1fa65b33d89e3f619006594e9eb848b&language=en-US&sort_by=" + sortBy);

    request.send();
    
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if (sortBy == "popularity.desc") {
                homePageMovieLists(this.responseText, "pop_desc");
            }
            if (sortBy == "release_date.desc") {
                homePageMovieLists(this.responseText, "date_desc");
            }
            if (sortBy == "vote_average.desc") {
                homePageMovieLists(this.responseText, "vote_desc");
            }
            
        }
        else if (this.readyState == 4 && this.status == 404) {
            console.log("error");
        }
    };
}

// function displayFilmsPopDesc(apiData) {
//     let newData = JSON.parse(apiData);
//     let moviesPopDesc = ""
//     for (let i = 0; i <= 10; i++) {
//         moviesPopDesc += "<a href='#' onclick='getMovieDetailApiCall(" + newData.results[i].id +")'><h6>" + newData.results[i].title + "</h6></a>" 
//     }
//     document.getElementById("pop_desc").innerHTML = moviesPopDesc
// }

// function displayFilmsPopAsc(apiData) {
//     let newData = JSON.parse(apiData);
//     let moviesPopAsc = ""
//     for (let i = 0; i <= 10; i++) {
//         moviesPopAsc += "<a href='#' onclick='getMovieDetailApiCall(" + newData.results[i].id +")'><h6>" + newData.results[i].title + "</h6></a>" 
//     }
//     document.getElementById("pop_asc").innerHTML = moviesPopAsc
// }

function homePageMovieLists(apiData, htmlId) {
    let newData = JSON.parse(apiData);
    let movies = "";
    for (let i = 0; i <= 10; i++) {
        movies += "<a href='#' onclick='getMovieDetailApiCall(" + newData.results[i].id +")'><h6>" + newData.results[i].title + "</h6></a>" ;
    }
    document.getElementById(htmlId).innerHTML = movies;
}


homePageMovieListsApiCall("popularity.desc");
homePageMovieListsApiCall("release_date.desc");
homePageMovieListsApiCall("vote_average.desc");







//--------- SEARCH & RESULTS ----------
//--------- API call and movie list search results ----------


function searchResultsApiCall() {
    
    let request = new XMLHttpRequest();
    let movieTitle = document.getElementById("movieForm")['movie'].value;

    request.open("GET", "https://api.themoviedb.org/3/search/movie?api_key=a1fa65b33d89e3f619006594e9eb848b&page=1&query=" + movieTitle);

    request.send();
    
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            searchResultsMovieList(this.responseText);
        }
        else if (this.readyState == 4 && this.status == 404 || this.status == 422) {
            document.getElementById("movie_list").innerHTML = "<h3>No Movies match your query - please try again</h3>"
        }
    };
    document.getElementById("top_movies_lists").classList.add("display_none");
    
    return false;
}


function searchResultsMovieList(apiData) {
    let newData = JSON.parse(apiData);
    let count = 0;
    let movie_list_details = "<div class='row'>";
    
    if (newData.results.length == 0) {
        movie_list_details = "<h5>No movies match what you have entered! Please try again</h5></div>"
    }
    
    for (let i = 0; i <=newData.results.length -1; i++) {
        
        if (count %4 == 0) {
            movie_list_details += "</div>" + "<div class='row'>";
        }
        
        movie_list_details += "<div class='col-sm-3 movie'><a href='#' onclick='getMovieDetailApiCall(" + newData.results[i].id +")'>";
           if (newData.results[i].poster_path) {
                movie_list_details += "<img src='https://image.tmdb.org/t/p/w300_and_h450_bestv2/" + newData.results[i].poster_path + "' width='100%'><br>";
            }else {
            movie_list_details += "<img src='images/placeholder.png' width='100%'>";
            }
        movie_list_details += "<h4>" + newData.results[i].title + "</h4><br>";
        movie_list_details +="</a></div>";
        
        count ++;
    }
    
    movie_list_details += "</div>";
    
    document.getElementById("movie_list").innerHTML = movie_list_details;
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

function displayMovieDetails(movieDetail, similarMovies){
    
    let movieDetailData = JSON.parse(movieDetail);
    let similarMoviesData = JSON.parse(similarMovies)
    
    // let prod_companies_array = []
    // for (let i = 0; i <= newData.production_companies.length -1; i++) {
    //     prod_companies_array.push(newData.production_companies[i].name);
    // }
    // let prod_companies_string = prod_companies_array.toString()
    
    
    // let prod_countries_array = []
    // for (let i = 0; i <= newData.production_countries.length -1; i++) {
    //     prod_countries_array.push(newData.production_countries[i].name);
    // }
    // let prod_countries_string = prod_countries_array.toString()
    
    
    // let genres_array = []
    // for (let i = 0; i <= newData.genres.length -1; i++) {
    //     genres_array.push(newData.genres[i].name);
    // }
    // let genres_string = genres_array.toString()
    
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
    movie_details += "<div><strong>Release-date:</strong> " + movieDetailData.release_date + "</div>";
    movie_details += "<div><strong>Genres:</strong> " + genres + "</div>";
    movie_details += "<div><strong>Overview:</strong> " + movieDetailData.overview + "</div>";
    movie_details += "<div><strong>Runtime:</strong> " + movieDetailData.runtime + "mins</div>";
    movie_details += "<div><strong>Revenue:</strong>$" + movieDetailData.revenue + "</div>";
    movie_details += "<div><strong>Status:</strong> " + movieDetailData.status + "</div>";
    movie_details += "<div><strong>Popularity:</strong> " + movieDetailData.popularity + "</div>";
    movie_details += "<div><strong>Production-countries:</strong> " + countries + "</div>";
    movie_details += "<div><strong>Original-language:</strong> " + movieDetailData.original_language + "</div>";
    movie_details += "<div><strong>Production-companies:</strong> " + companies + "</div>";
    movie_details += "<div><strong>Vote-average:</strong> " + movieDetailData.vote_average + "</div>";
    movie_details += "<div><strong>Vote-count:</strong> " + movieDetailData.vote_count + "</div>";
    movie_details += "</div>"
    movie_details +="</div>"
    
    
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





// function listFilmsPopAsc() {
    
//     let request = new XMLHttpRequest();

//     request.open("GET", "https://api.themoviedb.org/3/discover/movie?api_key=a1fa65b33d89e3f619006594e9eb848b&language=en-US&sort_by=popularity.asc")

//     request.send();
    
//     request.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//             displayFilmsPopAsc(this.responseText);
//             }
//         else if (this.readyState == 4 && this.status == 404) {
//             console.log("error")
//         }
//     }

// }

// function listFilmsPopDesc() {
    
//     let request = new XMLHttpRequest();
    
//     request.open("GET", "https://api.themoviedb.org/3/discover/movie?api_key=a1fa65b33d89e3f619006594e9eb848b&language=en-US&sort_by=popularity.desc")

//     request.send();
    
//     request.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//             console.log(this.responseText)
//             displayFilmsPopDesc(this.responseText);
//             }
//         else if (this.readyState == 4 && this.status == 404) {
//             console.log("error")
//         }
//     }
// }












