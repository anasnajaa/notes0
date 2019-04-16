<template>
<div>
    <b-card @click="viewNote" class="card">
        <b-card-title>{{note.title}}</b-card-title>
        <b-card-text v-html="this.parsedNoteContent()">
        </b-card-text>
        <b-card-text class="small text-muted"> {{this.noteTimeSuffix()}} {{  this.noteTime() | moment("from", "now") }}</b-card-text>
    </b-card>
</div>
</template>

<script>
import markDown from 'marked';

export default {
    props: {
        note: Object
    },
    name: 'noteCard',
    methods: {
        noteTimeSuffix: function(){
            if(this.note.dateModefied === null){
                return 'C ';
            }
            return 'M ';
        },
        noteTime: function(){
            if(this.note.dateModefied === null){
                return this.note.dateCreated;
            }
            return this.note.dateModefied;
        },
        viewNote: function(){
            this.$router.push({name: "noteDetails", params:{id: this.note.id}});
        },
        parsedNoteContent: function(){
            return markDown(this.note.content)
        }
    },
    mounted: function(){
    }
}
</script>

<style scoped >
.card {
    cursor: pointer;
}
</style>