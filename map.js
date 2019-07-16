//This script loads the view of the map onto the webpage

//Global variables for map loading
var infoWindow, map, latitude, longitude
var cumulativeCrops;
var calendarCrops;
var markers =[]
var drawingManager;

//This function loads the two JSON files that contain the information about each crop and have it stored
function loadJSON() {
    require(['http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js', "CropCalendarGraph"], function ($) {

        $.getJSON("dataArea.json", function (json) {
            cumulativeCrops = json;
        });

        $.getJSON("data.json", function (json) {
            calendarCrops = json;
        });

    })
}

//In reality, we will want a function that can load markers onto the map within a certain region and will load more markers for larger
//areas. For a full version this could lead to latency with the scale of the overall project. So I need to load only the markers for the region that
//the person is looking at. Possibly lock zooming becuase of latency issues? It would be quite fast if there was a sorted list by latitude, longitude pairs of
//data points to go through.
//loadJSON()

//This function
function zeroJSON() {
    for(var  i =0; i< 12; i++){
        cumulativeCrops[0].values[i].value= 0;
    }
    for(var  i=0; i<calendarCrops.length;i++){
        for(var j =0; j< 12; j++){
            calendarCrops[i].values[j].value =0;
        }
    }
}
function getCumulativeCrops(){
    return cumulativeCrops;
}
function getCalendarCrops(){
    return calendarCrops
}
require.config({
    paths: {
        'async': './async'
    }
});

    
define(['async!http://maps.google.com/maps/api/js?key=AIzaSyDO5-KYQrPMjhYRRnrPu1J5K0J8ZHuOPnU&libraries=drawing&callback=initMap&sensor=false', 'Crops.js'], function() {
    // Google Maps API and all its dependencies will be loaded here.
var initMap = {
    functionCall: function()
    {
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
            styles: myStyles,
            center: {lat: 33.638260, lng: -117.839043}
        });

        drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: google.maps.drawing.OverlayType.MARKER,
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
                //Modify JSON file to get data
                zeroJSON()
                for (var i = 0; i < markers.length; i++) {
                    if (rectangle.getBounds().contains(markers[i].position)) {
                        for (var j = 0; j < 12; j++) {
                            cumulativeCrops[0].values[j].value += crops[i][0].getHarvest(j);
                        }
                        for (var k = 0; k < calendarCrops.length; k++) {
                            if (crops[i][0].getSpecies() === calendarCrops[k].key) {
                                console.log("True")
                                for (var j = 0; j < 12; j++) {
                                    calendarCrops[k].values[j].value += crops[i][0].getHarvest(j);
                                }
                            }
                        }
                    }
                }
                updateChartTot(true)
                updateChartCrop(true)
                //JSON.stringify(dataAreaJSON)
            }
        });
        google.maps.event.addListener(drawingManager, "drawingmode_changed", function () {
            if ((drawingManager.getDrawingMode() == google.maps.drawing.OverlayType.RECTANGLE) &&
                (rectangle != null))
                rectangle.setMap(null);
        });

    }
}
var selection =false
function updateSelection(){
    //var documentImage= document.getElementById("selector")
    selection  =!selection;
    if(selection){
        //  documentImage.body.style.background = "#ffffff";
        drawingManager.setDrawingMode(google.maps.drawing.OverlayType.RECTANGLE);
    } else{
        // documentImage.body.style.background = "#bbbdbf";
        drawingManager.setDrawingMode(null);
    }


}
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}
function addCropMarker(crop){

}
var crops = [];
var data1 =[24, 43, 56, 34, 7, 0,0,0,0,0,0,0]
var data2 =[0, 0, 0, 9, 19, 45,12,5,0,0,0,0]
var data3 =[0, 0, 0, 0, 0, 0,0,17,34,64,27,5]
var data4 =[41, 32, 14, 0, 0, 0,0,0,0,0,23,34]
function createData(lat, long, numberOfPoints){
    for(var i = 0; i< numberOfPoints; i++){
        eastWestOffset = Math.floor((Math.random() * 200) - 100)/40000;
        northSouthOffset = Math.floor((Math.random() * 200) - 100)/40000;
        cropType = Math.floor((Math.random()*4)+1)
        var crop;
        switch (cropType){
            case 1:
                crop = new Crop("Orange", data1, "#f58742")
                break;
            case 2:
                crop = new Crop("Apple", data2, "#ff0000")
                break;
            case 3:
                crop = new Crop("Avocado", data3, "#1a9107")
                break;
            case 4:
                crop = new Crop("Lemon", data4, "#f5e50a")
                break;
            default:
                break;


        }
        crops.push([crop,lat+eastWestOffset, long+northSouthOffset, i])
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


