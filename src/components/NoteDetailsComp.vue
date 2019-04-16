<template>
    <div>
        <b-container v-if="!viewMode" class="mb-5 header-margin">
            <b-form-input class="mb-2" placeholder="Title" v-model="note.title" type="text"></b-form-input>
            <b-form-textarea
                v-model="note.content"
                placeholder="Content"
                rows="10"
                max-rows="100"
            ></b-form-textarea>
        </b-container>
        <b-container v-else class="mb-5 header-margin">
            <h1>{{note.title}}</h1>
            <div v-html="parsed()"></div>
        </b-container>
        <b-navbar fixed="bottom" type="light" variant="dark">
            <b-collapse id="nav-collapse" is-nav>
                <span v-if="!this.newNote" class="small text-muted"> {{this.noteTimeSuffix()}} {{  this.noteTime() | moment("DD/MM/YYYY, h:mm a") }}</span>
                <b-navbar-nav class="ml-auto">
                    <b-button @click="deleteNote()" variant="danger" size="sm" class="mr-2">Del</b-button>
                    <b-button v-if="viewMode" @click="toggleViewMode()" size="sm" class="m-0">Edit</b-button>
                    <b-button v-if="!viewMode" @click="saveNote()" :disabled="note.title === '' || note.content === ''" variant="info" size="sm" class="m-0">Save</b-button>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
import markDown from 'marked';

export default {
    name: 'NoteDetailsComp',
    data: function(){
        return {
            tempNotes: [],
            note: {
                title: '',
                content: '',
                dateCreated: `${this.$moment().format("YYYYMMDDTHHmmss")}`,
                dateModefied: null
            },
            isLoading: 1,
            newNote: true,
            saved: false,
            viewMode: false
        };
    },
  created: function() {

  },
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
    saveNote: function(){
        if(this.newNote){
            this.tempNotes.push(this.note);
            this.commitChanges(this.tempNotes);
            this.newNote = false;
        } else {
            for(let i = 0; i < this.tempNotes.length; i++){
                if(this.tempNotes[i].id === this.note.id){
                    this.note.dateModefied = `${this.$moment().format("YYYYMMDDTHHmmss")}`;
                    this.tempNotes[i] = this.note;
                    this.commitChanges();
                    break;
                }
            }
        }
        this.viewMode = true;
    },
    deleteNote: function(){
        for(let i = 0; i < this.tempNotes.length; i++){
            if(this.tempNotes[i].id === this.note.id){
                this.tempNotes.splice(i, 1);
                this.commitChanges();
                this.$router.push({name: "home"});
                break;
            }
        }
    },
    commitChanges: function(){
        localStorage.setItem('notes', JSON.stringify(this.tempNotes));
    },
    parsed: function(){
        return markDown(this.note.content);
    },
    toggleViewMode: function(){
        this.viewMode = !this.viewMode;
    }
  },
  mounted: function() {
      this.tempNotes = JSON.parse(localStorage.getItem('notes'));
      this.note.id = this.$route.params.id;
        for(let i = 0; i < this.tempNotes.length; i++){
            if(this.tempNotes[i].id === this.note.id){
                this.note = this.tempNotes[i];
                this.newNote = false;
                this.viewMode = true;
                break;
            }
        }
    this.isLoading = 0;
  },
  updated: function() {
  },
  destroyed: function() {

  }
}
</script>

<style scoped>
    .header-margin{
        margin-top: 5rem;
    }
</style>