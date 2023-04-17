<template>
  <!-- 并接 -->
  <i :class="`tp-icon-${name}`"></i>
</template>
  
  <script lang="ts">
import { defineComponent } from "vue"; //作用提升
export default defineComponent({
  name: "tp-icon",
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