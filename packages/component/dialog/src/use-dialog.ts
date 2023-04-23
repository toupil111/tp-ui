import {
  computed,
  getCurrentInstance,
  nextTick,
  onMounted,
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

  const overlayDialogStyle = computed(() => {
    if (props.alignCenter) {
      return { display: "flex" };
    }
    return {};
  });

  const close = () => {
    visible.value = false;
  };
  const handleClose = () => {
    // let done = () => {
    //   close();
    // };
    // emit("beforeClose", done);
    function hide(shouldCancel?: boolean) {
      if (shouldCancel) return;
      closed.value = true;
      visible.value = false;
    }
    if (props.beforeClose) {
      emit("beforeClose", hide);
    } else {
      close();
    }
  };

  function afterEnter() {
    emit("opened");
  }

  //   function afterLeave() {
  //     emit("closed");
  //     emit(UPDATE_MODEL_EVENT, false);
  //     if (props.destroyOnClose) {
  //       rendered.value = false;
  //     }
  //   }

  function beforeLeave() {
    emit("close");
  }

  function open() {
    // closeTimer?.()
    // openTimer?.()

    // if (props.openDelay && props.openDelay > 0) {
    //   ;({ stop: openTimer } = useTimeoutFn(() => doOpen(), props.openDelay))
    // } else {
    //   doOpen()
    // }
    visible.value = true;
  }

  // function close() {
  //   openTimer?.()
  //   closeTimer?.()

  //   if (props.closeDelay && props.closeDelay > 0) {
  //     ;({ stop: closeTimer } = useTimeoutFn(() => doClose(), props.closeDelay))
  //   } else {
  //     doClose()
  //   }
  // }

  //   function handleClose() {
  //     function hide(shouldCancel?: boolean) {
  //       if (shouldCancel) return;
  //       closed.value = true;
  //       visible.value = false;
  //     }

  //     if (props.beforeClose) {
  //       props.beforeClose(hide);
  //     } else {
  //       close();
  //     }
  //   }

  function onModalClick() {
    if (props.closeOnClickModal) {
      handleClose();
    }
  }

  // function doOpen() {
  //   if (!isClient) return
  //   visible.value = true
  // }

  function doClose() {
    visible.value = false;
  }

  function onOpenAutoFocus() {
    emit("openAutoFocus");
  }

  function onCloseAutoFocus() {
    emit("closeAutoFocus");
  }

  function onFocusoutPrevented(event: CustomEvent) {
    if (event.detail?.focusReason === "pointer") {
      event.preventDefault();
    }
  }

  // if (props.lockScroll) {
  //   useLockscreen(visible)
  // }

  function onCloseRequested() {
    if (props.closeOnPressEscape) {
      handleClose();
    }
  }

  onMounted(() => {
    if (props.modelValue) {
      visible.value = true;
      //   rendered.value = true; // enables lazy rendering
      //   open();
      // console.log(targetRef,'targetRef');
    }
  });

  watch(
    () => props.modelValue,
    (val) => {
      if (val) {
        closed.value = false;
        open();
        nextTick(() => {
          // emit("open");
          if (targetRef) {
            console.log(targetRef);
          }
        });
      } else {
        if (visible.value) {
          close();
        }
      }
    }
  );
  return {
    afterEnter,
    // afterLeave,
    beforeLeave,
    handleClose,
    onModalClick,
    close,
    doClose,
    onOpenAutoFocus,
    onCloseAutoFocus,
    onCloseRequested,
    onFocusoutPrevented,
    overlayDialogStyle,
    // rendered,
    visible,
  };
};
