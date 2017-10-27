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
            <p class="journey">{{ entry.journey }}</p>

         </a>
      </article>
      <article class="institutions--overview_child" v-if="inst == 0">
         <p>Klicken Sie auf einen der Marker auf der Karte.</p>
      </article>
      </div>
      <div class="google-map" id="multiMap"></div>
<!--    <article v-for="entry in institutions" class="institutions--overview_child">
      {{ entry.title }}
   </article> -->
   
 </div>
</template>

<script>
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
 }
},
// computed: {
//    this.inst;

// },
mounted: function () {
   this.inst;

   this.getEntries();
   // this.getEntriesInstitutions();


   const element = document.getElementById(this.mapName)
   const options = {
      zoom: 14,
      center: new google.maps.LatLng(47.55959860000001,7.588576099999955),
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
         _this.markerCoordinates.forEach(function (coord) {
            var colors = coord.linecolor;
            var color = colors[0].color;
            const position = new google.maps.LatLng(coord.latitude, coord.longitude);
            const marker = new google.maps.Marker({ 
               animation: google.maps.Animation.DROP,
               position,
               // label: {text:coord.number + " " + coord.label, fontFamily: 'main-eb'},
               label: {
                  text:coord.number, 
                  fontFamily: 'main-eb', 
                  fontSize: '1.2em',
                  color:"rgba(240,240,240,0.8",
               },
               icon: {
                  path: google.maps.SymbolPath.CIRCLE,
                  scale: 15,
                  fillColor: color,
                  fillOpacity: 1,
                  strokeColor: color,
                  strokeWeight: 1
               },
               number: coord.number,
               url: coord.url,
               map: _this.map
            });
             marker.addListener('click', toggleBounce);
            google.maps.event.addListener(marker, "mouseover", function(evt) {
               var label = this.getLabel();
               label.color="white";
               // label.fontSize="1.5em";
               this.setLabel(label);
               var icon = this.getIcon();
               icon.scale=17;
               this.setIcon(icon);
               // var number = this.number;
               // console.log(number);
            });
            google.maps.event.addListener(marker, "click", function(evt) {

               
               // var label = this.getLabel();
               // label.color="rgba(240,240,240,0.5";
               // this.setLabel(label);
               // var icon = this.getIcon();
               // icon.scale=27;
               // this.setIcon(icon);
               var number = this.number;
               _this.inst = number;
               if ( _this.institutInfo = false) {
                  _this.institutInfo = !_this.institutInfo;
               }
               
            });
            google.maps.event.addListener(marker, "mouseout", function(evt) {
               var label = this.getLabel();
               label.color="white";
               label.fontSize="1.2em";               
               this.setLabel(label);
               var icon = this.getIcon();
               icon.scale=15;
               this.setIcon(icon);
            });
            _this.markers.push(marker);
          function toggleBounce() {
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          // marker.setAnimation(google.maps.Animation.BOUNCE);
        }
      }

         });
      });
   }
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