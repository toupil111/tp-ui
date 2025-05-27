<template>
  <tp-tag :typeClass="'primary'">21342134</tp-tag>
  <tp-tag :typeClass="'info'">21342134</tp-tag>
  <tp-tag :typeClass="'success'">21342134</tp-tag>
  <tp-tag closeable :typeClass="'danger'">21342134</tp-tag>
  <br />
  <br />
  <br />
  <br />
  <br />

  动态编辑
  <tp-tag
    v-for="tag in dynamicTags"
    :key="tag"
    closeable
    class="m-l-5"
    :disable-transitions="false"
    @close="handleClose(tag)"
  >
    {{ tag }}
  </tp-tag>
  <tp-input
    v-if="inputVisible"
    ref="InputRef"
    v-model="inputValue"
    class="input-edit m-l-5"
    @blur="handleInputConfirm"
  />
  <tp-button
    v-else
    class="button-new-tag m-l-5"
    @click="showInput"
  >
    + New Tag
  </tp-button>
</template>
  <script>
import { defineComponent, ref, nextTick } from "vue";
//引入 message
export default defineComponent({
  setup() {
    const inputValue = ref("");
    const inputVisible = ref(false);
    const InputRef = ref(null);
    const dynamicTags = ref(["Tag 1", "Tag 2", "Tag 3"]);
    const handleClose = (tag) => {
      dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1);
    };


    const showInput = () => {
      inputVisible.value = true;
      nextTick(() => {
        if (InputRef.value && InputRef.value.input) {
          InputRef.value.input.focus();
        }
      });
    };

    const handleInputConfirm = (event) => {
      inputValue.value = event.target.value
      console.log('Confirming input:', inputValue.value);
      if (inputValue.value && inputValue.value.trim()) {
        const newTag = inputValue.value.trim();
        if (!dynamicTags.value.includes(newTag)) {
          dynamicTags.value.push(newTag);
        }
      }
      inputVisible.value = false;
      inputValue.value = "";
    };
    return {
      dynamicTags,
      inputValue,
      InputRef,
      inputVisible,
      handleInputConfirm,
      showInput,
      handleClose,
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
.button-new-tag {
  box-sizing: content-box;
  min-height: 24px !important;
  width: 60px !important;
  font-size: 12px;
}
.m-l-5 {
  margin-left: 5px;
}
.input-edit {
  width: 60px;
  height: 24px;
}
</style>