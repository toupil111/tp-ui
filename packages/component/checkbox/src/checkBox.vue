<template>
  <div class="tp-checkbox">
    <span class="tp-checkbox__input">
      <input
        type="checkbox"
        v-model="model"
        :indeterminate="indeterminate"
        :disabled="isDisabled"
        :name="name"
        :checked="isChecked"
        @change="handChange"
        :value="label"
      />
    </span>
    <!-- 判断 -->
    <span class="tp-checkbox__label">
      <slot></slot>
    </span>
  </div>
</template>
  
  <script lang="ts">
import { defineComponent } from "vue";
import { useCheckBoxProps } from "./useCheckBoxProps";
export default defineComponent({
  name: "tp-checkBox",
  //(1) 属性复杂
  props: {
    indeterminate: Boolean, //半选
    checked: Boolean,
    name: String,
    disabled: Boolean,
    label: [String, Number, Boolean],
    modelValue: [String, Number, Boolean], //双向数据绑定
  },
  emits: ["update:modelValue", "change"], //vue3 子组件向父组件触发事件
  setup(props) {
    // console.log(props.modelValue);
    //（1）双向数据绑定
    //(2)处理属性
    // console.log({...useCheckBoxProps(props)});
    return {
      // watch computed  provide inject
      ...useCheckBoxProps(props),
    }; //{model,isChecked}
  },
});
</script>
  
  <style>
</style>