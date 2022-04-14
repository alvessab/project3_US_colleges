$(document).ready(function() {
    doWork();

    // Event Listener
    $("#filter").on("click", function() {
       
        doWork();
    });
});

function doWork() {
    var filepath = "data/IPEDs.csv";  
    
         // clear out the old map 
         $("#map-container").empty();
         $("#map-container").append('<div id="map" style="height:700px"></div>');


    requestD3(filepath);
};

function requestD3(filepath){

    d3.csv(filepath).then(function(data) {
        console.log(data);
        makeMap(data);
    });
};



function makeMap(data) {

    // Create the base layers.
    var dark_layer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/dark-v10',
        accessToken: API_KEY
    });

    var light_layer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/light-v10',
        accessToken: API_KEY
    });

    var street_layer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        accessToken: API_KEY
    });

    var outdoors_layer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/outdoors-v11',
        accessToken: API_KEY
    });

    // Create a baseMaps object.
    var baseMaps = {
        "Dark": dark_layer,
        "Light":light_layer,
        "Street":street_layer,
        "Outdoors":outdoors_layer,
    };
    
    
    // Create an overlays object.
      var markers = [];

    //filter data

        //variables
        var openpub = "Institution is open to the public"

        var locale = $("#locale").val();

        var hbcu = $("#hbcu").val();

        var hospital = $("#hospital").val();

        var medical = $("#medical").val();

        var tribal = $("#tribal").val();

        //filter all values
        let row = data.filter(function (selections) {
        // the current value is an object, so you can check on its properties
        return (selections["Open for Admission to the General Public"] == openpub)
        
            &&(selections["Locale"] === locale) 

            && (selections["HBCU"] === hbcu) 

            && (selections["Hospital Available"] === hospital) 

            && (selections["Medical Degree Granting"] === medical) 

            && (selections["Tribal"] === tribal) 
            
            ;
        });
  
    
        //alert if no results; console log otherwise
        if (row.length ==0) {
            alert("No Schools Fit Selections. Please Try Again.")
        } else {
            console.log(row)
        }

      // Loop through locations, and create the markers.
      for (let i = 0; i < row.length; i++) {
        let college = row[i];

        let long = college["Longitude"]
  
        let lat = college["Latitude"]
        
        let coord = [lat, long] 
    
        let marker = L.marker(coord).bindPopup(`<h3>${college["Institution"]}</h3><a href=${college["Web Address"]} target="_blank">${college["Web Address"]}</a><p>${college["Size and Setting Classification"]}</p>`);

        markers.push(marker);

        };
        
  
    // LAYER GROUPS/LEGEND
    var markerLayer = L.layerGroup(markers);

    // Overlays that can be toggled on or off
    var overlayMaps = {
        colleges: markerLayer
    };

    // Create a new map.
      // Edit the code to add the earthquake data to the layers.
      var myMap = L.map("map", {
        center: [
            39.099724, -94.578331
          ],
          zoom: 5,
          layers: [dark_layer, markerLayer]
      });

    // Create a layer control that contains our baseMaps.
    // Be sure to add an overlay Layer that contains the earthquake GeoJSON.
    L.control.layers(baseMaps, overlayMaps).addTo(myMap);


};