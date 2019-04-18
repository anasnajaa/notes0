<template>
    <div>
        <b-container class="header-margin mb-5">
            <div class="overflow-auto">
                <b-pagination-nav base-url="/search" limit="12" size="sm" align="fill" :link-gen="linkGen" :number-of-pages="paginationPagesCount" use-router></b-pagination-nav>
            </div>
            <h1>Like: {{ this.currentSearchTerm }} ({{ this.filteredNotes.length }})</h1>
            <b-card-group columns v-if="this.filteredNotes.length > 0">
                <NoteCard :key="note.id" v-for="note in this.notesFilteredByPage" :note="note"/>
            </b-card-group>
            <b-alert v-else show class="text-center" variant="light">No notes with this search term</b-alert>
        </b-container>
    </div>
</template>

<script>
import NoteCard from '@/components/NoteCard.vue';

export default {
    name: 'NotesBySearchTerm',
    components: {
        NoteCard
    },
    data: function(){
        return {
            filteredNotes: [],
            notesFilteredByPage: [],
            notesPerPage: 12,
        }
    },
    methods: {
      linkGen(pageNum) {
        return `?searchText=${this.currentSearchTerm}&page=${pageNum}`;
      },
      filterByPage: function(){
        this.notesFilteredByPage = [];
        const startingIndex = (this.currentPage - 1) * this.notesPerPage;
        let endingIndex = startingIndex + this.notesPerPage;
        endingIndex = endingIndex > this.filteredNotes.length ? this.filteredNotes.length : endingIndex;
        for(let i = startingIndex; i < endingIndex; i++){
          this.notesFilteredByPage.push(this.filteredNotes[i]);
        }
      },
      filterBySearchText: function(){
        this.filteredNotes = [];
        for(let i = 0; i < this.notes.length; i++){
            if(this.notes[i].title.indexOf(this.currentSearchTerm) > -1 ||
                this.notes[i].content.indexOf(this.currentSearchTerm) > -1){
                this.filteredNotes.push(this.notes[i]);
            }
        }
      }
    },
    mounted: function() {
        this.filterBySearchText();
        this.filterByPage();
    },
    computed: {
        currentSearchTerm() {
            return this.$route.query.searchText;
        },
        currentPage(){
            return this.$route.query.page || 1;
        },
        paginationPagesCount(){
            if(this.notes.length > 0){
                return Math.ceil(this.filteredNotes.length / this.notesPerPage) || 1;
            }
            return 1;
        },
        notes() {
            return this.$store.state.notes.notes;
        }
    },
    watch: {
        $route: function(to, from) {
            if(to.query.searchText !== from.query.searchText){
                this.filterBySearchText();
            }
            this.filterByPage();
        }
    },
}
</script>

<style scoped lang="scss">
    .header-margin{
        margin-top: 5rem;
    }
</style>