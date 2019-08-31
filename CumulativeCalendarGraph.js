//This draws the radar chart for each individual crop
function updateChartCropTot() {
//Needs the radarChart.js file to be able to draw the charts and the links for the d3 library and legend
    require(["radarChartNoLegend.js", "https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js", "data.js"], function () {

//////////////////////////////////////////////////////////////
//////////////////////// Set-Up //////////////////////////////
//////////////////////////////////////////////////////////////

        //////////////////////////////////////////////////////////////
        //////////////////////// Set-Up //////////////////////////////
        //////////////////////////////////////////////////////////////

        var margin = {top: 100, right: 100, bottom: 100, left: 100},
            legendPosition = {x: 25, y: 25},
            width = Math.min(700, window.innerWidth - 10) - margin.left - margin.right,
            height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 50);

        //////////////////////////////////////////////////////////////
        //////////////////// Draw the Chart //////////////////////////
        //////////////////////////////////////////////////////////////

        var colorTot = d3.scale.ordinal()
            .range(["#ba00ba","#CC333F","#00A0B0", "#328DCD", "#CD3284"]);

        var radarChartOptionsCal = {
            w: width,
            h: height,
            margin: margin,
            wrapWidth: 60,
            levels: 5,
            roundStrokes: true,
            color: colorTot,
            axisName: "month",
            areaName: "device",
            value: "value"
        };
        //Load the data and Call function to draw the Radar chart
        data = getAreaCumulative();
        RadarChartNoLegend(".radarAreaChart", data, radarChartOptionsCal);

    });
}