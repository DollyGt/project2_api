//import "bootstrap/dist/css/bootstrap.min.css";
//import "./style.css";
//https://api.themoviedb.org/3/search/movie?api_key=a1fa65b33d89e3f619006594e9eb848b&page=1&query=future


function getMovieDetail(movieId) {
    let request = new XMLHttpRequest();
    request.open("GET", "https://api.themoviedb.org/3/movie/" + movieId + "?api_key=a1fa65b33d89e3f619006594e9eb848b&page=1");

    request.send();

    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            displayMovieDetails(this.responseText);
        }
        else if (this.readyState == 4 && this.status == 404) {
            console.log("error")
        }
    }
}

function displayMovieDetails(apiData){
    
    let newData = JSON.parse(apiData);
    
    let prod_companies_array = []
    for (let i = 0; i <= newData.production_companies.length -1; i++) {
        prod_companies_array.push(newData.production_companies[i].name);
    }
    let prod_companies_string = prod_companies_array.toString()
    
    
    let prod_countries_array = []
    for (let i = 0; i <= newData.production_countries.length -1; i++) {
        prod_countries_array.push(newData.production_countries[i].name);
    }
    let prod_countries_string = prod_countries_array.toString()
    
    
    let genres_array = []
    for (let i = 0; i <= newData.genres.length -1; i++) {
        genres_array.push(newData.genres[i].name);
    }
    let genres_string = genres_array.toString()
    
    
    
    let movie_title = newData.title
    
    let movie_details = "<div class='row'>"
    movie_details += "<div class='col-sm-6'>"
    movie_details += "<img src='https://image.tmdb.org/t/p/w300_and_h450_bestv2/" + newData.poster_path + "' width='300'></div>"
    movie_details += "<div class='col-sm-6'>"
    movie_details += newData.tagline
    movie_details += "<div><strong>Release-date:</strong> " + newData.release_date + "</div>";
    movie_details += "<div><strong>Genres:</strong> " + genres_string + "</div>";
    movie_details += "<div><strong>Overview:</strong> " + newData.overview + "</div>";
    movie_details += "<div><strong>Runtime:</strong> " + newData.runtime + "mins</div>";
    movie_details += "<div><strong>Revenue:</strong>$" + newData.revenue + "</div>";
    movie_details += "<div><strong>Status:</strong> " + newData.status + "</div>";
    movie_details += "<div><strong>Popularity:</strong> " + newData.popularity + "</div>";
    movie_details += "<div><strong>Production-countries:</strong> " + prod_countries_string + "</div>";
    movie_details += "<div><strong>Original-language:</strong> " + newData.original_language + "</div>";
    movie_details += "<div><strong>Production-companies:</strong> " + prod_companies_string + "</div>";
    movie_details += "<div><strong>Vote-average:</strong> " + newData.vote_average + "</div>";
    movie_details += "<div><strong>Vote-count:</strong> " + newData.vote_count + "</div>";
    movie_details += "</div>"
    movie_details +="</div>"
    
    document.getElementById("movie_title").innerHTML = movie_title
    document.getElementById("movie_detail").innerHTML = movie_details
   
    $("#myModal").modal('show');
}

function displaySearchResults(apiData) {
    let newData = JSON.parse(apiData);

    let movie_list_details = "<div class='row'>"
    for (let i = 0; i <=newData.results.length -1; i++) {
        movie_list_details += "<a href='#' onclick='getMovieDetail(" + newData.results[i].id +")'><div class='col-sm-4'>"
       
        movie_list_details += "<img src='https://image.tmdb.org/t/p/w300_and_h450_bestv2/" + newData.results[i].poster_path + "' width='300'><br>"
        movie_list_details += "<h4>" + newData.results[i].title + "</h4><br>"
   
        movie_list_details +="</div></a>"
    }
    movie_list_details +="</div>"
    
    document.getElementById("movie_list").innerHTML = movie_list_details
    


}

function submitFilm() {
    let request = new XMLHttpRequest();
    let filmTitle = document.getElementById("filmForm")['film'].value;

    request.open("GET", "https://api.themoviedb.org/3/search/movie?api_key=a1fa65b33d89e3f619006594e9eb848b&page=1&query=" + filmTitle);

    request.send();
    
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            displaySearchResults(this.responseText);
        }
        else if (this.readyState == 4 && this.status == 404) {
            console.log("error")
        }
    }
}




function listFilmsPopAsc() {
    
    let request = new XMLHttpRequest();

    request.open("GET", "https://api.themoviedb.org/3/discover/movie?api_key=a1fa65b33d89e3f619006594e9eb848b&language=en-US&sort_by=popularity.asc")

    request.send();
    
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            displayFilmsPopAsc(this.responseText);
            }
        else if (this.readyState == 4 && this.status == 404) {
            console.log("error")
        }
    }

}

function listFilmsPopDesc() {
    
    let request = new XMLHttpRequest();
    
    request.open("GET", "https://api.themoviedb.org/3/discover/movie?api_key=a1fa65b33d89e3f619006594e9eb848b&language=en-US&sort_by=popularity.desc")

    request.send();
    
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText)
            displayFilmsPopDesc(this.responseText);
            }
        else if (this.readyState == 4 && this.status == 404) {
            console.log("error")
        }
    }
}


function displayFilmsPopDesc(apiData) {
    alert("Im being called - desc")
    let newData = JSON.parse(apiData);
    console.log(newData)
    let moviesPopDesc = ""
    for (let i = 0; i <= 10; i++) {
        moviesPopDesc += "<a href='#' onclick='getMovieDetail(" + newData.results[i].id +")'><h6>" + newData.results[i].title + "</h6></a>" 
    }
    document.getElementById("pop_desc").innerHTML = moviesPopDesc
}

function displayFilmsPopAsc(apiData) {
    alert("Im being called - asc")
    let newData = JSON.parse(apiData);
    console.log(newData)
    let moviesPopAsc = ""
    for (let i = 0; i <= 10; i++) {
        moviesPopAsc += "<a href='#' onclick='getMovieDetail(" + newData.results[i].id +")'><h6>" + newData.results[i].title + "</h6></a>" 
    }
    document.getElementById("pop_asc").innerHTML = moviesPopAsc
}

function start(){
    listFilmsPopDesc();
    listFilmsPopAsc();
    
}








