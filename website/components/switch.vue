<template>
  <div>
    <!-- :active-icon="Check"
      :inactive-icon="Close" -->
    <tp-switch
      v-model="value"
      :active-value="'1'"
      :inactive-value="'2'"
      active-text="1"
      inactive-text="2"
      inline-prompt
    ></tp-switch>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const value = ref('1');

    return {
      value,
    };
  },
});
</script>
