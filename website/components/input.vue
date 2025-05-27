<template>
  <input
    ref="input"
    class="tp-input"
    :value="modelValue"
    @input="handleInput"
    @blur="handleBlur"
    @focus="handleFocus"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "tp-input",
  props: {
    modelValue: {
      type: [String, Number],
      default: "",
    },
  },
  emits: ["update:modelValue", "blur", "focus", "input"],
  setup(props, { emit }) {
    const input = ref<HTMLInputElement | null>(null);

    const handleInput = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const value = target.value;
      emit("update:modelValue", value);
      emit("input", value);
    };

    const handleBlur = (event: Event) => {
      emit("blur", event);
    };

    const handleFocus = (event: Event) => {
      emit("focus", event);
    };

    return {
      input,
      handleInput,
      handleBlur,
      handleFocus,
    };
  },
});
</script>

<style lang="scss" scoped>
.tp-input {
  width: 100%;
  height: 32px;
  line-height: 32px;
  padding: 0 15px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  transition: border-color 0.2s;
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: #409eff;
  }

  &:hover {
    border-color: #c0c4cc;
  }
}
</style>
  