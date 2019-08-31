require(['map.js','CropCalendarGraph.js', 'CumulativeCalendarGraph.js', 'data.js', 'cropRecommender.js', 'legend.js'], function(mapInit){
    initData()
    mapInit.functionCall();
    updateChartCrop()
    updateChartCropTot()
    writeLegend()
    //pickCrop()
})

function updateRectangle(){
    require(['map.js'], function(mapInit){
        mapInit.updateSelection()
    })
}

function recommend(){
    /*require(['cropRecommender.js' , 'map.js'], function (mapInit) {
        crop = pickCrop()

    })*/
    require(['map.js', 'cropRecommender.js', 'Crops.js'], function(mapInit, cropRecommender){
        crop = cropRecommender.pickCrop()
        type = getCrop(crop)
        mapInit.allowRecommendation(type)
    })
}
