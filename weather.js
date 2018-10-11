//document.onreadystatechange = function() {
//    if (document.readyState === "complete") {
//    document.getElementById("button").addEventListener("click", function () {
//
//        console.log('click');
//        weather();
//    });
//
//}  
//}

var app = new Vue({
    el: "#forcast",
    data: {
        weather: {},
        search: '',
        daily: []


    }
});

document.getElementById("button").addEventListener("click", function () {

    console.log('click');
    weather();

});


function weather() {
    var city = document.getElementById("mySearch").value;
    console.log('click');




    app.search = city;


    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&type=like&units=metric&lang=fa&APPID=ad86ce3ee764480409cf4761eedd5260", {
            method: "GET"
        }).then(function (response) {
            if (response.ok) {
                return response.json();
            }
            alert("no data is found");
            console.log('Request succeeded: ' + response.statusText);
        }).then(function (json) {
            console.log(json);
            app.weather = json;
            console.log(json.list);
            dailyForcast(json.list);


        })
        .catch(function (error) {

            console.log("Request failed: " + error.message);
        });

}



function dailyForcast(list) {
    var forecast = [];
    for (var i = 0; i < 6; i = i + 1) {
        forecast.push(list[i]);
        var str = forecast[i].dt_txt;
        var date = str.slice(0, 10);
        var d = new Date(date);
        
        var weekday = new Array(7);
weekday[0] =  "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

var n = weekday[d.getDay()];

forecast[i].day = n;
    }
    app.daily = forecast;
}
