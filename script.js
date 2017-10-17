(function() {
  // Changing the temperature
  function changeUnit () {
    if ($("#weather-unit").html() === "C"){
      $("#weather-unit").html("F");
      $("#weather-temp").html(Math.round(tempBkp * (9/5)+32));
    }else{
      $("#weather-unit").html("C");
      $("#weather-temp").html(tempBkp);
    }
  }
  function callApi (){
    // Validating Geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        apiLat = position.coords.latitude;
        apiLon = position.coords.longitude;
        $.getJSON(apiUrl, "APPID=" + apiKey + "&lat=" + apiLat + "&lon=" + apiLon + "&units=" + apiUnit + "&calback=res").done(function(res){
          // Success! Showing API info
          tempBkp = Math.round(res.main.temp);
          $("#weather-location").html("<h2>" + res.name + "</h2>");
          $("#weather-icon").prop("src", "http://openweathermap.org/img/w/" + res.weather[0].icon + ".png");
          $("#weather-icon").prop("alt", res.weather[0].description);
          $("#weather-temp").html(tempBkp);
          $("#weather-info").show();
        })
      },function(err){
        $("#error-message").show();
        $("#error-message").html("An error has occurred while trying to get your Geolocation: " + err.code + " - " + err.message);
      });
    }else{
      $("#error-message").show();
      $("#error-message").html("Geolocation is not supported by your browser.");
    }
  }
  
  // Initializing variables
    const apiKey = "f847bdc89393f7533d1c8e18a64a0979";
    const apiUnit = "metric";
    let apiLat;
    let apiLon;
    let tempBkp = 0;
    const apiUrl = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather";
  
  $(document).ready(function(){
    callApi();
    // Event to change unit
    $("#weather-unit").on("click",function(){
      changeUnit();
    });
    
  });
})()