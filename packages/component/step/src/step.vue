<template>
  <div :style="props_class" class="tp-step">
    <div class="tp-step__line">
      <i class="tp-step__line-inner"></i>
    </div>
    <div class="tp-step__icon is-text">
      <div class="tp-step__icon-inner">1</div>
    </div>
    <div class="tp-step__main">
      <div v-if="description">{{ description }}description</div>
      <div v-if="title">{{ title }}title</div>
      <div v-if="icon">{{ icon }}icon</div>
    </div>
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
  inject,
} from "vue";

export default defineComponent({
  name: "tp-step",
  props: {
    title: {
      type: String,
      default: "",
    },
    icon: {
      type: [String, Object, Function],
    },
    description: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      values: ["", "wait", "process", "finish", "error", "success"],
      default: "",
    },
  },
  setup(props, {}) {
    // const props_class = computed(()=> {
    //   return props.
    // })
    // const parent = inject('tpSteps') as any

    const props_class = computed(() => {
      return props.status;
    });
    return {
      props_class,
    };
  },
});
</script>
