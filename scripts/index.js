// Création du Slider
let slider = document.querySelector("#slider");
let createSlider = new Slider(slider, 5000);

// Création des données Stations
let stations = new Stations();
let currentStations = stations.initStations("https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=bfcfed5b867658d5eecf5981658df2bc3fb3a3ab").then((dataStation) => {
    //Création de la Map
    let map = document.querySelector("#map");
    let createMap = new Map(45.754, 4.838, map ,dataStation); //Lat, lng, ID HTML de la map, donnée JCD
});

//Création de la logique du formulaire
let form = document.querySelector(".aside");
let createForm = new Formulaire(form);
createForm.canvasInit();
createForm.setStorage();


// Test countdown

