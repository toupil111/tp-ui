<template>
  <span v-if="disableTransitions" @click="handleClick">
    <div :class="class_props">
      <span @click="handleClick">
          <slot />
      </span>
      <div v-if="closeable" :class="close_class_props" @click.stop="handleClose">
        x
      </div>
    </div>
  </span>
  <transition v-else appear>
    <div :class="class_props">
      <span @click="handleClick">
          <slot />
      </span>
      <div v-if="closeable" :class="close_class_props" @click.stop="handleClose">
        x
      </div>
    </div>
  </transition>
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
  reactive,
  inject,
  Ref,
  getCurrentInstance,
  onBeforeUnmount,
} from "vue";

export default defineComponent({
  name: "tp-tag",
  props: {
    closeable: {
      type: Boolean,
      default: false,
    },
    disableTransitions: {
      type: Boolean,
      default: false,
    },
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
    typeClass: {
      type: String,
      values: ["", "primary", "success", "info", "warning", "danger"],
      default: "primary",
    },
  },
  setup(props, {}) {
    // computed可以这样子赋值第一次看见
    const class_props = computed(() => [
      "tp-tag",
      //修饰动态的样式
      "tp-tag--" + props.typeClass, //修饰
      // //嵌套对象 状态
      {
        // "is-disabled": props.disabled,
        // "is-round": props.round,
        "is-closeable": props.closeable,
      },
    ]);
    const close_class_props = computed(() => [
      "tp-tag__close",
      "tp-tag__close--" + props.typeClass, //修饰
    ]);
    const handleClose = () => {
      console.log("handleClose");
    };
    const handleClick = () => {
      console.log("handleClick");
    };
    onBeforeUnmount(() => {});
    onMounted(() => {});

    return { handleClose, handleClick, class_props,close_class_props };
  },
});
</script>
