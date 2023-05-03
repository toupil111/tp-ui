<template>
  <div>
    <slot name="default"></slot>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  PropType,
  computed,
  ref,
  onMounted,
  onUnmounted,
  render,
  watch,
  provide,
} from "vue";
// import step from "../../step/src/step.vue";
export default defineComponent({
  name: "tp-steps",
  props: {
    space: {
      type: [Number, String],
      default: "",
    },
    active: {
      type: Number,
      default: 0,
    },
    finishStatus: {
      type: String,
      values: ["wait", "process", "finish", "error", "success"],
      default: "finish",
    },
    processStatus: {
      type: String,
      values: ["wait", "process", "finish", "error", "success"],
      default: "process",
    },
  },     
  setup(props, { emit }) {
    const steps = ref([])
    provide("tpSteps", { props, steps });
    watch(
      () => props.active,
      (newVal: number, oldVal: number) => {
        emit('change', newVal, oldVal);
      }
    );
  },
});
</script>