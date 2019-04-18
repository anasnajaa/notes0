<template>
  <div v-if="isLoading === 0">
    <b-container v-if="!viewMode" class="mb-5 header-margin">
      <b-form-input class="mb-2" placeholder="Title" v-model="note.title" type="text"></b-form-input>
      <b-form-input
        class="mb-2"
        placeholder="Tags (Comma delimited)"
        v-model="noteTagsArrayToString"
        type="text"
      ></b-form-input>
      <b-form-textarea v-model="note.content" placeholder="Content" rows="10" max-rows="100"></b-form-textarea>
    </b-container>
    <b-container v-else class="mb-5 header-margin">
      <h1>{{note.title}}</h1>
      <div v-if="note.tags.length > 0">
          <b-badge class="mr-1" pill :key="tag" v-for="tag in note.tags" variant="secondary">{{ tag }}</b-badge>
      </div>
      <div v-html="parsed()"></div>
    </b-container>
    <b-navbar fixed="bottom" type="light" variant="dark">
      <b-collapse id="nav-collapse" is-nav>
        <span v-if="!this.newNote" class="small text-muted">{{ this.noteTime() }}</span>
        <b-navbar-nav class="ml-auto">
          <b-button @click="$router.go(-1)" variant="outline-light" class="mr-2">&#8676;</b-button>
          <b-button @click="deleteNote()" variant="danger" size="sm" class="mr-2">Del</b-button>
          <b-button v-if="viewMode" @click="toggleViewMode()" size="sm" class="m-0">Edit</b-button>
          <b-button
            v-if="!viewMode"
            @click="saveNote()"
            :disabled="note.title === '' || note.content === ''"
            variant="info"
            size="sm"
            class="m-0"
          >Save</b-button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import markDown from "marked";

export default {
  name: "NoteDetailsComp",
  data: function() {
    return {
      currentNoteId: null,
      note: {},
      isLoading: 1,
      newNote: true,
      saved: false,
      viewMode: false
    };
  },
  methods: {
    noteTime: function() {
      if (this.note.dateModefied === null) {
        return `C ${this.$moment(this.note.dateCreated).format(
          "DD/MM/YYYY, h:mm a"
        )}`;
      }
      return `M ${this.$moment(this.note.dateModefied).format(
        "DD/MM/YYYY, h:mm a"
      )}`;
    },
    saveNote: function() {
      if (this.newNote) {
        this.$store.dispatch("insertNote", this.note).then(response => {
          if (response) {
            this.newNote = false;
            this.viewMode = true;
          }
        });
      } else {
        this.note.dateModefied = `${this.$moment().format("YYYYMMDDTHHmmss")}`;
        this.$store.dispatch("updateNote", this.note).then(response => {
          if (response) {
            this.viewMode = true;
          }
        });
      }
    },
    deleteNote: function() {
      this.$store.dispatch("deleteNote", this.currentNoteId).then(response => {
        if (response) {
          this.$router.push({ name: "home" });
        }
      });
    },
    getNote: function() {
      return this.$store.getters.getNoteById(this.currentNoteId);
    },
    parsed: function() {
      return markDown(this.note.content);
    },
    toggleViewMode: function() {
      this.viewMode = !this.viewMode;
    }
  },
  computed: {
    notes() {
      return this.$store.state.notes.notes;
    },
    noteTagsArrayToString: function(){
        return this.note.tags.join(',');
    },
    noteTagsStringToArray: function(){
        return this.noteTagsArrayToString.split(",");
    }
  },
  mounted: function() {
    this.currentNoteId = this.$route.params.id;
    const tempNote = this.getNote();

    if (tempNote !== null) {
      this.note = {...tempNote};
      this.newNote = false;
      this.viewMode = true;
    } else {
      this.note = {
        id: this.currentNoteId,
        title: "",
        content: "",
        dateCreated: `${this.$moment().format("YYYYMMDDTHHmmss")}`,
        dateModefied: null,
        tags: []
      };
    }
    this.isLoading = 0;
  }
};
</script>

<style scoped>
.header-margin {
  margin-top: 5rem;
}
</style>