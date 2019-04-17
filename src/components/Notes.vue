<template>
  <div>
    <b-container class="header-margin mb-5">
      <b-card-group columns v-if="this.notes.length > 0">
        <NoteCard :key="note.id" v-for="note in this.notes" :note="note"/>
      </b-card-group>
      <b-alert v-else show class="text-center" variant="light">No notes. <br/>
        Powered by <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage">localStorage</a> and 
        <a href="https://github.com/markedjs/marked">Marked</a></b-alert>
    </b-container>
  </div>
</template>

<script>
import NoteCard from '@/components/NoteCard.vue';

export default {
  name: 'Notes',
  components: {
    NoteCard
  },
  data: function(){
    return {
    };
  },
  props: {

  },
  created: function() {},
  mounted: function() {
  },
  computed: {
    notes() {
        return this.$store.state.notes.notes;
    }
  },
  updated: function() {},
  destroyed: function() {}
}
</script>

<style scoped lang="scss">
    .header-margin{
        margin-top: 5rem;
    }
</style>
