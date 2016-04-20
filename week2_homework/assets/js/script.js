var map;
var markers = [];
var service;
var request;

function initMap() {
	var venice = new google.maps.LatLng(45.4408,12.3155);

	map = new google.maps.Map(document.getElementById('map'), {
	    center: venice,
	    zoom: 15
	  });

	// infowindow = new google.maps.InfoWindow({
	//   content: ''
	// })

	var myQuery = document.getElementById('myQuery');
	var mySubmit = document.getElementById('mySubmit');

	mySubmit.addEventListener("click", function() {
		deleteMarkers();

		request = {
		  location: venice,
		  radius: '500',
		  query: myQuery.value
		};

		service = new google.maps.places.PlacesService(map);
		service.textSearch(request, callback);
	})

	
}

function callback(results, status) {
	if (status == google.maps.places.PlacesServiceStatus.OK) {
	  for (var i = 0; i < results.length; i++) {
	    var place = results[i];
	    createMarker(place);
	  }
	}
}

function createMarker(place) {
	var position = {'lat': place.geometry.location.lat(), 'lng': place.geometry.location.lng()};

	var marker = new google.maps.Marker({
	  position: position,
	  map: map,
	  title: place.name,
	  draggable: false,
	  animation: google.maps.Animation.DROP

	});
	markers.push(marker);
	
	// infowindow = null;
	var infowindow = new google.maps.InfoWindow({
	  content: place.name
	})
	google.maps.event.addListener(marker, 'click', function() {
		if (isInfoWindowOpen(infowindow)){
		    infowindow.close();
		} else {
		    infowindow.open(map,marker);
		}
	  
	})
}

function isInfoWindowOpen(infoWindow){
    var map = infoWindow.getMap();
    return (map !== null && typeof map !== "undefined");
}

function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function clearMarkers() {
  setMapOnAll(null);
}

function deleteMarkers() {
  clearMarkers();
  markers = [];
}