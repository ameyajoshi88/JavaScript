<template>
  <div id="app">
    <VueMultiselect v-bind:options="options"/>
  </div>
</template>

<script>
import VueMultiselect from './components/VueMultiselect.vue'

export default {
  name: 'app',
  components: {
    VueMultiselect
  },
  data: function() {
    return {
      options: [
      {id: 1, name: "Volvo", value: "Volvo", selected: false},
      {id: 2, name: "Ferrari", value: "Ferrari", selected: true},
      {id: 3, name: "Chrysler", value: "Chrysler", selected: true},
      {id: 4, name: "Mercedez-Benz", value: "Mercedez-Benz", selected: false},
      {id: 5, name: "Aston Martin", value: "Aston Martin", selected: false}
      ]
    }
  }
}
</script>
