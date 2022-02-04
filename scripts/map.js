class Map {
	constructor(setViewlat, setViewLng, map, dataStation) {
        this.stations = dataStation;
		this.setViewlat = setViewlat;
		this.setViewLng = setViewLng;
        this.map = map;
        this.stationNom = this.map.querySelector(".station-name");
        this.stationAdresse = this.map.querySelector(".station-adresse");
        this.stationDispo = this.map.querySelector(".station-dispo");
        this.stationStatus = this.map.querySelector(".station-closed");
        this.formEnabler = this.map.querySelector(".form");
		this.mymap = L.map("mapid").setView([this.setViewlat, this.setViewLng], 14);
		L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    		maxZoom: 18,
    		id: 'mapbox/streets-v11',
    		tileSize: 512,
    		zoomOffset: -1,
    		accessToken: 'pk.eyJ1IjoicnN0YWNpbm8iLCJhIjoiY2s3MmZ4ZG13MDFxczNkdDA3ZzJrbjNjNiJ9.ytSwQ6ngogH5Ef6E6Pi94Q'
   		}).addTo(this.mymap);
        //Création des icons MAP
        this.leafIcon = L.Icon.extend({
            options: {
                iconSize: [25, 25],
                iconAnchor: [0, 16],
                popupAnchor: [0, 0],
            }
        });
        this.greenIcon = new this.leafIcon({ iconUrl: "assets/images/green.png" });
        this.redIcon = new this.leafIcon({ iconUrl: "assets/images/red.png" });
        this.orangeIcon = new this.leafIcon({ iconUrl: "assets/images/orange.png" });

        this.initMarkers(this.stations);    
    }
    initMarkers(stations) {
        stations.map((station) => {
            this.setMarkers(station)
        }) 
    }
    setMarkers(station) {
        let colorMarker = null;
        let stationStatus = null;
        let stationBikes = null;
        if(station.status === "closed") {
            colorMarker = this.redIcon;
            stationStatus = ("station-closed");
            stationBikes = ("Station fermée");
        }
        else if(station.available_bikes == 0) {
            colorMarker = this.orangeIcon;
            stationStatus = ("station-closed");
            stationBikes = ("Aucun vélos disponible à cette station");
        }
        else {
            colorMarker = this.greenIcon;
            stationStatus = ("station-open");
            stationBikes = (station.available_bikes);
        }
        this.marker = L.marker([station.position.lat, station.position.lng], {icon:colorMarker}).addTo(this.mymap);
        this.marker.addEventListener("click", _ => {
            if(sessionStorage.getItem("timer") == null) {
                this.formEnabler.classList.add("enable");
                this.formEnabler.classList.remove("disable");
            }
                this.stationNom.textContent = (station.name);
                this.stationStatus.className = stationStatus;
                if (station.address == ""){
                    this.stationAdresse.textContent = ("");
                }
                else {
                    this.stationAdresse.textContent = ("Adresse : " + station.address);
                }
                this.stationDispo.textContent = stationBikes;
                });
    }
}