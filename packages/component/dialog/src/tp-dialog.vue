<template>
  <!-- <teleport to="body"> -->
  <!-- <transition name="dialog-fade"> -->
  <div class="container" v-show="visible">
    <!-- {{ mySlots }} -->
    <div>
      <template v-if="!mySlots.title">
        <slot name="header" />
      </template>
      <template v-else>
        <slot name="title" />
      </template>
      <slot />
      <template v-if="mySlots.footer">
        <slot name="footer" />
      </template>
    </div>
  </div>
  <!-- </transition> -->
  <!-- </teleport> -->
</template>
<script lang="ts">
import {
  computed,
  provide,
  ref,
  // PropType,
  // computed,
  // ref,
  // onMounted,
  // onUnmounted,
  // render,
  // watch,
  defineComponent,
  useSlots,
} from "vue";

// const props = defineProps({
//   visible: { type: Boolean, default: false },
//   title: { type: String, default: "tips" },
// });

// const slots = useSlots();
// console.log(!slots.title);

export default defineComponent({
  name: "tp-dialog",
  props: {
    visible: { type: Boolean, default: false },
    // title: { type: String, default: "tips" },
  },
  setup(props, { slots }) {
    console.log(props);
    console.log(slots);
    // const slots = useSlots()
    // console.log(slots,'slots');
    const mySlots = slots;
    return {
      mySlots,
    };
  },
});
</script>
<style lang="scss" scoped>
.container {
  height: 200px;
  width: 200px;
  background-color: red;
}
</style>