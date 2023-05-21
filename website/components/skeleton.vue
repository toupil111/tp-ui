<template>
  <div class="container">
    <tp-skeleton :rows="5" animated> </tp-skeleton>
    <tp-skeleton animated>
      <template #template>
        <tp-skeleton-item variant="circle" />
        <tp-skeleton-item variant="image" style="width: 240px; height: 240px" />
      </template>
    </tp-skeleton>
  </div>
</template>
  <script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup(props, {}) {},
});
</script>
  <style lang="scss" scoped>
.container {
  width: 50%;
}
</style>