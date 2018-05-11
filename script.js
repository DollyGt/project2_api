let request = new XMLHttpRequest();
let APIKEY = "9cb2fb22"

function displayNicely(apiData) {
    let newData = JSON.parse(apiData);
    console.log(newData);
    
    let htmlString1 = "<div class='whatever'><strong>Title:</strong> " + newData.Title + "</div>";
    htmlString1 += "<div><strong>Year:</strong> " + newData.Year + "</div>";
    htmlString1 += "<div><strong>Actors:</strong> " + newData.Actors + "</div>";
    document.getElementById("general_info").innerHTML = htmlString1
    
    
    let htmlString2 = "<div><strong>Writer:</strong> " + newData.Writer + "</div>";
    document.getElementById("further_info").innerHTML = htmlString2
}

function submitFilm() {
    let filmTitle = document.getElementById("filmForm")['film'].value;
    
    request.open("GET", "https://www.omdbapi.com/?t="+ filmTitle +"&apikey=" + APIKEY);
    
    request.send();
    
}


request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        displayNicely(this.responseText);
    }else if (this.readyState == 4 && this.status == 404) {
        console.log("error")
    }
}



