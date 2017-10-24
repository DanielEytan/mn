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
         // var color = this.shuttleLine.color;
         //init marker positions
         response.data.data.forEach(function (item) {
            // for (color in item.shuttleLine) {
            //    var color = color;
            //    // console.log(color);
            // }
            if (item.lat !== null && item.lng !== null) {
               _this.markerCoordinates.push({latitude:parseFloat(item.lat),longitude:parseFloat(item.lng), label: item.title, number:item.number, url:item.url, linecolor:item.shuttleLine});
            }
         });
         //init markers
         _this.markerCoordinates.forEach(function (coord) {
            var color = JSON.stringify(coord.linecolor);
            // var color = coord.linecolor[2];

            console.log(color);
            const position = new google.maps.LatLng(coord.latitude, coord.longitude);
            const marker = new google.maps.Marker({ 
               position,
               // label: {text:coord.number + " " + coord.label, fontFamily: 'main-eb'},
               label: {text:coord.number, fontFamily: 'main-eb'},
               number: coord.number,
               url: coord.url,
               // color: coord.color,
               // color: coord.red,
               map: _this.map
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
 width: 50%;
 /*height: 250px;*/
 height: 600px;
 margin: 0 auto 50px;
 background: gray;
}
</style>