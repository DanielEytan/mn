<template>
   <div>
      <div v-if="name">
         <h1>Dieses Program wurde von {{ name }} zusammengestellt.</h1><br><br>
      </div>
      <ul class="program-list selected">
         <div v-for="id in ids">
         <li v-for="entry in programevents" v-if="entry.id == id">
             <div v-for="color in entry.parent.shuttleLine" class="institution">
                  <span class="suttle-line" v-bind:style="{color: color.color}"> {{ entry.parent.number }} {{ color.title }}</span><br>
                  <a v-bind:href="entry.parent.url">{{ entry.parent.title }}</a><br>
               </div>
               <h1>{{ entry.title }}</h1>
               <time v-for="time in entry.time">
                  <span v-if="time.type === 'setTimes'"> {{ time.start.date | formatDate }} (Dauer: {{ time.duration }})<br></span>
                  <span v-if="time.type === 'continuous'"> {{ time.start.date | formatDate }} – {{ time.end.date | formatDate }} (Durchgehend)<br></span>
                  <span v-if="time.type === 'iterating'">  {{ time.start.date | formatDate }} – {{ time.end.date | formatDate }} ({{ time.frequency }}, Dauer: {{ time.duration }})<br></span>
               </time>
               <div v-html="entry.description">{{ entry.description }}</div>
               <!-- <saveprogram :programevent="entry"></saveprogram> -->
         </li>
         </div>
      </ul>
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