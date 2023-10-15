<template>
  <div class="main-margin">
    <tp-button type="primary" @click="handle('button')">按钮</tp-button>
    <tp-button type="danger" @click="handle('layout')">布局</tp-button>
    <tp-button type="info" @click="handle('checkbox')">checkbox</tp-button>
    <tp-button type="text" @click="handle('transfer')">穿梭框</tp-button>
    <tp-button type="text" @click="handle('message')">提示框</tp-button>
    <tp-button type="text" @click="handle('dialog')">对话框</tp-button>
    <tp-button type="text" @click="handle('steps')">步骤条</tp-button>
    <tp-button type="text" @click="handle('switch')">switch</tp-button>
    <tp-button type="text" @click="handle('input')">输入框</tp-button>
    <tp-button type="text" @click="handle('skeleton')">骨架屏</tp-button>
  </div>
</template>
   <script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const router = useRouter();
    const handle = (path) => {
      router.push({ path });
    };
    return {
      handle,
    };
  },
});
</script>
<style lang="scss" scoped>

.main-margin{
  margin-bottom: 10px;
}
</style>