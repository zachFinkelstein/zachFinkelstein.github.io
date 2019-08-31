var cropMarkers =[]
var cumulativeCrops = []
var calendarCrop = []
var colors =[]
var maxLat, maxLong, minLat, minLong


function getCropMarkers() {
    return cropMarkers
}
function getAreaByCrop(){
    return calendarCrop
}
function getAreaCumulative(){
    return cumulativeCrops;
}
function initData(){
    require(["Crops.js"], function () {
        var crops = getCropsList()
        for(var i =0; i < crops.length; i++){
            var cropStuff = getData(crops[i])
            var cropInfo = {
                "key": crops[i],
                "values":[
                    {
                        "month":"January",
                        "device":crops[i],
                        "value":cropStuff[0]

                    },
                    {
                        "month":"February",
                        "device":crops[i],
                        "value":cropStuff[1]
                    },
                    {
                        "month":"March",
                        "device":crops[i],
                        "value":cropStuff[2]
                    },
                    {
                        "month":"April",
                        "device":crops[i],
                        "value":cropStuff[3]
                    },
                    {
                        "month":"May",
                        "device":crops[i],
                        "value":cropStuff[4]
                    },
                    {
                        "month":"June",
                        "device":crops[i],
                        "value":cropStuff[5]                   },
                    {
                        "month":"July",
                        "device":crops[i],
                        "value":cropStuff[6]
                    },
                    {
                        "month":"August",
                        "device":crops[i],
                        "value":cropStuff[7]
                    },
                    {
                        "month":"September",
                        "device":crops[i],
                        "value":cropStuff[8]
                    },
                    {
                        "month":"October",
                        "device":crops[i],
                        "value":cropStuff[9]
                    },
                    {
                        "month":"November",
                        "device":crops[i],
                        "value":cropStuff[10]
                    },
                    {
                        "month":"December",
                        "device":crops[i],
                        "value":cropStuff[11]
                    }
                ]
            }
            calendarCrop.push(cropInfo)
        }
        cumulativeCrops = [
            {
                "key":"January",
                "values":[
                    {
                        "month":"January",
                        "device":"January",
                        "value":123

                    },
                    {
                        "month":"February",
                        "device":"January",
                        "value":78
                    },
                    {
                        "month":"March",
                        "device":"January",
                        "value":156
                    },
                    {
                        "month":"April",
                        "device":"January",
                        "value":56
                    },
                    {
                        "month":"May",
                        "device":"January",
                        "value":98
                    },
                    {
                        "month":"June",
                        "device":"January",
                        "value":154
                    },
                    {
                        "month":"July",
                        "device":"January",
                        "value":45
                    },
                    {
                        "month":"August",
                        "device":"January",
                        "value":107
                    },
                    {
                        "month":"September",
                        "device":"January",
                        "value":114
                    },
                    {
                        "month":"October",
                        "device": "January",
                        "value":168
                    },
                    {
                        "month":"November",
                        "device":"January",
                        "value":145
                    },
                    {
                        "month":"December",
                        "device":"January",
                        "value":198
                    }
                ]
            }
            ]
    })
}
function resetCropData() {
    for(var  i =0; i< 12; i++){
        cumulativeCrops[0].values[i].value= 0;
    }
    for(var  i=0; i<calendarCrop.length;i++){
        for(var j =0; j< 12; j++){
            calendarCrop[i].values[j].value =0;
        }
    }
}
function getCropsForCurrentLocation(NE_Lat, NE_Long, SW_Lat,SW_Long){
    require(["CumulativeCalendarGraph.js", "CropCalendarGraph"], function () {
        maxLat = NE_Lat > SW_Lat ? NE_Lat : SW_Lat
        minLat = NE_Lat > SW_Lat ? SW_Lat : NE_Lat
        maxLong = NE_Long > SW_Long ? NE_Long : SW_Long
        minLong = NE_Long > SW_Long ? SW_Long : NE_Long
        maxLatD = Math.abs(NE_Lat) > Math.abs(SW_Lat) ? NE_Lat : SW_Lat
        minLatD = Math.abs(NE_Lat) > Math.abs(SW_Lat) ? SW_Lat : NE_Lat
        maxLongD = Math.abs(NE_Long) > Math.abs(SW_Long) ? NE_Long : SW_Long
        minLongD = Math.abs(NE_Long) > Math.abs(SW_Long) ? SW_Long : NE_Long
        maxDist = Math.sqrt(maxLatD * maxLatD + maxLongD * maxLongD)
        minDist = Math.sqrt(minLatD * minLatD + minLongD * minLongD)
        minIndex = findIndexToInsert(minDist, true)
        maxIndex = findIndexToInsert(maxDist, false)
        resetCropData()
        console.log(minIndex)
        console.log(maxIndex)
        for (var i = minIndex; i <= maxIndex; i++) {
            crop =cropMarkers[i][0]
            if (cropMarkers[i][1] > minLat && cropMarkers[i][1] < maxLat && cropMarkers[i][2] > minLong && cropMarkers[i][2] < maxLong) {
                for (var j = 0; j < 12; j++) {
                    cumulativeCrops[0].values[j].value += crop.getHarvest(j);
                }
                for (var k = 0; k < calendarCrop.length; k++) {
                    if (crop.getSpecies() === calendarCrop[k].key) {
                        for (var j = 0; j < 12; j++) {
                            calendarCrop[k].values[j].value += crop.getHarvest(j);
                        }
                    }
                }
            }
        }
        updateChartCrop()
        updateChartCropTot()
    })
}
function updateColors(color){
}
function resetColors(){
    colors = []
}
function getColors(){

    return ["#f58742", "#f5e50a","#1a9107","#ff0000","#000000",]
}
function getCurrentCrops() {
    currentCrops = []
    crop = new Orange()
    currentCrops.push(crop)
    crop = new Lemon()
    currentCrops.push(crop)
    crop = new Avocado()
    currentCrops.push(crop)
    crop = new Apple()
    currentCrops.push(crop)
    crop = new Mango()
    currentCrops.push(crop)

    return currentCrops
}
var k =0
function addMarker(lat, long,crop){
    dist = Math.sqrt((lat*lat + long*long))
    binaryInsert([crop,lat, long,dist, cropMarkers.length] ,cropMarkers)
    updateColors(crop)
}

