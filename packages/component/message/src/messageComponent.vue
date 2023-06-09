<template>
  <!-- 添加动画：进来和出去要有效果 -->
  <transition name="tp-message-fade" @before-leave="onClose" @after-leave="onDestroy">
    <div class="tp-message" v-show="show" :class="class_props" :style="offset_props" :id="id" @mouseenter="clearTime"
      @mouseleave="startTime">
      {{ message }}
      <span v-if="repeatNum > 1">{{ repeatNum }}</span>
      <span v-if="showClose" @click="close">X</span>
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
} from "vue";
import { Itype } from "./message.type";
import { getLastOffset, getOffsetOrSpace } from "./instances";

const EVENT_CODE = {
  esc: 'Escape',
}
export default defineComponent({
  props: {
    //重新写一边
    id: { type: String, default: "" },
    message: { type: [String, Object], default: "" },
    type: { type: String as PropType<Itype>, default: "success" }, //如果你想要属性有提示  就用PropType 作用检测 类型，提示作用
    duration: { type: Number, default: 2000 },
    center: { type: String, default: "" },
    onClose: { type: Function as PropType<() => void> },
    offset: { type: Number, default: 20 },
    showClose: { type: Boolean, default: false },
    repeatNum: { type: Number, default: 0 },
    grouping: { type: Boolean, default: false },
    onDestroy: { type: Function as PropType<() => void> },
  },
  expose: ["show", "close", "repeatNum"],
  setup(props) {
    //过度效果
    const show = ref(false);
    //当组件加载完毕之后出现动画效果
    let timer = null;
    //消息：定时器
    const startTime = () => {
      timer = setTimeout(() => {
        show.value = false;
      }, props.duration); //时间是动态的
    };
    const clearTime = () => {
      clearTimeout(timer);
    };

    const class_props = computed(() => [
      "tp-message",
      //修饰动态的样式
      "tp-message--" + props.type,
      props.center ? "is-center" : "",
    ]);
    const repeatNum = ref(0)
    const close = () => {
      show.value = false;
      clearTime();
    };
    // 从props传过去的repeatNum不更新 没测出来，
    props.grouping && watch(
      () => repeatNum.value,
      () => {
        clearTime();
        startTime();
      }
    );
    const lastOffset = computed(() => getLastOffset(props.id));
    const offset = computed(
      () => getOffsetOrSpace(props.id, props.offset) + lastOffset.value
    );
    const offset_props = computed(() => [`top: ${offset.value}px;`]);
    onMounted(() => {
      startTime();
      show.value = true;
    });

    //当组件摧毁的时候清除定时去
    onUnmounted(() => {
      clearTime();
    });

    return {
      show,
      class_props,
      message: props.message,
      offset_props,
      id: props.id,
      showClose: props.showClose,
      close,
      startTime,
      clearTime,
      repeatNum
    };
  },
});
</script>