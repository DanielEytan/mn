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
      center: new google.maps.LatLng(47.55959860000001,7.588576099999955)
      // center: new google.maps.LatLng(51.501527,-0.1921837)
    }

    this.map = new google.maps.Map(element, options);
  },
  methods: {
    getEntries () {
      axios.get('./locations.json')
      .then(response => {
          var _this = this;
          //init marker positions
          response.data.data.forEach(function (item) {
            if (item.lat !== null && item.lng !== null) {
              _this.markerCoordinates.push({latitude:parseFloat(item.lat),longitude:parseFloat(item.lng)});
            }
          });
          //init markers
          _this.markerCoordinates.forEach(function (coord) {
            const position = new google.maps.LatLng(coord.latitude, coord.longitude);
            const marker = new google.maps.Marker({ 
              position,
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
 width: 800px;
 height: 600px;
 margin: 0 auto;
 background: gray;
}
</style>