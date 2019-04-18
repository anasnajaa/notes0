<template>
    <div>
        <b-container class="header-margin mb-5">
            <h1>#{{ this.currentTag }} ({{ this.filteredNotes.length }})</h1>
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
                if(this.notes[i].tags.indexOf(this.currentTag) > -1) {
                    this.filteredNotes.push(this.notes[i]);
                }
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