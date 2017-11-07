<template>
   <div>
      <div class="selected-institution" v-bind:class="{ closed: institutInfo }">
         <!-- {{ institutions.id }} -->
         <div class="dismiss" v-on:click="toggleInstitutInfo">×</div>

         <article class="institutions--overview_child" v-for="entry in institutionsData" v-if="entry.number == inst">

            <a v-bind:href="entry.url">
               <figure>
                  <img v-bind:src="entry.photos">
               </figure>
               <div v-for="color in entry.shuttleLine">
                  <span class="suttle-line" v-bind:style="{color: color.color}"> <strong>{{ entry.number }}</strong> {{ color.title }}</span>
               </div>
               <h1>{{ entry.title }}</h1>
               <div class="icons">
                  <span v-if="entry.advanceSale == 1">&#127915;</span>
                  <span v-for="value in entry.accessibility">
                     <i v-if="value === 'wheelchair'">&#9855;</i>
                     <i v-if="value === 'partlyWheelchair'">&#9855;*</i>
                  </span>
               </div>
               <p>{{ entry.address }}</p>
               <p class="journey">{{ entry.journey }}</p><br> 
              <p class="link">Infos und Programm →</p>
            </a>
            <div class="back" v-on:click="inst = 0; zoomOut()">← Zurück zur Übersicht</div>

         </article>
         <article class="aside" v-if="inst == 0">
          <div>
            <p>Klicken Sie auf einen der Marker auf der Karte oder wählen Sie eine Institution aus der Liste aus.</p><br><br>
            <ul class="institutions-list">
               <!-- <li v-for="entry in institutionsData" v-on:click="inst = entry.number"> -->
                  <li v-for="entry in institutionsData" v-on:click="inst = entry.number; selctedInst()">

                   <div v-for="color in entry.shuttleLine">
                     <span class="suttle-line" v-bind:style="{background: color.color}"> {{ entry.number }}</span>
                  </div>
                  <strong>{{ entry.title }}</strong>
               </li>
            </ul>
          </div>
         </article>
      </div>
      <div class="google-map" id="multiMap"></div>

   
</div>
</template>

<script>
// import {load, Map, Marker} from 'vue-google-maps'
//  load('AIzaSyCG1n1fhLxcWGqlj1AUOBxinlfFn1idc4U')
export default {
 name: 'googlemap',
 props: ['name', 'institutions'],
 data: function () {
  return {
    mapName: "multiMap",
    markerCoordinates: [],
    map: null,
    bounds: null,
    markers: [],
    institutionsData: [],
    inst: "0",
    institutInfo: false,
    center: new google.maps.LatLng(47.55959860000001,7.588576099999955),
    // styles: [],
    // marker: []

    // center: {lat: 10.0, lng: 10.0},
    //     markers: [{
    //       position: {lat: 10.0, lng: 10.0}
    //     }, {
    //       position: {lat: 11.0, lng: 11.0}
    //     }]
 }
},

mounted: function () {
   this.activeLabel();

   this.inst;
   this.getEntries();

   // this.getEntriesInstitutions();
   // const VueGoogleMap = require('vue-google-maps')
   const element = document.getElementById(this.mapName)
   const options = {
      zoom: 13,
      center: this.center,
      disableDefaultUI: true,
      label: {
         color: 'white',
         fontWeight: 'bold',
         fontSize: '20px',
      },
      icon: {
         labelOrigin: new google.maps.Point(11, 50),
         url: 'default_marker.png',
         size: new google.maps.Size(22, 40),
         origin: new google.maps.Point(0, 0),
         anchor: new google.maps.Point(11, 40),
      },
      styles: [
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                // "color": "#e9e9e9"
                color: "#1A0042"
            },
            {
                "lightness": 0
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f5f5f5"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 29
            },
            {
                "weight": 0.2
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 18
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#c2ea90"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                // "color": "#dedede"
                color: "#c2ea90"

            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#ffffff"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            },
            {
                "color": "#333333"
            },
            {
                "lightness": 40
            }
        ]
    },
    {
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f2f2f2"
            },
            {
                "lightness": 19
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#fefefe"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#fefefe"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
    }
]
      // center: new google.maps.LatLng(51.501527,-0.1921837)
   }
   this.map = new google.maps.Map(element, options);
},

