<template>
  <div>
    <tp-button type="primary" @click="handle()">确定</tp-button>
    <tp-button type="danger">警告</tp-button>
    <tp-button type="info">info</tp-button>
    <tp-button type="text">文本</tp-button>
    <tp-button disabled>禁用</tp-button>
    <tp-button round>圆角按钮</tp-button>
    <tp-button loading icon="tp-icon-Loading">加载</tp-button>
    <tp-button icon="tp-icon-jimu"></tp-button>
    <tp-button icon="tp-icon-bolanggu"></tp-button>

    <div>按钮组</div>
    <tp-button-group>
      <tp-button type="primary">Previous Page</tp-button>
      <tp-button type="primary">
        Next Page
        <!-- <i class="el-icon-arrow-right x-icon-right"></i> -->
      </tp-button>
    </tp-button-group>
  </div>
</template>
 <script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const handle = () => {
      console.log(1111111);
    };
    return {
      handle,
    };
  },
});
</script>