function saveMarkers(){

}
function binaryInsert(value, array, startVal, endVal){
    var length = array.length;
    var start = typeof(startVal) != 'undefined' ? startVal : 0;
    var end = typeof(endVal) != 'undefined' ? endVal : length - 1;//!! endVal could be 0 don't use || syntax
    var m = start + Math.floor((end - start)/2);

    if(length == 0){
        array.push(value);
        return;
    }

    if(value[3] > array[end][3]){
        array.splice(end + 1, 0, value);
        return end+1;
    }

    if(value[3] < array[start][3]){//!!
        array.splice(start, 0, value);
        return start;
    }

    if(start >= end){
        return;
    }

    if(value[3] < array[m][3]){
        binaryInsert(value, array, start, m - 1);
        return;
    }

    if(value[3] > array[m][3]){
        binaryInsert(value, array, m + 1, end);
        return;
    }

    //we don't insert duplicates
}
function findIndexToInsert(dist, minOrMax){
    let start=0, end=cropMarkers.length-1;

    // Iterate while start not meets end
    while (start<=end){

        // Find the mid index
        let mid=Math.floor((start + end)/2);

        // If element is present at mid, return True
        if (cropMarkers[mid][3]===dist) return mid;

        // Else look in left or right half accordingly
        else if (cropMarkers[mid][3] < dist)
            start = mid + 1;
        else
            end = mid - 1;
    }
    if(minOrMax){
        return start
    } else{
        return end
    }
}
function createData(lat, long, numberOfPoints){
    for(var i = 0; i< numberOfPoints; i++){
        eastWestOffset = Math.floor((Math.random() * 200) - 100)/40000;
        northSouthOffset = Math.floor((Math.random() * 200) - 100)/40000;
        cropType = Math.floor((Math.random()*5)+1)
        var crop;
        switch (cropType){
            case 1:
                crop = new Orange()
                break;
            case 2:
                crop = new Apple()
                break;
            case 3:
                crop = new Avocado()
                break;
            case 4:
                crop = new Lemon()
                break;
            case 5:
                crop = new Mango()
            default:
                break;


        }
        addMarker(lat + eastWestOffset, long + northSouthOffset, crop)
    }
}