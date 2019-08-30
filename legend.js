var container = document.getElementById('container');
var colors = []
var names = []

function writeLegend(){
    require(['data.js'], function () {


        cropList = getCurrentCrops()
        console.log(cropList)
        for (var i = 0; i < cropList.length; i++) {
            var colorCode = cropList[i].getColorCode()
            if (!colors.includes(colorCode)) {
                colors.push(colorCode)
                names.push(cropList[i].getSpecies())
            }
        }
        //console.log(colors)
        for (var i = 0; i < colors.length; i++) {
            var boxContainer = document.createElement("div");
            var box = document.createElement("div");
            var label = document.createElement("span");

            label.innerHTML = names[i];
            box.className = "box";

            box.style.backgroundColor = colors[i];

            boxContainer.appendChild(box);
            boxContainer.appendChild(label);

            container.appendChild(boxContainer);
        }
    })
}