<template>
  <div>
    <!-- :active-icon="Check"
      :inactive-icon="Close" -->
    <tp-switch
      v-model="value"
      :active-value="'1'"
      :inactive-value="'2'"
      active-text="1"
      inactive-text="2"
      inline-prompt
      :loading="loading1"
      :before-change="beforeChange1"
    ></tp-switch>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import Message from "../../packages/component/message";
export default defineComponent({
  setup() {
    const value = ref("2");
    const beforeChange1 = () => {
      loading1.value = true;
      return new Promise((resolve) => {
        setTimeout(() => {
          loading1.value = false;
          Message({
            message: "Switch success",
            type: "success",
          });
          return resolve(true);
        }, 1000);
      });
    };

    const loading1 = ref(false);
    return {
      value,
      loading1,
      beforeChange1
    };
  },
});
</script>
