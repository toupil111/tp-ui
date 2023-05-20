<template>
  <!-- 并接 -->
  <input class="tp-input" 
  placeholder="'123132130'"
  type="text"/>
</template>
  
  <script lang="ts">
import { defineComponent } from "vue"; //作用提升
export default defineComponent({
  name: "tp-input",
  //vue2和vue3
  props: {
    name: {
      type: String,
      default: "",
    },
  },
  setup() {},
});
</script>