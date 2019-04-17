<template>
    <div>
    <b-navbar fixed="top" toggleable="lg" type="light" variant="warning">
        <b-navbar-brand to="/">{{this.title}}</b-navbar-brand>
        <b-navbar-nav>
            <b-button v-if="showNewBtn" size="sm" class="m-0" @click="NewNoteUrl()">+ New</b-button>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
            <b-form-input v-if="showNewBtn" size="sm" class="m-0" placeholder="Search"></b-form-input>
        </b-navbar-nav>
    </b-navbar>
    </div>
</template>

<script>
import { uuid } from 'vue-uuid';

export default {
    props: {
        searchChanged: Function
    },
    methods: {
        NewNoteUrl: function() {
            this.$router.push({name: 'noteDetails', params: { id: uuid.v1() }});
        }
    },
    computed: {
    },
    data: function(){
        return {
            showNewBtn: true,
            title: 'Notes'
        };
    },
    watch: {
        $route: function(to) {
            if(to.name === "home"){
                this.showNewBtn = true;
            } else if(to.name === "noteDetails") {
                this.showNewBtn = false;
            }
        }
  }
}
</script>