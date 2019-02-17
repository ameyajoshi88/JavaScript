Vue.component("my-vue-multiselect", { 
	props: {
		options: []
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
  	search: function(e) {
  		if (this.searchText !== "") {
  			this.displayedOptions = 
  				this.displayedOptions.filter(d => d.name.toLowerCase().includes(this.searchText.toLowerCase()));
  		}
  		else {
  			this.displayedOptions = this.options.slice(0);
  		}
  	},
  	checkedUncheckedImageUrl: function(selected) {
  		if (selected) {
  			return "./images/checkbox_checked.png";
  		}
  		else {
  			return "./images/checkbox_unchecked.png";
  		}
  	},
  	checkboxClicked: function(option) {
			option.selected = !option.selected;
  	},
  	selectAll: function() {
  		this.selectedAll = !this.selectedAll;
  		this.displayedOptions.map(d => d.selected = this.selectedAll);
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
	},
	template: "<div class='container'>"
		+ "<div v-if='!open' v-on:click.stop='open = !open'>{{displayText()}}</div>"
		+ "<div v-else>"
		+ "<input type='text' v-model='searchText' v-on:keyup.stop='search'>"
		+ "<div class='select-all'><img v-bind:src='checkedUncheckedImageUrl(selectedAll)' v-on:click.stop='selectAll' />"
		+ "<span>Select All</span></div>"
		+ "<div class='no-results' v-show='displayedOptions.length === 0'>"
		+ "No results found for: \"<span class='no-results-searchtext'>{{searchText}}</span>\"</div>"
		+ "<div class='option-container'>"
		+ "<div v-for='displayedOption in displayedOptions' v-bind:key='displayedOption.id' class='option'>"
		+ "<img v-bind:src='checkedUncheckedImageUrl(displayedOption.selected)' v-on:click.stop='checkboxClicked(displayedOption)' />"
		+ "<span>{{displayedOption.name}}</span>"
		+ "</div>"
		+ "</div>"
	  + "</div>"
	  + "</div>"
});