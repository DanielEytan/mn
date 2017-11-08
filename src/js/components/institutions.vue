<template>
	<div id="container">
		<header class="section-header">
			<div class="narrow">
				<h1>INSTITUTIONEN</h1>
				<nav>
					<span v-show="mapView"><i v-on:click="toggleListView">&#9638; Liste</i> <i class="inactive">&#128204; Karte</i></span>
					<span v-show="listView"><i class="inactive">&#9638; Liste</i> <i v-on:click="toggleMapView">&#128204; Karte</i></span>
				</nav>
			</div>
		</header>
		<div class="map-container" v-if="mapView">
		<!-- <div class="map-container"> -->

			<googlemap name="googleMap"></googlemap>

		</div>
	 	<div  class="flex-container list-view" v-show="listView">
	 		<article v-for="entry in institutions" class="institutions--overview_child">
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
					<span v-if="entry.wifi == 1">w</span>

				</div>
				<p>{{ entry.address }} <span v-if="entry.location">{{ entry.location }}</span></p>
				<p class="journey" v-html="entry.journey">{{ entry.journey }}</p>
			</a>
			</article>
	 	</div>
	 </div>
</template>

<script>
import GoogleMap from './GoogleMap.vue'

module.exports = {
	name: 'institutions',
	components: {
    googlemap: GoogleMap
  	},
  	data: function () {
    	return {
      	listView: true,
      	mapView: false,
      	institutions: [],

    	}
  	},
  	mounted () {
  		this.getEntries();
  	},
  	methods: {
  		toggleListView () {
  				this.listView = !this.listView;
  			if (this.mapView = true) {
              this.mapView = false;
            };
  		},
  		toggleMapView () {
  			this.mapView = !this.mapView;
  			if (this.listView = true) {
              this.listView = false;
            };
  		},
  		getEntries () {
  			let vm = this;
  			axios.get('institution.json')
  				.then(response => {
  					// var presell = this.presellLocations;
  					// var presell = JSON.parse(string);
  					this.institutions = response.data.data
  				})
  		}
  	}
}

</script>

<style lang="css" scoped>
</style>