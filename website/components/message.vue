<template>
  <div>
    <tp-button type="primary" @click="ClickChange1">确定</tp-button>
    <tp-button type="success" @click="ClickChange2">警告</tp-button>
    <tp-button type="info" @click="ClickChange3">info</tp-button>
    <tp-button type="danger"  @click="ClickChange4">文本</tp-button>
    <tp-button @click="ClickGroup">组合</tp-button>
  </div>
</template>
   <script>
import { defineComponent } from "vue";
//引入 message
import Message from "../../packages/message";
export default defineComponent({
  setup() {
    const ClickChange1 = () => {
      Message({
        message: "你好同学",
        type: "primary",
      });
    };
    const ClickChange2 = () => {
      Message({
        message: "你好同学",
        type: "success",
      });
    };
    const ClickChange3 = () => {
      Message({
        message: "你好同学",
        type: "info",
      });
    };
    const ClickChange4 = () => {
      Message({
        message: "你好同学",
        type: "danger",
      });
    };
    const ClickGroup = ()=> {
        Message({
          message:"123",
          grouping:true
        })
    }
    return {
      ClickChange1,
      ClickChange2,
      ClickChange3,
      ClickChange4,
      ClickGroup
    };
  },
});
</script>
  