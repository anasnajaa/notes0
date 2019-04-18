<template>
  <div>
    <b-card :border-variant="border" @click="viewNote" class="card">
      <b-card-title>{{note.title}}</b-card-title>
      <b-card-text v-html="this.parsedNoteContent()"></b-card-text>
      <b-card-text class="small text-muted">{{ this.noteTime() }}</b-card-text>
      <div v-if="note.tags.length > 0">
          <b-badge class="mr-1" pill @click.stop="viewTag(tag.text)" :key="tag.text" v-for="tag in note.tags" variant="secondary">{{ tag.text }}</b-badge>
      </div>
    </b-card>
  </div>
</template>

<script>
import markDown from "marked";

export default {
  props: {
    note: Object,
    truncate: Boolean,
    date: String,
    border: String
  },
  name: "noteCard",
  methods: {
    noteTime: function() {
      if(this.date === 'simple'){
        if (this.note.dateModefied === null) {
          return `C ${this.$moment(this.note.dateCreated).fromNow(true)}`;
        }
        return `M ${this.$moment(this.note.dateModefied).fromNow(true)}`;
      } else {
        if (this.note.dateModefied === null) {
          return `C ${this.$moment(this.note.dateCreated).format(
            "DD/MM/YYYY, h:mm a"
          )}`;
        }
        return `M ${this.$moment(this.note.dateModefied).format(
          "DD/MM/YYYY, h:mm a"
        )}`;
      }
    },
    viewNote: function() {
      this.$router.push({ name: "noteDetails", params: { id: this.note.id } });
    },
    viewTag: function(tagName){
        this.$router.push({ name: "notesByTag", params: { name: tagName } });
    },
    parsedNoteContent: function() {
      return markDown(this.truncateText(this.note.content, 70));
    },
    truncateText: function (value, limit) {
        if (this.truncate && value.length > limit) {
            value = value.substring(0, (limit - 3)) + '...';
        }
        return value;
    }
  }
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