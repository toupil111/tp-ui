<template>
  <div class="tp-transfer-item">
    <div class="tp-transfer-item__header">
      <tp-checkBox
        v-model="allCheck"
        :indeterminate="indeterminate"
        :disabled="allCheckDisabled"
        @change="handleChange"
        >全选/半选</tp-checkBox
      >
    </div>
    <!-- 布局：组件化：-->
    <div class="tp-transfer-item__body">
      <tp-chectBoxGroup class="tp-transfer-item__body--list" v-model="checked">
        <tp-checkBox
          v-for="item in data"
          :key="item[keyProps]"
          :label="item[keyProps]"
          :disabled="item[disabledPorps]"
          >{{ item[keyProps] }}</tp-checkBox
        >
      </tp-chectBoxGroup>
    </div>
  </div>
</template>

<script>
import { defineComponent, toRefs, reactive } from "vue";
import tpCheckBox from "@tp-ui/checkbox";
import tpChectBoxGroup from "@tp-ui/checkbox-group";
import { useCheck } from "./useCheck.ts";
export default defineComponent({
  components: {
    tpCheckBox,
    tpChectBoxGroup,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    props: {
      type: Object,
    },
  },
  emits: ["checkChange"],
  setup(props) {
    //注意 （1）处理数据
    const state = reactive({
      indeterminate: false,
      checked: [],
      allCheck: false, //是否全选
      allCheckDisabled: false,
    });
    //(2)展示数据
    let { labelProps, keyProps, disabledPorps, handleChange } = useCheck(
      props,
      state
    );
    return {
      ...toRefs(state),
      labelProps,
      keyProps,
      disabledPorps,
      handleChange,
    };
  },
});
</script>

