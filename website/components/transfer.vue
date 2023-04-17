<template>
  <div>
    <h2>transfer组件</h2>
    <tp-transfer
      v-model="rightValue"
      :data="transferDate"
      :props="transferProps"
    ></tp-transfer>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, toRefs } from "vue";
export default defineComponent({
  setup() {
    const generateData = () => {
      //数据源
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: i,
          disabled: i % 4 === 0,
        });
      }
      return ref(data); // 响应数据
    };
    const rightValue = ref([1,4])
    return {
      transferDate: generateData(),
      rightValue,
      transferProps: {
        //指定属性
        key: "key",
        label: "label",
        disabled: "disabled",
      },
    };
  },
});
</script>

<style>
</style>