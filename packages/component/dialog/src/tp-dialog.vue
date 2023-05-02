<template>
  <teleport to="body">
    <transition
      name="tp-mask"
      @after-enter="afterEnter"
      @after-leave="afterLeave"
      @before-leave="beforeLeave"
    >
      <div
        class="mask"
        v-show="visible"
        v-bind="$attrs"
        @click="handleClickMask()"
      >
        <div
          class="tp-dialog"
          ref="dialogRef"
          @click.stop="($event) => handleStop($event)"
          id="dialogRef"
        >
          <header class="dialog-header">
            <slot v-if="$slots.title" name="title"> {{ $slots.title }}</slot>
            <slot v-else name="header"></slot>
            <div @click.stop="handleClose">X</div>
          </header>
          <div class="dialog-default">
            <slot />
          </div>
          <footer v-if="$slots.footer" class="dialog-footer">
            <slot name="footer" />
          </footer>
        </div>
      </div>
    </transition>
  </teleport>
</template>
<script lang="ts">
import {
  computed,
  provide,
  ref,
  // PropType,
  // computed,
  // ref,
  onMounted,
  // onUnmounted,
  // render,
  // watch,
  defineComponent,
  getCurrentInstance,
  watch,
  watchEffect,
} from "vue";
import overlay from "./overlay.vue";
import { useDialog } from "./use-dialog.ts";

type DoneFn = (cancel?: boolean) => void;
type DialogBeforeCloseFn = (done: DoneFn) => void;

export default defineComponent({
  components: { overlay },
  name: "tp-dialog",
  props: {
    // title: { type: String, default: "tips" },
    modelValue: { type: Boolean, default: false },
    beforeClose: {
      type: Function,
      default: (done?: DoneFn) => {
        done?.();
      },
    },
    closeOnClickModal: { type: Boolean, default: true }, // 是否可以通过点击 modal 关闭 Dialog
    closeOnPressEscape: { type: Boolean, default: true },
    openDelayTime: { type: Number, default: 0 },
    closeDelayTime: { type: Number, default: 0 },
  },
  //   expose: ["visible"],
  emits: [
    "update:modelValue",
    "beforeClose",
    "close",
    "closed",
    "opened",
    "open",
  ],
  setup(props, { slots, attrs }) {
    const dialogRef = ref<HTMLElement>();

    const {
      visible,
      handleClose,
      handleClickMask,
      handleStop,
      beforeLeave,
      afterLeave,
      afterEnter,
    } = useDialog(props, dialogRef);

    return {
      close,
      handleClose,
      visible,
      dialogRef,
      handleClickMask,
      handleStop,
      beforeLeave,
      afterLeave,
      afterEnter,
    };
  },
});
</script>
<style lang="scss" scoped>
</style>