<template>
  <tp-steps :active="active">
    <tp-step :description="'描述'" :icon="'icon'" :title="'title'"></tp-step>
    <tp-step :description="'描述'" :icon="'icon'" :title="'title'"></tp-step>
    <tp-step :description="'描述'" :icon="'icon'" :title="'title'"></tp-step>
  </tp-steps>
  <tp-button style="margin-top: 12px" @click="next">Next step</tp-button>
</template>
  <script>
import { defineComponent, ref } from "vue";
//引入 message
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
    <style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
}
.container > div {
  margin: 20px 0;
}
</style>