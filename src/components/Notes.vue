<template>
  <div>
    <b-container class="header-margin mb-5">
      <b-card-group columns v-if="this.notesFilteredByPage.length > 0">
        <NoteCard date="simple" :truncate="true" :key="note.id" v-for="note in this.notesFilteredByPage" :note="note"/>
      </b-card-group>
      <b-alert v-else show class="text-center" variant="light">No notes. <br/>
        Powered by <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage">localStorage</a> and 
        <a href="https://github.com/markedjs/marked">Marked</a></b-alert>
    </b-container>
    <b-navbar fixed="bottom" type="light" variant="dark">
      <b-collapse id="nav-collapse" is-nav>
        <div class="overflow-auto">
          <b-pagination-nav class="pagination-margin" limit="12" size="sm" align="fill" :link-gen="linkGen" :number-of-pages="paginationPagesCount" use-router></b-pagination-nav>
        </div>
        <b-navbar-nav class="ml-auto">  
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
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
      notesFilteredByPage: [],
      notesPerPage: 12
    };
  },
  mounted: function() {
    this.filterByPage();
  },
  methods: {
      linkGen(pageNum) {
        return pageNum === 1 ? '?' : `?page=${pageNum}`
      },
      filterByPage: function(){
        this.notesFilteredByPage = [];
        const startingIndex = (this.currentPage - 1) * this.notesPerPage;
        let endingIndex = startingIndex + this.notesPerPage;
        endingIndex = endingIndex > this.notes.length ? this.notes.length : endingIndex;
        for(let i = startingIndex; i < endingIndex; i++){
          this.notesFilteredByPage.push(this.notes[i]);
        }
      }
  },
  computed: {
    notes() {
        return this.$store.state.notes.notes;
    },
    currentPage(){
      return this.$route.query.page || 1;
    },
    paginationPagesCount(){
      if(this.notes.length > 0){
        return Math.ceil(this.notes.length / this.notesPerPage) || 1;
      }
      return 1;
    }
  },
  watch: {
    $route: function(to) {
        if(to.name === "home"){
          this.filterByPage();
        }
    }
  },
}
</script>

<style>
    .header-margin{
        margin-top: 5rem;
    }
    .pagination-margin ul {
      margin-bottom: 0;
    }
</style>
