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
