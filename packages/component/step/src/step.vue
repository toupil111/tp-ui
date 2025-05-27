<template>
  <div :style="props_class" :class="['tp-step','is-'+ parent.props.direction]">
    <div :class="['tp-step__line','is-'+`${currentStatus}`]">
      <i :class="'tp-step__line-inner'"></i>
    </div>
    <div :class="['tp-step__icon','is-text','is-'+`${currentStatus}`]">
      <div class="tp-step__icon-inner">{{ index + 1 }}</div>
    </div>
    <div class="tp-step__main">
      <div v-if="description" :class="['tp-step__description','is-'+`${currentStatus}`]">{{ description }}</div>
      <div v-if="title" :class="['tp-step__title','is-'+`${currentStatus}`]">{{ title }}</div>
      <div v-if="icon" :class="['tp-step__icon','is-'+`${currentStatus}`]">{{ icon }}</div>
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
  reactive,
  inject,
  Ref,
  getCurrentInstance,
  onBeforeUnmount,
} from "vue";
export interface IStepsProps {
  space: number | string;
  active: number;
  direction: string;
  alignCenter: boolean;
  simple: boolean;
  finishStatus: string;
  processStatus: string;
}
export interface StepItemState {
  uid: number | undefined;
  currentStatus: string;
  setIndex: (val: number) => void;
  calcProgress: (status: string) => void;
}

export interface IStepsInject {
  props: IStepsProps;
  steps: Ref<StepItemState[]>;
}

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
    const parent = inject("tpSteps") as any;
    const internalStatus = ref("");
    const prevStatus = computed(() => {
      const prevStep = parent.steps.value[index.value - 1];
      return prevStep ? prevStep.currentStatus : "wait";
    });
    console.log(parent, "parent");
    const currentInstance = getCurrentInstance();
    console.log(currentInstance,'currentInstance');
    
    onBeforeUnmount(() => {
      parent.steps.value = parent.steps.value.filter(
        (instance) => instance.uid !== currentInstance?.uid
      );
    });
    const index = ref(-1);
    onMounted(() => {
      watch(
        [
          () => parent.props.active,
          () => parent.props.processStatus,
          () => parent.props.finishStatus,
        ],
        ([active]) => {
          updateStatus(active);
        },
        { immediate: true }
      );
    });
    const updateStatus = (activeIndex: number) => {
      if (activeIndex > index.value) {
        internalStatus.value = parent.props.finishStatus;
      } else if (activeIndex === index.value && prevStatus.value !== "error") {
        internalStatus.value = parent.props.processStatus;
      } else {
        internalStatus.value = "wait";
      }
      const prevChild = parent.steps.value[index.value - 1];
      if (prevChild) prevChild.calcProgress(internalStatus.value);
    };
    const props_class = computed(() => {
      return props.status;
    });
    const currentStatus = computed(() => {
      return props.status || internalStatus.value;
    });
    const setIndex = (val: number) => {
      index.value = val;
    };
    const calcProgress = (status: string) => {
      const isWait = status === "wait";
      const style: any = {
        transitionDelay: `${isWait ? "-" : ""}${150 * index.value}ms`,
      };
      const step = status === parent.props.processStatus || isWait ? 0 : 100;

      // style.borderWidth = step && !isSimple.value ? "1px" : 0;
      style[
        parent.props.direction === "vertical" ? "height" : "width"
      ] = `${step}%`;
      // lineStyle.value = style;
    };
     console.log(currentStatus,'currentStatus');
     
    const stepItemState = reactive({
      uid: computed(() => currentInstance?.uid),
      currentStatus,
      setIndex,
      calcProgress,
    });

    parent.steps.value = [...parent.steps.value, stepItemState];
    return {
      props_class,
      index,
      currentStatus,
      parent
    };
  },
});
</script>
