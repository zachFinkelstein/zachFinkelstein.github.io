//This script loads the view of the map onto the webpage

//Global variables for map loading
var infoWindow, map, latitude, longitude
var cumulativeCrops;
var calendarCrops;
var markers =[]
var drawingManager;
var addMarkerOnMap = false;
var cropToAdd

//In reality, we will want a function that can load markers onto the map within a certain region and will load more markers for larger
//areas. For a full version this could lead to latency with the scale of the overall project. So I need to load only the markers for the region that
//the person is looking at. Possibly lock zooming becuase of latency issues? It would be quite fast if there was a sorted list by latitude, longitude pairs of
//data points to go through.
//loadJSON()

//This function


require.config({
    paths: {
        'async': './async'
    }
});

    
define(['async!http://maps.google.com/maps/api/js?key=AIzaSyDmyIjv5THQy7J8piDzhZx73Z1YI4dlY5k&libraries=drawing&callback=initMap', 'Crops.js', 'data.js', 'cropRecommender'], function() {
    // Google Maps API and all its dependencies will be loaded here.
    var selection =false
var initMap = {
    functionCall: function () {
        var myStyles = [
            {
                featureType: "poi",
                elementType: "labels",
                stylers: [
                    {visibility: "off"}
                ]
            }
        ];
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 16,
            zoomControl: false,
            //styles: myStyles,
            center: {lat: 33.638260, lng: -117.839043}
        });

        drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: null,
            drawingControl: true,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: ['rectangle']
            },
            rectangleOptions: {
                fillColor: '#ffff00',
                fillOpacity: 0,
                strokeWeight: 1,
                clickable: false,
                editable: false,
                zIndex: 1
            }
        });
        infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                latitude = position.coords.latitude
                longitude = position.coords.longitude
                createData(latitude, longitude, 60)
                setMarkers(map);
                google.maps.event.addListener(map, 'bounds_changed', function () {
                    var bounds = map.getBounds();
                    var ne = bounds.getNorthEast();
                    var sw = bounds.getSouthWest();
                    getCropsForCurrentLocation(ne.lat(), ne.lng(), sw.lat(), sw.lng())
                });
                /*var bounds =  map.getBounds();
                var ne = bounds.getNorthEast();
                var sw = bounds.getSouthWest();
               getCropsForCurrentLocation(ne.lat, ne.lng, sw.lat, sw.lng)*/
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                map.setCenter(pos);
            }, function () {
                handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
        drawingManager.setMap(map);
        rectangle = null;
        google.maps.event.addListener(drawingManager, 'overlaycomplete', function (event) {
            if (event.type == google.maps.drawing.OverlayType.RECTANGLE) {
                if (rectangle != null)
                    rectangle.setMap(null);
                rectangle = event.overlay;
                var bounds = rectangle.getBounds();
                drawingManager.setDrawingMode(null);
                var bounds = rectangle.getBounds();
                var NE = bounds.getNorthEast();
                var SW = bounds.getSouthWest();
// North West
                var NW = new google.maps.LatLng(NE.lat(), SW.lng());
// South East
                var SE = new google.maps.LatLng(SW.lat(), NE.lng());
                getCropsForCurrentLocation(NE.lat(), NE.lng(), SW.lat(), SW.lng())
                //Modify JSON file to get data

                //JSON.stringify(dataAreaJSON)
            }
        });
        google.maps.event.addListener(drawingManager, "drawingmode_changed", function () {
            if ((drawingManager.getDrawingMode() == google.maps.drawing.OverlayType.RECTANGLE) &&
                (rectangle != null))
                rectangle.setMap(null);
        });


        map.addListener('click', function(event) {
            startLocation = event.latLng;
            console.log("BOB")
            if(addMarkerOnMap){
                console.log("Jone")

                placeMarker(startLocation)
            }
        });
    },
    updateSelection: function () {
        //var documentImage= document.getElementById("selector")
        selection = !selection;
        if (selection) {
            //  documentImage.body.style.background = "#ffffff";
            drawingManager.setDrawingMode(google.maps.drawing.OverlayType.RECTANGLE);
        } else {
            // documentImage.body.style.background = "#bbbdbf";
            drawingManager.setDrawingMode(null);
        }

    },



    allowRecommendation: function(cropType)
    {
       alert('We recommend that you plant a ' + cropType.getSpecies() + ' at a'
            + ' location of your choice. Please click the location' +
            'on the map that you would like to plant')
        addMarkerOnMap = true
        cropToAdd = cropType
    }
}
function placeMarker(location){
        if(addMarkerOnMap) {
            var shape = {
                coords: [1, 1, 1, 20, 18, 20, 18, 1],
                type: 'poly'
            };
            addMarker(location.lat(), location.lng(), cropToAdd)
            var marker = new google.maps.Marker({
                position: {lat: location.lat(), lng: location.lng()},
                map: map,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 8.5,
                    fillColor: cropToAdd.getColorCode(),
                    fillOpacity: 0.7,
                    strokeWeight: 0.4
                },
                draggable: true,
                shape: shape,
                title: cropToAdd.getSpecies(),
                zIndex: getCropMarkers().length-1
            });
            var bounds = map.getBounds();
            var ne = bounds.getNorthEast();
            var sw = bounds.getSouthWest();
            getCropsForCurrentLocation(ne.lat(), ne.lng(), sw.lat(), sw.lng())
            addMarkerOnMap = false
        }
}



// Data for the markers consisting of a name, a LatLng and a zIndex for the
// order in which these markers should display on top of each other.


function setMarkers(map) {
    // Adds markers to the map.

    // Marker sizes are expressed as a Size of X,Y where the origin of the image
    // (0,0) is located in the top left of the image.

    // Origins, anchor positions and coordinates of the marker increase in the X
    // direction to the right and in the Y direction down.
    var image = {
        url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(20, 32),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(0, 32)
    };
    // Shapes define the clickable region of the icon. The type defines an HTML
    // <area> element 'poly' which traces out a polygon as a series of X,Y points.
    // The final coordinate closes the poly by connecting to the first coordinate.
    var shape = {
        coords: [1, 1, 1, 20, 18, 20, 18, 1],
        type: 'poly'
    };

    crops = getCropMarkers()
    for (var i = 0; i < crops.length; i++) {
        var crop = crops[i];
        var marker = new google.maps.Marker({
            position: {lat: crop[1], lng: crop[2]},
            map: map,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 8.5,
                fillColor: crop[0].getColorCode(),
                fillOpacity: 0.7,
                strokeWeight: 0.4
            },
            shape: shape,
            title: crop[0],
            zIndex: crop[3]
        });
        markers.push(marker)
    }
    createLegend()
}
    function createLegend(){
       // writeLegend(crops)
    }
return initMap;
});


