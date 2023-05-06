<!--
 * @Author: liangweibin
 * @Date: 2023-05-05 16:22:40
 * @LastEditors: liangweibin
 * @LastEditTime: 2023-05-05 17:20:14
 * @Description: 
-->
<template>
  <div  class="tp-switch">
    <input
      :true-value="activeValue"
      :false-value="inactiveValue"
      type="checkbox"
      role="switch"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "tp-switch",
  emits: ["update:modelValue", "change",  "input"],
  props: {
    modelValue: {
      type: [Boolean, String, Number],
      default: false,
    },
    value: {
      type: [Boolean, String, Number],
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    activeValue: {
      type: [Boolean, String, Number],
      default: true,
    },
    inactiveValue: {
      type: [Boolean, String, Number],
      default: false,
    },
  },
  setup(props) {
    const isControlled = ref(props.modelValue !== false);

    watch(
      () => props.modelValue,
      () => {
        isControlled.value = true;
      }
    );

    watch(
      () => props.value,
      () => {
        isControlled.value = false;
      }
    );
  },
});
</script>