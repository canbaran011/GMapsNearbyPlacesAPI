class Places {
    constructor(lan, lat, rad) {
        this.lat = lat;
        this.lan = lan;
        this.rad = rad;
    }
}

class API {

    placeToList(place) {
        var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + place.lan + "," + place.lat + "&radius=" + place.rad + "&key=AIzaSyA1T08a21qZwlh3lzvMbPKkczLmcrJJ8Mo";
        var xhr = new XMLHttpRequest();

        xhr.open('GET', url, true);

        xhr.onload = function () {

            if (this.status == 200) {
                var posts = JSON.parse(this.responseText);
                var html = "";

                // console.log(this.responseText);
                // console.log(posts);
                
                posts.results.forEach(post => {
                    html += `
                <div class="card float-left ml-2 mb-2" style="width:45%; height:160px;">
                <div class="card-body">

                <h5 class="card-title"><img class="mr-2" width="12px;" src="${post.icon}">
                <a target="_blank" href="https://www.google.com/search?q=${post.vicinity}">${post.name}</a>
                </h5>
                <h6 class="card-subtitle mb-2 text-muted">${post.vicinity}</h6>
                <p>  </p>
                 <p class="card-text"><span class="badge badge-warning">${post.types[0]}</span></p>
                </div>
                </div>
                        `;
                });
                    document.querySelector('#new-insertion').innerHTML = html;
            }
        }
        xhr.send();
    }
   
}

document.querySelector("#new-place").addEventListener("submit", function (e) {
   
    let lat = document.getElementById("lat").value;
    let lan = document.getElementById("lan").value;
    let rad = document.getElementById("rad").value;
    // console.log(lat);
    // console.log(lan);
    // console.log(rad);
  


    const place = new Places(lat, lan, rad);
    console.log("****C****A******N******");
    // console.log(place.lat);

    const api = new API();
    api.placeToList(place);
    initMap(place);
 

    e.preventDefault();


});



function initMap(place) {
    // The location of Uluru
    var uluru = {lat: parseFloat(place.lan) , lng: parseFloat(place.lat)};
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 12, center: uluru});
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({position: uluru, map: map});
  }

// without marker

// var map;
// function initMap(place) {
   
//   map = new google.maps.Map(document.querySelector('#map'), {
//     center: {lat:parseFloat(place.lan) , lng: parseFloat(place.lat)},
//     zoom: 12
//   });
// }
