/* Pagina creada por Hugo Polo Gonzalez para la Hackaton de JobMadrid 2022*/

//Archivo JS para las funciones de mapa:
var map;
var marker;
var directionsService;
var directionsRenderer;
const ic = "./img/ic.png";

function initMap() {  //Inicializamos el mapa y el marcador (El lugar inicial sera el Wizink Center, donde sera el evento).
    var mapProp = {  
        center: new google.maps.LatLng(40.4240705091354, -3.6717941347189664),
        zoom: 15,
    };

    map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsService = new google.maps.DirectionsService();
    directionsRenderer.setMap(map);

    marker = new google.maps.Marker({
        position: {
            lat: 40.4240705091354,
            lng: -3.6717941347189664
        },
        map: map,
        draggable: true,
        icon: ic,
        optimized: false,
        zIndex:99999999
    });
}

function loadSearchBar() { //Esta funcion se encarga de cargar la funcionalidad de la barra de busqueda de autocompletado principal
    var searchBox = new google.maps.places.SearchBox(document.getElementById('autocomplete'));
    google.maps.event.addListener(searchBox, 'places_changed', function () {
        var places = searchBox.getPlaces();
        var bounds = new google.maps.LatLngBounds();
        var i, place;

        for (i = 0; place = places[i]; i++) {
            console.log(place.geometry.location);
            bounds.extend(place.geometry.location);
            marker.setPosition(place.geometry.location);
        }
        map.fitBounds(bounds);
        map.setZoom(15);
    });
}


//Funcion que calcula la ruta a seguir
function calcRoute(d) {
    const selectedMode = 'Walking';
    var currentLocation = marker.getPosition();
    var request = {
        origin: currentLocation,
        destination: d,
        travelMode: google.maps.TravelMode['WALKING']
    };
    directionsService.route(request, function(response, status) {
      if (status == 'OK') {
        directionsRenderer.setDirections(response);
      }
      else {
        var modal = $('#modalFilter'); 
        modal.find('.modal-title').text('Ups, no hemos encontrado ninguna ruta...');
        modal.find('.modal-body').text('No hemos podido encontrar ninguna ruta directa hacia el sitio que nos has indicado :(');
        $('#modalFilter').modal('show');
      }
    });
  }

//Barra de busqueda de rutas
var btnRoute = document.getElementById('btnRoute');

function loadRouteSearch() {
    var searchBox = new google.maps.places.SearchBox(document.getElementById('router'));
    google.maps.event.addDomListener(btnRoute, "click", function () {
        var places = searchBox.getPlaces();
        var i, place;
        for (i = 0; place = places[i]; i++) {
            calcRoute(place.geometry.location);
        }
    });
}


