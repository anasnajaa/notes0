<template>
    <div>
        <b-container class="header-margin mb-5">
            <h1><i>#{{ this.currentTag }} ({{ this.filteredNotes.length }})</i></h1>
            <b-card-group columns v-if="this.filteredNotes.length > 0">
                <NoteCard :key="note.id" v-for="note in this.filteredNotes" :note="note"/>
            </b-card-group>
            <b-alert v-else show class="text-center" variant="light">No notes with this tag</b-alert>
        </b-container>
    </div>
</template>

<script>
import NoteCard from '@/components/NoteCard.vue';

export default {
    name: 'NotesByTag',
    components: {
        NoteCard
    },
    data: function(){
        return {
            filteredNotes: [],
            currentTag: ''
        }
    },
    mounted: function() {
        this.currentTag = this.$route.params.name;

        for(let i = 0; i < this.notes.length; i++){
            if(this.notes[i].tags !== null &&
                this.notes[i].tags.length > 0){
                for(let t = 0; t < this.notes[i].tags.length; t++){
                    if(this.notes[i].tags[t].text === this.currentTag) {
                        this.filteredNotes.push(this.notes[i]);
                    }
                }
            }
        }

    },
    computed: {
        notes() {
            return this.$store.state.notes.notes;
        }
    },
    watch: {
        // $route: function(to, from) {
        //     if(to.query.searchText !== from.query.searchText){
        //         this.filterBySearchText();
        //     }
        //     this.filterByPage();
        // }
    },
}
</script>

<style scoped lang="scss">
    .header-margin{
        margin-top: 5rem;
    }
</style>