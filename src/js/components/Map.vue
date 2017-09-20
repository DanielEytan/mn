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
    // this.bounds = new google.maps.LatLngBounds();
    // const element = document.getElementById(this.mapName)
    // const mapCentre = this.markerCoordinates[0]
    // const options = {
    //   center: new google.maps.LatLng(mapCentre.latitude, mapCentre.longitude)
    // }
    // this.map = new google.maps.Map(element, options);
    // this.markerCoordinates.forEach((coord) => {
    //   const position = new google.maps.LatLng(coord.latitude, coord.longitude);
    //   const marker = new google.maps.Marker({ 
    //     position,
    //     map: this.map
    //   });
    // this.markers.push(marker)
    //   this.map.fitBounds(this.bounds.extend(position))
    // });
    // this.markers.getEntries();
    this.getEntries();
  }, 
  methods: {
    getEntries () {
      axios.get('/locations.json')
        .then(response => {
          console.log("test");
          var _this = this;
          // this.markers = response.data.data;
          response.data.data.forEach(function (item) {
            if (item.lat !== undefined && item.lng !== undefined) {
              _this.markerCoordinates.push({latitude:parseFloat(item.lat),longitude:parseFloat(item.lng)});
            }
          } )
          // this.bounds = new google.maps.LatLngBounds();
          const element = document.getElementById(this.mapName)
          const mapCentre = this.markerCoordinates[0]
          const options = {
            center: new google.maps.LatLng(mapCentre.latitude, mapCentre.longitude)
            // center: new google.maps.LatLng(51.501527,-0.1921837)
          }
          this.map = new google.maps.Map(element, options);
          this.markerCoordinates.forEach((coord) => {
            const position = new google.maps.LatLng(coord.latitude, coord.longitude);
            const marker = new google.maps.Marker({ 
              position,
              map: this.map
            });
          this.markers.push(marker)
          console.log(marker.position.lat())
          // this.map.fitBounds(this.bounds.extend(position))
          });

        })
    }
  }
//   mounted: function () {
//   const bounds = new google.maps.LatLngBounds();
//   const element = document.getElementById(this.mapName)
//   const mapCentre = this.markerCoordinates[0]
//   const options = {
//     center: new google.maps.LatLng(mapCentre.latitude, mapCentre.longitude)
//   }
//   const map = new google.maps.Map(element, options);
//   this.markerCoordinates.forEach((coord) => {
//     const position = new google.maps.LatLng(coord.latitude, coord.longitude);
//     const marker = new google.maps.Marker({ 
//       position,
//       map
//     });
//     map.fitBounds(bounds.extend(position))
//   });
// }
};
</script>

<style scoped>
.google-map {
   width: 800px;
   height: 600px;
   margin: 0 auto;
   background: gray;
}
</style>