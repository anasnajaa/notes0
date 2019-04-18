<template>
    <div>
    <b-navbar fixed="top" toggleable="lg" type="light" variant="warning">
        <b-navbar-brand to="/">{{this.title}}</b-navbar-brand>
        <b-navbar-nav>
            <b-button v-if="showNewBtn" size="sm" class="m-0" @click="NewNoteUrl()"> + </b-button>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
            <b-input-group v-if="showNewBtn" size="sm" class="m-0">
                <b-form-input size="sm" @keyup.enter="search" v-model="searchTerm" placeholder="Search"></b-form-input>
                <b-dropdown size="sm" text="by" variant="info" slot="append">
                    <b-dropdown-item  >Title/Content</b-dropdown-item>
                    <b-dropdown-item  >Tag</b-dropdown-item>
                </b-dropdown>
            </b-input-group>
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
        },
        search: function(){
            this.$router.push({name: 'notesBySearchText', query: { searchText: this.searchTerm, page: 1 }});
        }
    },
    computed: {
    },
    data: function(){
        return {
            showNewBtn: true,
            title: 'N0',
            searchTerm: ''
        };
    },
    watch: {
        $route: function(to) {
            if(to.name === "home"){
                this.searchTerm = '';
                this.showNewBtn = true;
            } else if(to.name === "noteDetails") {
                this.showNewBtn = false;
            } else if (to.name === "notesBySearchText"){
                this.showNewBtn = true;
                this.searchTerm = to.query.searchText;
            }
        }
  }
}
</script>