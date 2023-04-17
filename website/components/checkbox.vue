<template>
  <div class="container">
    <h2>checkbox组件</h2>
    <div class="box">
      <span>基础</span>
      <tp-checkBox v-model="check" @change="handleChange">checkbox</tp-checkBox>
    </div>
    <div class="box">
      <span>禁止</span>
      <tp-checkBox v-model="check02" disabled>checkbox</tp-checkBox>
    </div>
    <div class="box">
      <span>checkBox组 中间状态</span>
      <tp-checkBox
        v-model="checkAll"
        :indeterminate="isIndeterminate"
        @change="handleCheckAllChange">checkbox</tp-checkBox>
      <tp-checkBoxGroup
        v-model="list"
        @change="handleCheckedCitiesChange">
        <tp-checkBox v-for="item in showList" :key="item" :label="item">{{
          item
        }}</tp-checkBox>
      </tp-checkBoxGroup>
      <div>{{ list }}</div>
    </div>
    <div class="box">
      <span>checkBox组 带禁用的</span>
      <tp-checkBoxGroup
        v-model="list2"
        @change="handleLimit"
      >
        <tp-checkBox v-for="item in showList2" :key="item" :disabled="item ==='薯条'" :label="item">{{
          item
        }}</tp-checkBox>
      </tp-checkBoxGroup>
      <div>{{ list2 }}</div>
    </div>
    <div class="box">
      <span>checkBox组 限制选择数量</span>
      <tp-checkBoxGroup
        v-model="list1"
        :max="3"
        :min="1"
        @change="handleLimit"
      >
        <tp-checkBox v-for="item in showList1" :key="item" :label="item">{{
          item
        }}</tp-checkBox>
      </tp-checkBoxGroup>
      <div>{{ list1 }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from "vue";
export default defineComponent({
  setup() {
    let state = reactive({
      check: true,
      check02: true,
    });
    const list = ref(["上海", "深圳", "杭州"]);
    const showList = ["上海", "深圳", "杭州", "北京"];
    const checkAll = ref(false);
    const isIndeterminate = ref(true);
    const handleCheckAllChange = (val: boolean) => {
      list.value = val ? showList : [];
      isIndeterminate.value = false;
    };
    const handleCheckedCitiesChange = (value: string[]) => {
      const checkedCount = value.length;
      checkAll.value = checkedCount === showList.length;
      isIndeterminate.value =
        checkedCount > 0 && checkedCount < showList.length;
    };
    const handleChange = (e) => {
      console.log(e, "eeeeeee");
    };
    const handleLimit = (e)=> {
      console.log(e,'handleLimit');
    }

    const list1 = ref(["薯条", "汉堡", "鸡块"]);
    const showList1 = ["薯条", "汉堡", "鸡块", "可乐"];


    const list2 = ref([ "汉堡", "鸡块"]);
    const showList2 = ["薯条", "汉堡", "鸡块", "可乐"];

    return {
      ...toRefs(state),
      list,
      showList,
      isIndeterminate,
      checkAll,
      handleCheckAllChange,
      handleCheckedCitiesChange,
      handleChange,
      list1,
      showList1,
      list2,
      showList2,
      handleLimit
    };
  },
});
</script>

<style>
.container .box {
  margin-top: 15px;
}
</style>