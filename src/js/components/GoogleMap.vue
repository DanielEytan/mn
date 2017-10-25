<template>
 <div class="google-map" id="multiMap"></div>
</template>

<script>
export default {
 name: 'googlemap',
 props: ['name'],
 data: function () {
  return {
    mapName: "multiMap",
    markerCoordinates: [],
    map: null,
    bounds: null,
    markers: []
 }
},
mounted: function () {
   this.getEntries();

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
   getEntries () {
      axios.get('../locations.json')
      .then(response => {
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
               position,
               // label: {text:coord.number + " " + coord.label, fontFamily: 'main-eb'},
               label: {
                  text:coord.number, 
                  fontFamily: 'main-eb', 
                  fontSize: '1.2em',
                  color: 'white'
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
            google.maps.event.addListener(marker, "mouseover", function(evt) {
               var label = this.getLabel();
               label.color="rgba(240,240,240,0.5";
               label.fontSize="1.5em";
               this.setLabel(label);
               var icon = this.getIcon();
               icon.scale=17;
               this.setIcon(icon);
            });
            google.maps.event.addListener(marker, "click", function(evt) {
               var label = this.getLabel();
               label.color="rgba(240,240,240,0.5";
               this.setLabel(label);
               var icon = this.getIcon();
               icon.scale=27;
               this.setIcon(icon);
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
 height: 600px;
 margin: 0 auto 50px;
 background: gray;
}
</style>