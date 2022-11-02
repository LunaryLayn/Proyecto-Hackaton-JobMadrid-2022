/* Pagina creada por Hugo Polo Gonzalez para la Hackaton de JobMadrid 2022*/

//Archivo JS para las funciones FrontEnd

//Arranque inicial de la pagina, y funciones para cargar algunos elementos de la misma
$(function () {
    console.log("ready!");
    $("#range_val").html("Distancia maxima: " + $("#range").val() + "m");
    typewriter(); //Carga de la animacion del titulo
    initMap(); //Carga del mapa inicial localizado en ¡Mi ciudad!
    loadSearchBar(); //Carga el autocompletado de la barra de busqueda
    loadRouteSearch(); //Carga la barra de las busquedas de ruta
    service = new google.maps.places.PlacesService(map); //Inicializa la API Places de Google Maps 
})

//Animacion titulo
var quoteArray = ["Reto de Frontend para la Hackathon de JOBMadrid 2022"];
var textPosition = 0;
var speed = 100;

typewriter = () => {
    document.getElementById('title').innerHTML = quoteArray[0].substring(0, textPosition) + '<span>&#10074</span>';

    if (textPosition++ != quoteArray[0].length)
        setTimeout(typewriter, speed);
}

/*Evento para activar y desactivar los clases que identifican que boton esta clickado a traves de un switch
ademas de añadir las variables de filtro necesarias para la busqueda*/
$('.flr').on({
    click: function () {
        switch ($(this).prop('id')) {
            case 'restaurant':
                $(this).toggleClass('btnWhiteClicked');
                $('#park').removeClass('btnWhiteClicked');
                $('#bar').removeClass('btnBlueClicked');
                filter = 'restaurant';
                keyw = '';
                break;
            case 'park':
                $(this).toggleClass('btnWhiteClicked');
                $('#restaurant').removeClass('btnWhiteClicked');
                $('#bar').removeClass('btnBlueClicked');
                filter = 'park';
                keyw = 'parque al aire libre';
                break;
            case 'bar':
                $(this).toggleClass('btnBlueClicked');
                $('#park').removeClass('btnWhiteClicked');
                $('#restaurant').removeClass('btnWhiteClicked');
                filter = 'bar';
                keyw = '';
                break;
        }
    }
});

//Bloque de funciones que realizan la busqueda por filtro y añaden los marcadores
let service;
let filter;
let keyw;
var markerSearched = [];
var modal = $('#modalFilter'); 

//Evento que inicializa la busqueda por filtro
$('#btnSearch').on("click", function (e) {
    if ($("button").hasClass("btnWhiteClicked") || $("button").hasClass("btnBlueClicked")) { //Si alguna de las clases "clicked" existe, ejecuta la busqueda
        var currentLocation = marker.getPosition();
        var dist = $("#range").val();

        var request = {
            keyword: keyw,
            location: currentLocation,
            radius: dist,
            type: [filter]
        }
        service.nearbySearch(request, nearbyCallback);
    }
    else { //Si no, nos limpiara la pantalla (si hemos hecho una busqueda anterior) y nos avisara de elegir un filtro personalizando la ventana modal
        deleteMarkers();
        modal.find('.modal-title').text('¡No has elegido ningun filtro!');
        modal.find('.modal-body').text('Por favor, escoge alguno de nuestros filtros antes de realizar tu busqueda.');
        $('#modalFilter').modal('show');
    }
});

//Callback para el servicio Places de la API de Google Maps, detecta las coincidencias de nuestra busqueda
function nearbyCallback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        deleteMarkers();
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
    else if (status == google.maps.places.PlacesServiceStatus.ZERO_RESULTS) { //Si no hay resultados, enseña la ventana modal, personaliza su mensaje y limpia los filtros
        deleteMarkers();
        $('#bar').removeClass('btnBlueClicked');
        $('#park').removeClass('btnWhiteClicked');
        $('#restaurant').removeClass('btnWhiteClicked');
        modal.find('.modal-title').text('Ups, no hemos encontrado nada...');
        modal.find('.modal-body').text('No hemos podido encontrar ningun resultado con la busqueda que estas intentando realizar...');
        $('#modalFilter').modal('show');
    }
}

/*Crea cada uno de los marcadores de la busqueda y los inserta en el mapa, ademas de 
añadirles un listener para activar la ruta automatica si se hace click.*/
function createMarker(place) {
    console.log(place);
    var nmarker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(nmarker, "click", function () {
        console.log("click!");
        calcRoute(this.getPosition());
    });
    markerSearched.push(nmarker);

}

//Borra todos los marcadores generados por busqueda
function deleteMarkers() { 
    for (var i = 0; i < markerSearched.length; i++) {
        markerSearched[i].setMap(null);
    }
    markers = [];
}

//Logicas visuales
//Logica del slider de distancias:
$("#range").on("input change", function () {
    if ($(this).val() == 1000) {
        $("#range_val").html("Distancia maxima: 1km");
    }
    else {
        $("#range_val").html("Distancia maxima: " + $(this).val() + "m");
    }
});







