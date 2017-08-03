$(document).ready(function() {

		var x = document.getElementById("location");

		function getLocation() {
		    if (navigator.geolocation) {
		        navigator.geolocation.getCurrentPosition(showPosition, showError);
		    } else {
		        x.innerHTML = "Geolocation is not supported by this browser.";
		    }
		}
		function showPosition(position) {

		    x.innerHTML = "Latitude: " + position.coords.latitude +
		    "<br>Longitude: " + position.coords.longitude;

		    $.getJSON("https://fcc-weather-api.glitch.me/api/current?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude)
				.done(update)
				.fail(showError);
		}

		getLocation();

		function showError(error) {
		    switch(error.code) {
		        case error.PERMISSION_DENIED:
		            x.innerHTML = "User denied the request for Geolocation."
		            break;
		        case error.POSITION_UNAVAILABLE:
		            x.innerHTML = "Location information is unavailable."
		            break;
		        case error.TIMEOUT:
		            x.innerHTML = "The request to get user location timed out."
		            break;
		        case error.UNKNOWN_ERROR:
		            x.innerHTML = "An unknown error occurred."
		            break;
		    }
		} 
	
});


		
			
		$("#temp").click(function() {
			var t = document.getElementById('num').innerHTML;
			var u = document.getElementById('unit').innerHTML;
			
			if(u == "C") {
		  		document.getElementById('num').innerHTML = ((t*1.8)+32).toFixed(1);
		  		document.getElementById('unit').innerHTML = "F";
			} else if (u == "F") {
				document.getElementById('num').innerHTML = ((t-32)/1.8).toFixed(1);
		  		document.getElementById('unit').innerHTML = "C";
			}

			$('#temp').html("<a href=\"#\">" + document.getElementById('num').innerHTML + String.fromCharCode(176) + document.getElementById('unit').innerHTML + "</a>");
				
		});


		function update(response) {

		  $('#num').html(response.main.temp.toFixed(1));
		  
		  $('#unit').html("C");
		  $('#temp').html("<a href=\"#\">" + document.getElementById('num').innerHTML + String.fromCharCode(176) + document.getElementById('unit').innerHTML + "</a>");
		  
		  $('#sky').html(response.weather[0].main);
		  $('#icon').html("<img src=" + JSON.stringify(response.weather[0].icon) + ">");
		  //$('#response,#author').fadeIn();

		  var img = "url('images/clear.jpg')";

		  if (document.getElementById('num').innerHTML < 5) {
		  	img = "url('images/cold.png')";
		  } else if (document.getElementById('num').innerHTML > 32) {
		  	img = "url('images/hot.jpg')";
		  } else if (document.getElementById('sky').innerHTML == "Clouds") {
		  	img = "url('images/cloudy2.jpg')";
		  } else {
		  	var num = Math.random();
		  	if (num < 0.3) {
		  		img = "url('images/clear.jpg')";
		  	} else if (num < 0.6) {
		  		img = "url('images/clear2.jpg')";
		  	} else {
		  		img = "url('images/clear3.jpg')";
		  	}
		  }


		  $('#weather-image').fadeOut(500, function()
			{
			    document.getElementById('weather-image').style.background = img + " no-repeat";
		  		document.getElementById('weather-image').style.backgroundSize = "cover";
			}).fadeIn(500);
		}