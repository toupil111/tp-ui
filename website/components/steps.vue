<template>
  <tp-steps class="tp-steps">
    <tp-step :description="'描述'"  :icon="'icon'" :title="'title'"></tp-step>
    <tp-step :description="'描述'"  :icon="'icon'" :title="'title'"></tp-step>
    <tp-step :description="'描述'"  :icon="'icon'" :title="'title'"></tp-step>
  </tp-steps>
</template>
  <script>
import { defineComponent, ref } from "vue";
//引入 message
export default defineComponent({
  setup() {
    return {};
  },
});
</script>
    <style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
}
.container > div {
  margin: 20px 0;
}
</style>