methods: {
   // getEntriesInstitutions () {
   //       let vm = this;
   //       axios.get('institution.json')
   //          .then(response => {
   //             // var presell = this.presellLocations;
   //             // var presell = JSON.parse(string);
   //             this.institutions = response.data.data
   //          })
   //    },
   toggleInstitutInfo () {
      this.institutInfo = !this.institutInfo;
   },
   getEntries () {
      axios.get('../locations.json')
      .then(response => {
          this.institutionsData = response.data.data
          var _this = this;
          //init marker positions
          response.data.data.forEach(function (item) {
            if (item.lat !== null && item.lng !== null) {
              _this.markerCoordinates.push({latitude:parseFloat(item.lat),longitude:parseFloat(item.lng), label: item.title, number:item.number, url:item.url, linecolor:item.shuttleLine});
            }
          });
         //init markers
        this.createMap();
          
      });
   },
   selctedInst () {
    // this.markerCoordinates = []
    // this.markerCoordinates.push(marker);
      var _this = this;
      var inst = _this.inst;
             var map = _this.map


      _this.markerCoordinates.forEach(function (coord) {
            var colors = coord.linecolor;
            var color = colors[0].color;
            var number = coord.number;

            // console.log(inst)
            // if (number == inst) {
            //   _this.center = new google.maps.LatLng(coord.latitude,coord.longitude)
            //     var scale = 40;
            // } else {
            //   var scale = 15;
            // }
        
            
            // if (1 == 1) {
            if (number == inst) {
              const position = new google.maps.LatLng(coord.latitude, coord.longitude);
              console.log(position);
              _this.center = new google.maps.LatLng(50,50)
                map.setCenter(new google.maps.LatLng(coord.latitude, coord.longitude));
                map.setZoom(18)

            }

             // map: _this.map,
             //   map.setZoom(18);
             //    map.setCenter(marker.getPosition());
            // const marker = new google.maps.Marker({ 
            //    animation: google.maps.Animation.DROP,
            //    position,
            //    label: {
            //       text:coord.number, 
            //       fontFamily: 'main-eb', 
            //       fontSize: '1.2em',
            //       color:"rgba(240,240,240,0.8",
            //    },
            //    icon: {
            //       path: google.maps.SymbolPath.CIRCLE,
            //       scale: scale,
            //       fillColor: color,
            //       fillOpacity: 1,
            //       strokeColor: color,
            //       strokeWeight: 1
            //    },

            //    number: coord.number,
            //    url: coord.url,

              
            // });
          });
    },
    zoomOut () {
       var _this = this;
      var inst = _this.inst;
             var map = _this.map
                map.setZoom(14)
                map.setCenter(new google.maps.LatLng(47.55959860000001,7.588576099999955));
    },
   createMap () {
      var _this = this;
      var inst = _this.inst;



            console.log(inst)
      // if (inst == 2) {
      //   alert('2');
      // }
      // if (inst == 0) {


           _this.markerCoordinates.forEach(function (coord) {
            var colors = coord.linecolor;
            var color = colors[0].color;
            var number = coord.number;
            // var scale = 10;
            console.log(inst)
            if (number == inst) {
                var scale = 40;
            // const position = new google.maps.LatLng(coord.latitude, coord.longitude);

            } else {
              var scale = 15;
              // const position = new google.maps.LatLng(false, false);

            }
          

            const position = new google.maps.LatLng(coord.latitude, coord.longitude);
            // if (1 == 1) {
            // if (number == inst) {

            const marker = new google.maps.Marker({ 
               animation: google.maps.Animation.DROP,
               position,
               label: {
                  text:coord.number, 
                  fontFamily: 'main-eb', 
                  fontSize: '1.2em',
                  color:"rgba(240,240,240,0.8",
               },
           
               icon: {
                  path: google.maps.SymbolPath.CIRCLE,
                  scale: scale,
                  fillColor: color,
                  fillOpacity: 1,
                  strokeColor: color,
                  strokeWeight: 1
               },
               // var number = coord.number;
               // if (number = 2) {
               //    label: {
               //       color: 'blue',
               //    }
               // },
               number: coord.number,
               url: coord.url,
               map: _this.map,
            });
            // }
            // }
            // this.marker = marker;
            marker.addListener('click', toggleBounce);

           
            google.maps.event.addListener(marker, "click", function(evt) {
                // var normalIcon = {
                //    url: "http://maps.google.com/mapfiles/ms/micons/blue.png"
                //  };
                var number = this.number;
                var instNumber = _this.inst;
                var map = this.map;
                _this.inst = number;
                map.setZoom(18);
                map.setCenter(marker.getPosition());
                // console.log(number);
               // console.log(instNumber);
            });
             google.maps.event.addListener(marker, "mouseover", function(evt) {
               // var label = this.getLabel();
               // label.color="white";
               // this.setLabel(label);
              var icon = this.getIcon();
               icon.scale=18;
               this.setIcon(icon);
            });
            google.maps.event.addListener(marker, "mouseout", function(evt) {
               // var label = this.getLabel();
               // label.color="white";
               // label.fontSize="1.2em";               
               // this.setLabel(label);
               var icon = this.getIcon();
               icon.scale=15;
               this.setIcon(icon);
            });
            google.maps.event.addListener(marker, function(evt) {
               var number = this.number;
               // console.log(number);

            });
            function toggleBounce() {
               if (marker.getAnimation() !== null) {
                  marker.setAnimation(null);
               } else {
                      // marker.setAnimation(google.maps.Animation.BOUNCE);
               }
            };


          });
      // }
   },
   activeLabel: function () {
      var inst = this.inst;
      // console.log(inst);
   },
   changeInst: function () {
      var inst = this.inst;
      // console.log(inst);
   },

   }
   };
   </script>

         <style scoped>
         .google-map {
          width: 100%;
          /*height: 250px;*/
          /*height: 800px;*/
          margin: 0 auto 50px;
          background: gray;
       }
       </style>