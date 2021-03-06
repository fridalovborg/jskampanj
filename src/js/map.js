/* ----------------------------------------------------------------------------
			GOOGLE MAP
- initmap() returns the map and its places, users position
---------------------------------------------------------------------------- */
var map, infoWindow, an;

function initMap() {
	map = new google.maps.Map(document.getElementById('the-map'), {
		zoom: 15,
		scrollwheel: false
	});

	infoWindow = new google.maps.InfoWindow();
	var $myMarker;
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {

			// MY POSITION COORDS
			var pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
			an = google.maps.Animation.DROP;
			// MY POSITIONS MARKER
			if ($myMarker) {
				$myMarker.setPosition(pos);
			} else {
				$myMarker = new google.maps.Marker({
					position: pos,
					animation: an,
					map: map
				});
			}
			// INFO BOX FOR MY POSITION
			google.maps.event.addListener($myMarker, 'click', function() {
				var txt = '<strong>' + 'You are here!' + '</strong><br>';
				txt;

				infoWindow.setContent(txt);
				infoWindow.open(map, this);
			});
			// CAT SHELTERS REQUEST
			var request = {
				location: pos,
				radius: '50000',
				keyword: 'cat_shelter'
			};

			var services = new google.maps.places.PlacesService(map);
			services.nearbySearch(request, showPlaces);

			map.setCenter(pos);
		}, function() {
			handleLocationError(true, infoWindow, map.getCenter());
		});
	} else {
		// BROWSER DO NOT SUPPORT GEOLOCATION
		handleLocationError(false, infoWindow, map.getCenter());
	}
}
// THE PLACES
function showPlaces(results, status) {
	if(status == google.maps.places.PlacesServiceStatus.OK) {
		for(var i = 0; i<results.length; i++) {
 			addMarker(results[i]);
 			console.log(results[i]);
 		}
 	}
}
// MARKER/ICON TO PLACES
function addMarker(place) {
	an = google.maps.Animation.DROP;
	var marker = new google.maps.Marker({
		map: map,
		animation: an,
		position: place.geometry.location,
		icon: 'src/img/icon.png'
	});

	google.maps.event.addListener(marker, 'click', function() {
		var txt = '<strong>' + place.name + '</strong><br>';
		txt += place.vicinity;

		infoWindow.setContent(txt);
		infoWindow.open(map, this);
	});
}

/* ----------------------------------------------------------------------------
			ERROR MESSAGES
---------------------------------------------------------------------------- */
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
	'Ooops! Something went wrong...' :
	'Ooops! Try another browser...');
	infoWindow.open(map);
}