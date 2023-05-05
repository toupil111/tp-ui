<template>
  <div>
    <tp-switch>123123</tp-switch>
    tp-switchtp-switch
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const active = ref(0);
    const next = () => {
      if (active.value++ > 2) active.value = 0;
    };
    return {
      active,
      next,
    };
  },
});
</script>
