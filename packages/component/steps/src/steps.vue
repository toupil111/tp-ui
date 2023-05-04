<template>
  <div :class="['tp-steps','is-' + direction]">
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
  getCurrentInstance,
} from "vue";
import type { StepItemState } from "../../step/src/step.vue";

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
    direction: {
      type: String,
      values: ["vertical", "horizontal"],
      default:'horizontal'
    },
  },
  emits: ["change"],
  setup(props, { emit }) {
    const steps = ref([]);

    provide("tpSteps", { props, steps });

    watch(
      () => props.active,
      (newVal: number, oldVal: number) => {
        emit("change", newVal, oldVal);
        console.log(newVal, oldVal);
      }
    );
    console.log(props.active);

    watch(steps, () => {
      console.log(steps, "steps");
      steps.value.forEach((instance: StepItemState, index: number) => {
        console.log(instance, "instance");
        instance.setIndex(index);
      });
    });
  },
});
</script>