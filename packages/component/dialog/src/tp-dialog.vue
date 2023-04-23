<template>
  <teleport to="body">
    <transition name="dialog-fade">
      <div>
        <div class="mask" v-show="visible" v-bind="$attrs">
          <div class="tp-dialog" ref="dialogRef">
            <header class="dialog-header">
              <slot v-if="$slots.title" name="title"> {{ $slots.title }}</slot>
              <slot v-else name="header"></slot>
              <div @click="handleClose">X</div>
            </header>
            <div class="dialog-default">
              <slot />
            </div>
            <footer v-if="$slots.footer" class="dialog-footer">
              <slot name="footer" />
            </footer>
          </div>
        </div>
        <!-- <overlay>
          <div ref="dialogRef" class="mask" v-show="visible" v-bind="$attrs">
            <div class="tp-dialog">
              <header class="dialog-header">
                <slot v-if="$slots.title" name="title">
                  {{ $slots.title }}</slot
                >
                <slot v-else name="header"></slot>
                <div @click="handleClose">X</div>
              </header>
              <div class="dialog-default">
                <slot />
              </div>
              <footer v-if="$slots.footer" class="dialog-footer">
                <slot name="footer" />
              </footer>
            </div>
          </div>
        </overlay> -->
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

export default defineComponent({
  components: { overlay },
  name: "tp-dialog",
  props: {
    // title: { type: String, default: "tips" },
    modelValue: { type: Boolean, default: false },
    beforeClose: { type: Function, default: () => {} },
  },
  //   expose: ["visible"],
  emits: ["update:modelValue", "beforeClose"],
  setup(props, { slots, attrs }) {
    const dialogRef = ref<HTMLElement>();

    const { visible, handleClose } = useDialog(props, dialogRef);

    return {
      close,
      handleClose,
      visible,
      dialogRef
    };
  },
});
</script>
<style lang="scss" scoped>
.mask {
  position: fixed;
  display: flex;
  justify-content: center;
  align-self: center;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0 0 0 / 50%);
  z-index: 2023;
  .tp-dialog {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 20vh;
    width: 30%;
    height: 300px;
    background-color: #fff;
    z-index: 2024;
    .dialog-header {
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 20px;
      padding-bottom: 10px;
      margin-right: 16px;
    }
    .dialog-default {
      padding: 20px;
      color: #606266;
      font-size: 14px;
    }
    .dialog-footer {
      box-sizing: border-box;
      padding: 20px;
      padding-top: 10px;
      text-align: right;
    }
  }
}
</style>