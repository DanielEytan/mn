<template>
   <div class="program--entry">
      <div v-if="name" class="name">
         <h1>Dieses Program wurde von {{ name }} zusammengestellt.</h1><br><br>
      </div>
      <ul class="program__list program__list--selection">
         <div v-for="id in ids">
         <li v-for="entry in programevents" v-if="entry.id == id">
             <!-- <div v-for="color in entry.parent.shuttleLine" class="institution">
                  <span class="suttle-line" v-bind:style="{color: color.color}"> {{ entry.parent.number }} {{ color.title }}</span><br>
                  <a v-bind:href="entry.parent.url">{{ entry.parent.title }}</a><br>
               </div> -->
                <section class="institution">
                  <div v-for="color in entry.parent.shuttleLine" v-if="entry.parent.shuttleLine.length < 2">
                      <span class="suttle-line" v-bind:style="{color: color.color}"> <strong>{{ entry.parent.number }}</strong> {{ color.title }}</span>
                  </div>
                  <div v-if="entry.parent.shuttleLine.length > 1">
                      <span class="suttle-line"><strong>{{ entry.parent.number}}</strong></span>
                      <span v-for="color in entry.shuttleLine" v-bind:style="{color: color.color}" class="suttle-line">{{ color.title }} </span> 
                  </div>
                  <h1><a :href="entry.url">{{ entry.parent.title }}</a></h1>
                  <!-- <h2>{{ entry.parent.programmTitle }}</h2> -->
                <!-- <p>{{ entry.address }}<br> – {{ entry.journey }}</p><br> -->

                <!-- <p>Essen: {{ entry.food }}</p><br> -->

                </section>
               <h1>{{ entry.title }}</h1>
               <div v-for="time in entry.time">
                  <time v-if="time.type === 'setTimes'"> {{ time.start.date | formatDate }} <span v-if="time.duration == true">(Dauer: {{ time.duration }})</span><br></time>
                  <time v-if="time.type === 'continuous'"> {{ time.start.date | formatDate }} – {{ time.end.date | formatDate }} (Durchgehend)<br></time>
                  <time v-if="time.type === 'iterating'">  {{ time.start.date | formatDate }} – {{ time.end.date | formatDate }} ({{ time.frequency }}, Dauer: {{ time.duration }})<br></time>
               </div>
               <div v-html="entry.description">{{ entry.description }}</div>
               <!-- <saveprogram :programevent="entry"></saveprogram> -->
         </li>
         </div>
      </ul><br>
   </div>
</template>

<script>
module.exports = {
   name: 'proposedprogram',
   data: function () {
      return {
         url: '',
         ids: '',
         programevents: [],
         name: '',

      }
   },
   mounted () {
      this.getUrl();
      this.getEntries();
      this.splitIds();
      this.getName();
   },
   methods: {
      getEntries: function () {
         let _this = this;
         axios.get('../programevent.json')
         .then(response => {
           this.programevents = response.data.data;
        })
      },
      getUrl: function () {
         var urlParams = new URLSearchParams(window.location.search);
         var ids = urlParams.get('ids');
         var ids = ids.split(" ");
         console.log(ids);
         this.ids = ids;
      },
      getName: function () {
         var urlParams = new URLSearchParams(window.location.search);
         var name = urlParams.get('name');
         this.name = name;
      },
      splitIds: function () {

         var program = this.programevents;
         var idsEntries = []
         var length = program.length;   
         for (var i = 0; i < length; i++) {
            var item = program[i]
            var itemId = item.id;
            console.log(itemId);
         }
      }
   },
}

</script>

<style lang="css" scoped>
</style>