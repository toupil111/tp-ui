import {
  computed,
  getCurrentInstance,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from "vue";

const UPDATE_MODEL_EVENT = "update:modelValue";
export const useDialog = (props, targetRef) => {
  const instance = getCurrentInstance()!;
  const emit = instance.emit;

  const visible = ref(false);
  const closed = ref(false);

  let openTimer: (() => void) | undefined = undefined;
  let closeTimer: (() => void) | undefined = undefined;

  const handleClose = () => {
    function hide(shouldCancel?: boolean) {
      if (shouldCancel) return;
      close();
    }
    console.log(props.beforeClose);
    if (props.beforeClose) {
      props.beforeClose(hide);
    } else {
      close();
    }
  };

  function afterEnter() {
    emit("opened");
  }

  function afterLeave() {
    emit("closed");
    emit(UPDATE_MODEL_EVENT, false);
    if (props.destroyOnClose) {
      // rendered.value = false;
    }
  }

  function beforeLeave() {
    emit("close");
  }

  const doOpen = () => {
    visible.value = true;
  };
  function open() {
    if (props.openDelayTime && props.openDelayTime > 0) {
      openTimer = setTimeout(() => {
        doOpen();
      }, props.openDelayTime) as any;
    } else {
      doOpen();
    }
  }

  const doClose = () => {
    visible.value = false;
  };

  function close() {
    if (props.closeDelayTime && props.closeDelayTime > 0) {
      closeTimer = setTimeout(() => {
        doClose();
      }, props.closeDelayTime) as any;
    } else {
      doClose();
    }
  }

  function onModalClick() {
    if (props.closeOnClickModal) {
      handleClose();
    }
  }

  function handleClickMask() {
    console.log(props.closeOnClickModal);
    if (props.closeOnClickModal) {
      handleClose();
    }
  }
  function handleStop(e) {
    e.stopPropagation();
  }

  // if (props.lockScroll) {
  //   useLockscreen(visible)
  // }

  function onCloseRequested() {
    if (props.closeOnPressEscape) {
      handleClose();
    }
  }
  const clickESC = (event) => {
    if (event.key === "Escape" || event.key === "Esc") {
      handleClose();
    }
  };
  onMounted(() => {
    if (props.modelValue) {
      visible.value = true;
      //   rendered.value = true; // enables lazy rendering
      //   open();
    }
  });

  onUnmounted(() => {
    clearTimeout(closeTimer as any);
    clearTimeout(openTimer as any);
  });
  // console.log(props.modelValue);
  watch(
    () => visible.value,
    (val) => {
      emit(UPDATE_MODEL_EVENT, val);
    }
  );
  watch(
    () => props.modelValue,
    (val) => {
      if (val) {
        closed.value = false;
        open();
        nextTick(() => {
          if (targetRef) {
            props.closeOnPressEscape &&
              document.addEventListener("keydown", clickESC);
          }
        });
      } else {
        if (visible.value) {
          props.closeOnPressEscape &&
            document.removeEventListener("keydown", clickESC, true);
          close();
        }
      }
    }
  );
  return {
    afterEnter,
    afterLeave,
    beforeLeave,
    handleClose,
    onModalClick,
    close,
    doClose,
    onCloseRequested,
    // overlayDialogStyle,
    // rendered,
    visible,
    handleClickMask,
    handleStop,
  };
};
