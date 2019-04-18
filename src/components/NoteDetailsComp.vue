<template>
  <div v-if="isLoading === 0">
    <b-container v-if="!viewMode" class="bottom-nav-margin header-margin">
      <b-form-input class="mb-2" placeholder="Title" v-model="note.title" type="text"></b-form-input>
      <vue-tags-input
        v-model="tag"
        :tags="note.tags"
        class="mb-2" 
        :allow-edit-tags="true"
        @tags-changed="newTags => note.tags = newTags"/>
      <b-form-textarea v-model="note.content" placeholder="Content" rows="10" max-rows="100"></b-form-textarea>
    </b-container>
    <b-container v-else class="bottom-nav-margin header-margin">
      <NoteCard border="light" :truncate="false" :note="note"/>
    </b-container>
    <b-navbar fixed="bottom" type="light" variant="dark">
      <b-collapse id="nav-collapse" is-nav>
        <b-button @click="$router.go(-1)" variant="outline-light" class="mr-2">&#8676;</b-button>
        <b-navbar-nav class="ml-auto">  
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
import VueTagsInput from '@johmun/vue-tags-input';
import NoteCard from '@/components/NoteCard.vue';

export default {
  name: "NoteDetailsComp",
  components: {
    VueTagsInput,
    NoteCard
  },
  data: function() {
    return {
      currentNoteId: null,
      note: {},
      isLoading: 1,
      newNote: true,
      saved: false,
      viewMode: false,
      tag: ''
    };
  },
  methods: {
    saveNote: function() {
      console.log(this.note);
      if (this.newNote) {
        this.$store.dispatch("insertNote", this.note)
        .then(response => {
          if (response) {
            this.newNote = false;
            this.viewMode = true;
          }
        });
      } else {
        this.note.dateModefied = `${this.$moment().format("YYYYMMDDTHHmmss")}`;
        this.$store.dispatch("updateNote", this.note)
        .then(response => {
          if (response) {
            this.viewMode = true;
          }
        });
      }
    },
    deleteNote: function() {
      this.$store.dispatch("deleteNote", this.currentNoteId)
      .then(response => {
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
  margin-top: 4rem;
}
.bottom-nav-margin{
  margin-bottom: 5rem;
}
</style>