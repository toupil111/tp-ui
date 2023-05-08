<template>
  <div>
    <!-- :active-icon="Check"
      :inactive-icon="Close" -->
    <tp-switch
      v-model="value"
      active-text="1"
      inactive-text="2"
      inline-prompt
      :loading="loading1"
      :before-change="beforeChange1"
    ></tp-switch>

    <tp-switch
      v-model="value2"
      class="ml-2"
      :loading="loading2"
      :before-change="beforeChange2"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import Message from "../../packages/component/message";
export default defineComponent({
  setup() {
    const value = ref(false);

    const value1 = ref(false);
    const value2 = ref(false);
    const loading1 = ref(false);
    const loading2 = ref(false);
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

    const beforeChange2 = () => {
      loading2.value = true;
      return new Promise((_, reject) => {
        setTimeout(() => {
          loading2.value = false;
          Message({
            message: "Switch failed",
            type: "danger",
          });
          return reject(new Error("Error"));
        }, 1000);
      });
    };

    return {
      value,
      value2,
      loading1,
      loading2,
      beforeChange1,
      beforeChange2,
    };
  },
});
</script>
