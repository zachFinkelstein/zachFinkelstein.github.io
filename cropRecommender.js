


function farthestDistance(latLeft, latRight, longBottom, longTop){
    data  = getCropMarkers();
    for(var i = 0; i < data.length; i++){

    }
}

    define(["data.js", "Crops.js"], function () {
       return{
           pickCrop: function() {
               data = getAreaByCrop()
               crops = getCropsList()
               modifiedData = []
               for (var i = 0; i < crops.length; i++) {
                   for (var j = 0; j < 12; j++)
                       if (typeof modifiedData[j] === 'undefined') {
                           modifiedData[j] = data[i].values[j].value
                       } else {
                           modifiedData[j] += data[i].values[j].value
                       }
               }
               actualSD = standardDeviation(modifiedData)
               actualData = modifiedData
               var lowestSTD = []
               var cropName
               for (var i = 0; i < crops.length; i++) {
                   modifiedData = actualData
                   cropData = getData(crops[i])
                   for (var j = 0; j < 12; j++) {
                       modifiedData[j] += cropData[j]
                   }
                   lowestSTD[i] = standardDeviation(modifiedData)
               }
               var lowest = 0
               for (var i = 1; i < lowestSTD.length; i++) {
                   if (lowestSTD[lowest] > lowestSTD[i]) {
                       lowest = i
                   }
               }
               console.log(lowestSTD)
               console.log(crops[lowest])
               alpha = crops[lowest]
               return alpha
           }
    }
    })


function standardDeviation(values){
   var sum =0
   for(var  i=0; i < values.length; i++) {
       sum += values[i]
   }
   mean  = sum/values.length
    variance = 0
    for(var  i=0; i < values.length; i++){
        variance+=Math.pow(values[i]-mean, 2)
    }
    return Math.sqrt(variance)
}

function average(data){
    var sum = data.reduce(function(sum, value){
        return sum + value;
    }, 0);

    var avg = sum / data.length;
    return avg;
}