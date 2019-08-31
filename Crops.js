cropTypes = ["Orange", "Lemon", "Avocado", "Apple", "Mango"]
class Crop{
    constructor(species, harvestData, colorCode){
        this.species = species;
        this.harvestData= harvestData;
        this.colorCode = colorCode;
    }
    getHarvest(month){
        return this.harvestData[month];
    }
    getColorCode(){
        return this.colorCode;
    }
    getSpecies(){
        return this.species;
    }
}
function getCropsList(){
    return cropTypes
}

function getCrop(species){
    if(species === "Apple"){
        return new Apple()
    } else if(species === "Avocado"){
        return new Avocado()
    } else if(species=== "Lemon"){
        return new Lemon()
    } else if(species=== "Orange"){
        return new Orange()
    } else if(species==="Mango"){
        return new Mango()
    }
}
class Orange extends Crop{
    constructor(){
   super("Orange", getData("Orange"), "#f58742")
    }
}

class Lemon extends Crop{
    constructor(){
        super("Lemon", getData("Lemon"), "#f5e50a")
    }
}
class Avocado extends Crop{
    constructor(){
        super("Avocado", getData("Avocado"), "#1a9107")
    }
}
class Apple extends Crop{

    constructor(){
        super("Apple", getData("Apple"), "#ff0000")
    }
}
class Mango extends Crop{
    constructor(){
        super("Mango", getData("Mango"), "#000000")
    }
}
function getData(species){
    if(species === "Apple"){
        return [0, 0, 0, 9, 25, 45,32,5,0,0,0,0]
    } else if(species === "Avocado"){
        return [0, 0, 0, 0, 0, 0,0,17,34,64,27,5]
    } else if(species=== "Lemon"){
        return [41, 32, 14, 0, 0, 0,0,0,0,0,23,34]
    } else if(species=== "Orange"){
        return [24, 43, 56, 34, 7, 0,0,0,0,0,0,0]
    } else if(species==="Mango"){
        return [0, 0, 0, 0, 0, 8,23,56,34,0,0,0]
    }
}