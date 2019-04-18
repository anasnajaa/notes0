<template>
  <div>
    <b-card @click="viewNote" class="card">
      <b-card-title>{{note.title}}</b-card-title>
      <b-card-text v-html="this.parsedNoteContent()"></b-card-text>
      <b-card-text class="small text-muted">{{ this.noteTime() }}</b-card-text>
      <div v-if="note.tags.length > 0">
          <b-badge class="mr-1" pill @click.stop="viewTag(tag)" :key="tag" v-for="tag in note.tags" variant="secondary">{{ tag }}</b-badge>
      </div>
    </b-card>
  </div>
</template>

<script>
import markDown from "marked";

export default {
  props: {
    note: Object
  },
  name: "noteCard",
  methods: {
    noteTime: function() {
      if (this.note.dateModefied === null) {
        return `C ${this.$moment(this.note.dateCreated).fromNow(true)}`;
      }
      return `M ${this.$moment(this.note.dateModefied).fromNow(true)}`;
    },
    viewNote: function() {
      this.$router.push({ name: "noteDetails", params: { id: this.note.id } });
    },
    viewTag: function(tagName){
        this.$router.push({ name: "notesByTag", params: { name: tagName } });
    },
    parsedNoteContent: function() {
      return markDown(this.note.content);
    }
  },
  mounted: function() {}
};
</script>

<style scoped >
.card {
  cursor: pointer;
}

.card .card-body {
    padding: .75rem;
}

.card .card-text {
    margin: 0;
}
</style>