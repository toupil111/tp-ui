<!--
 * @Author: chenzelong
 * @Date: 2023-04-17 10:31:36
 * @LastEditors: chenzelong
 * @LastEditTime: 2023-04-17 14:54:28
 * @Description: 
-->
<template>
  <button :class="class_props">
    <i v-if="loading" class="tp-icon-Loading"></i>
    <i v-if="icon && !loading" :class="icon"></i>
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>

<script lang="ts" >
import { defineComponent, PropType, computed } from "vue";
//vue3组件传值 限制类型PropType
type buttonType = "primary" | "danger" | "info" | "text";


export default defineComponent({
  name: "tp-button",
  props: {
    type: {
      type: String as PropType<buttonType>,
      //校验
      vaildator: (val: string) => {
        return ["primary", "danger", "info", "text"].includes(val);
      },
      default: "primary",
    },
    icon: {
      stype: String, //icon 图标  tp-icon-内存
      default: "",
    },
    disabled: Boolean,
    round: Boolean,
    loading: Boolean,
  },
  setup(props, ctx) {
    const class_props = computed(() => [
      //
      "tp-button",
      //修饰动态的样式
      "tp-button--" + props.type, //修饰
      //嵌套对象 状态
      {
        "is-disabled": props.disabled,
        "is-round": props.round,
        "is-loading": props.loading,
      },
    ]);
    return {
      class_props,
    };
  },
});
</script>