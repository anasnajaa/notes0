<template>
    <div>
        <b-container class="header-margin mb-5">
            <h1>Like: {{ this.currentSearchTerm }} ({{ this.filteredNotes.length }})</h1>
            <b-card-group columns v-if="this.filteredNotes.length > 0">
                <NoteCard :key="note.id" v-for="note in this.filteredNotes" :note="note"/>
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
            currentSearchTerm: ''
        }
    },
    mounted: function() {
        this.currentSearchTerm = this.$route.params.searchText;

        for(let i = 0; i < this.notes.length; i++){
            if(this.notes[i].title.indexOf(this.currentSearchTerm) > -1 ||
                this.notes[i].content.indexOf(this.currentSearchTerm) > -1){
                this.filteredNotes.push(this.notes[i]);
            }
        }

    },
    computed: {
        notes() {
            return this.$store.state.notes.notes;
        }
    }
}
</script>

<style scoped lang="scss">
    .header-margin{
        margin-top: 5rem;
    }
</style>