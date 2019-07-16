//This draws the radar chart for each individual crop
function updateChartCrop(restricted) {
//Needs the radarChart.js file to be able to draw the charts and the links for the d3 library and legend
    require(["radarChart.js", "https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/d3-legend/1.3.0/d3-legend.js"], function () {

//////////////////////////////////////////////////////////////
//////////////////////// Set-Up //////////////////////////////
//////////////////////////////////////////////////////////////

        //Sets the margins and size for the chart
        var margin = {top: 100, right: 100, bottom: 100, left: 100},
            legendPosition = {x: 25, y: 25},
            width = Math.min(700, window.innerWidth - 10) - margin.left - margin.right,
            height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 50);

//////////////////////////////////////////////////////////////
//////////////////// Draw the Chart //////////////////////////
//////////////////////////////////////////////////////////////

        //Has the colors that will be used, but need to change
        var color = d3.scale.ordinal()
            .range(["#EDC951", "#CC333F", "#00A0B0", "#328DCD", "#CD3284"]);

        //Sets the options for the chart to draw and read from the json file
        //TODO change axis titles
        var radarChartOptions = {
            w: width,
            h: height,
            margin: margin,
            legendPosition: legendPosition,
            wrapWidth: 60,
            levels: 5,
            roundStrokes: true,
            color: color,
            axisName: "reason",
            areaName: "device",
            value: "value"
        };

        //TODO when it is updated to 1 json file get rid of the restricted parameter
        //Draws the chart by inputting the data
        if (restricted) {
            data = getCalendarCrops()
            for (var i = 0; i < calendarCrops.length; i++) {
                if (calendarCrops[i].key == "BLUE") {
                }
                //TODO: Add an automatic color checker to update it correctly if only certain ones are selected
            }
            RadarChart(".radarChart", data, radarChartOptions);
        } else {
            d3.json("data.json", function (error, data) {
                RadarChart(".radarChart", data, radarChartOptions);
            });
        }
    });
}