<template>
  <div class="container">
    <!-- TODO:需要处理message消失后该节点删除掉 -->
    <div>
      <div>各种类型的</div>
      <tp-button type="primary" @click="ClickChange1">确定</tp-button>
      <tp-button type="success" @click="ClickChange2">警告</tp-button>
      <tp-button type="info" @click="ClickChange3">info</tp-button>
      <tp-button type="danger" @click="ClickChange4">文本</tp-button>
    </div>
    <div>
      <div>可关闭的</div>
      <tp-button type="primary" @click="ClickChange_showClose">可关闭的</tp-button>
    </div>
    <div>
      <div>信息合并的</div>
      <tp-button @click="ClickGroup">组合</tp-button>
    </div>
    <div>
      <div>信息合并的且可关闭</div>
      <tp-button type="primary" @click="ClickChange5">click</tp-button>
    </div>
    <div style="color: gray;"> tips:鼠标在提示框里面它会一直停留</div>
  </div>
</template>
<script>
import { defineComponent,ref } from "vue";
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
    const ClickChange5 = () => {
      Message({
        message: "你好同学",
        showClose: true,
        type: "danger",
        grouping: true
      });
    }
    const ClickChange_showClose = () => {
      Message({
        message: "你好同学",
        type: "danger",
        showClose: true
      });
    };

    const ClickGroup = () => {
      Message({
        message: "123",
        grouping: true
      })
    }
    return {
      ClickChange1,
      ClickChange2,
      ClickChange3,
      ClickChange4,
      ClickChange5,
      ClickChange_showClose,
      ClickGroup,
    };
  },
});
</script>
  <style lang="scss" scoped>
    .container {
      display: flex;
      flex-direction: column;
    }
    .container > div {
      margin: 20px 0;
    }
  </style>