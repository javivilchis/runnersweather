$( document ).ready(function() {
     if(JSON.parse(localStorage.getItem("city"))){
          $city = JSON.parse(localStorage.getItem("city"));
          callApi($city[0],$token);
     } else {
          callApi("irving",$token);
     }
  
    $mycities = JSON.parse(localStorage.getItem("city"));
     console.log("my cities: "+ $mycities[0]);
     $("#previous").html($mycities.map(
          function($cityWeather){
               return `<button class="btn btn-outline-secondary" id="cityweather" name="${$cityWeather}" value="${$cityWeather}" type="button">${$cityWeather}</button>`
           }));
 });

 $("#cityweather").click(function(){
      console.log("clicked");//don't know why this is not working.
      $city = $this.name.val();
      callApi($city,$token);
 });
 //console.log("BUTTON: "+ $("#previous #cityweather").val());
$token = config.WEATHER_API_KEY;
$cities = [];
// dealing with the form
$form = $("#weathersearch");
$form.submit(function(e){
     e.preventDefault();
     $city = $("input[name='city']").val();
     callApi($city,$token);
     
     $cities.push($city);
     localStorage.setItem('city', JSON.stringify($cities));
    
})

//$cities.push(JSON.parse(localStorage.getItem('city')));
//localStorage.setItem('city', JSON.stringify($cities));

var callApi = function($city,$token){
     fiveDayForecast($city,$token);
     $api = "https://api.openweathermap.org/data/2.5/weather?q="+$city+"&appid="+ $token +"&units=imperial";
     $.post( $api)
     .done(function( data ) { 
          // console.log(data);
          
          var currentWeather = $(".current-weather")
          .html(`
          <h1>${data.name} <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"></h1>
          <ul>
          <li>${data.weather[0].description}</li>
          <li>${data.main.temp}˚F </li>
          <li>Humidity: ${data.main.humidity}%</li>
          <li>Feels Like: ${data.main.feels_like}˚F </li>
          <li>Min Temperature: ${data.main.temp_min}˚F </li>
          <li>Wind Speed: ${data.wind.speed}</li>
          <li>Max Temperature: ${data.main.temp_max}˚F </li>
          <li>Pressure: <span class="label label-success">${data.main.pressure}</span> </li>
          </ul>
          `);
           
          //console.log( "Data Loaded: " + data );
         $(".current-weather").val(currentWeather)
     });
}

var fiveDayForecast = function($city,$token){
     console.log("HERE");
     $api = "https://api.openweathermap.org/data/2.5/forecast?q="+$city+"&appid="+ $token + "&units=imperial";
     $.post( $api)
     .done(function( data ) { 
          console.log(data);
          //console.log("FIVEDAYS: " + JSON.stringify(data));

          var currentWeather = $("#fiveday").html($mycities.map(
               function($cityWeather){
                    return `
                         <div class="col pb-4">
                         <div class="p-4 bg-secondary bg-gradient text-white fdforecast">
                         <h1>Temp Here</h1>
                         <ul>
                         <li>Temp:</li>
                         </ul>
                         </div>
                         </div>
          `}));
           
          //console.log( "Data Loaded: " + data );
         $("#fiveday").val(currentWeather)




     });
}

var getGeoLocation = function(){
     if ("geolocation" in navigator){ //check geolocation available 
		//try to get user current location using getCurrentPosition() method
		navigator.geolocation.getCurrentPosition(function(position){ 
				/*$("#result").html("Found your location <br />Lat : "+position.coords.latitude+" </br>Lang :"+ position.coords.longitude);*/
                    $lat = position.coords.latitude;
                    $lon = position.coords.longitude;
                    getLocationByGeo($lat,$lon);
			});
	}else{
		console.log("Browser doesn't support geolocation!");
	}
}

//getGeoLocation();

var getLocationByGeo = function($lat,$lon){
     console.log("getLocationByGeo");
     $api = "https://api.openweathermap.org/data/2.5/forecast?lat="+ $lat + "&lon="+$lon+"&appid="+ $token;
    console.log(getData($api,$token));

     console.log("Current Location: " + $api);
}

var getData = function($api,$token){
     $.post( $api,$token)
     .done(function( data ) { 
          
          return data;
     });
}