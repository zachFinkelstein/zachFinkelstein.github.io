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