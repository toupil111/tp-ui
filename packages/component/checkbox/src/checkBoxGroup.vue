<template>
  <div class="tp-checkboxGroup">
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent, computed, provide } from "vue";
export default defineComponent({
  name: "tp-checkBoxGroup",
  props: {
    modelValue: Array, //给儿子提供数据
    min: Number,
    max: Number,
  },
  emits: ["update:modelValue", "change"],
  setup(props, { emit }) {

    let modelValue = computed(() => props.modelValue); //响应式  默认选中

    let max_props = computed(() => props.max);

    let min_props = computed(() => props.min);

    const handChange = (val) => {
      emit("update:modelValue", val); // v-model
      emit("change", val); //
    };

    //给子组件提供数据 =>provide inject
    provide("tpCheckBoxGroup", {
      modelValue,
      handChange,
      name: "tpCheckBoxGroup",
      min: min_props.value,
      max: max_props.value,
    });
  },
});
</script>

<style>
</style>