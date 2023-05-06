<template>
  <div>
    <tp-switch v-model="value"></tp-switch>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const value = ref(false);

    return {
      value,
    };
  },
});
</script>
