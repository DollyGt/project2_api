//import "bootstrap/dist/css/bootstrap.min.css";
//import "./style.css";
//https://api.themoviedb.org/3/search/movie?api_key=a1fa65b33d89e3f619006594e9eb848b&page=1&query=future
let request = new XMLHttpRequest();

function displayNicely(apiData) {
    let newData = JSON.parse(apiData);
    

    let movie_list_details = "<div class='row'>"
    for (let i = 0; i <=newData.results.length -1; i++) {
        movie_list_details += "<div class='col-sm-4'>"
       
        movie_list_details += "<img src='https://image.tmdb.org/t/p/w300_and_h450_bestv2/" + newData.results[i].poster_path + "' width='300'><br>"
        movie_list_details += "<h1>" + newData.results[i].title + "</h1><br>"
        movie_list_details += "<strong>Release Date:</strong>" + newData.results[i].release_date 
   
        movie_list_details +="</div>"
    }
    movie_list_details +="</div>"
    
    $("#movie_list").append(movie_list_details)


    // let htmlString1 = "<div><strong>Title:</strong> " + newData.results[1].title + "</div>";
    // htmlString1 += "<div><strong>Year:</strong> " + newData.Year + "</div>";
    // htmlString1 += "<div><strong>Actors:</strong> " + newData.Actors + "</div>";
    //  document.getElementById("general_info").innerHTML = htmlString1


    // let htmlString2 = "<div><strong>Writer:</strong> " + newData.Writer + "</div>";
    // htmlString2 += "<div><strong>Runtime:</strong> " + newData.Runtime + "</div>";
    // htmlString2 += "<div><strong>Genre:</strong> " + newData.Genre + "</div>";
    // htmlString2 += "<div><strong>Director:</strong> " + newData.Director + "</div>";
    // htmlString2 += "<div><strong>Plot:</strong> " + newData.Language + "</div>";
    // htmlString2 += "<div><strong>Country:</strong> " + newData.Country + "</div>";
    // htmlString2 += "<div><strong>Production:</strong> " + newData.Production + "</div>";
    // htmlString2 += "<div><strong>Awards:</strong> " + newData.Awards + "</div>";
    // htmlString2 += "<div><strong>Type:</strong> " + newData.Type + "</div>";
    // htmlString2 += "<div><strong>Writer:</strong> " + newData.Writer + "</div>";
    // htmlString2 += "<div><strong>Released:</strong> " + newData.Released + "</div>";

    // document.getElementById("further_info").innerHTML = htmlString2
}

function submitFilm() {
    let filmTitle = document.getElementById("filmForm")['film'].value;

    request.open("GET", "https://api.themoviedb.org/3/search/movie?api_key=a1fa65b33d89e3f619006594e9eb848b&page=1&query=" + filmTitle);

    request.send();
}

request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        displayNicely(this.responseText);
    }
    else if (this.readyState == 4 && this.status == 404) {
        console.log("error")
    }
}


