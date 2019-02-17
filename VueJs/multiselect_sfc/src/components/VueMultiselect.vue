<template>
  <div class="container">
    <div v-if="!open" v-on:click.stop="open = !open">{{displayText()}}</div>
    <div v-else>
      <input type="text" v-model="searchText">
      <div class="select-all">
        <img v-bind:src="checkedUncheckedImageUrl(selectedAll)" v-on:click.stop="selectAll" />
        <span>Select All</span>
      </div>
      <div class="no-results" v-show="filtered().length === 0">
        No results found for: <span class="no-results-searchtext">{{searchText}}</span>
      </div>
      <div class="option-container">
        <div v-for="displayedOption in filtered()" v-bind:key="displayedOption.id" class="option">
          <img v-bind:src="checkedUncheckedImageUrl(displayedOption.selected)" 
            v-on:click.stop="checkboxClicked(displayedOption)" />
          <span>{{displayedOption.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import imageChecked from "../assets/checkbox_checked.png"
import imageUnChecked from "../assets/checkbox_unchecked.png"

export default {
  name: 'VueMultiselect',
  props: {
    options: Array
  },
  data: function() {
    return {
      open: false,
      searchText: "",
      selectedAll: false,
      displayedOptions: this.options.slice(0)
    }
  },
  created: function() {
    window.addEventListener('click', this.close);
    window.addEventListener('keyup', this.close);
  },
  beforeDestroy: function() {
    window.removeEventListener('click', this.close);
    window.removeEventListener('keyup', this.close);
  },
  methods: {
    filtered: function() {
      if (this.searchText !== "") {
        return this.displayedOptions.filter(d => d.name.toLowerCase().includes(this.searchText.toLowerCase()));
      }
      else {
        return this.displayedOptions;
      }
    },
    checkedUncheckedImageUrl: function(selected) {
      if (selected) {
        return imageChecked;
      }
      else {
        return imageUnChecked;
      }
    },
    checkboxClicked: function(option) {
      option.selected = !option.selected;
    },
    selectAll: function() {
      this.selectedAll = !this.selectedAll;
      this.filtered().map(d => d.selected = this.selectedAll);
    },
    displayText: function() {
      let selected = this.displayedOptions.filter(d => d.selected).map(d => d.name);
      if (selected.length === 0) {
        return "None selected";
      }
      else {
        return selected.length + " selected";
      }
    },
    close: function(e) {
      if (this.$el !== e.target && !this.$el.contains(e.target)) {
        this.open = false;
      }
      if (e.which === "ESCAPE") {
        this.open = false;
      }
    }
  }
}
</script>

<style src="../assets/vue-multiselect.css"></style>