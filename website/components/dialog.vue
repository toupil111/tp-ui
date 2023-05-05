<template>
  <div class="container" ref="dialogRef">
    <div>
      <tp-button type="primary" @click="open">click</tp-button>
    </div>
    <tp-dialog @open="open" :append-to-body="true" @opened="opened" @close="close" :open-delay-time="1000" :close-delay-time="1000" @closed="closed" v-model="visible" :close-on-click-modal="true" :before-close="handleClose">
      <template #header> Header slot is provided </template>
      <template #default>
        <div>default</div>
      </template>
      <template #footer>
        <tp-button type="primary" @click="open">sure</tp-button>
        <tp-button type="info" @click="cancel">cancel</tp-button>
      </template>
    </tp-dialog>
  </div>
</template>   
<script lang="ts">
import { defineComponent, nextTick, onMounted, ref, watch } from "vue";
export default defineComponent({
  setup() {
    const visible = ref(false);

    const open = () => {
      visible.value = true;
    };

    const cancel = () => {
      visible.value = false;
    };

    const v1 = ref(false);

    const v2 = ref(false);

    const open1 = () => {
      v1.value = true;
    };
    const open2 = () => {
      v2.value = true;
    };
    const handleClose = (done) => {
      done();
    };

    const opened = ()=> {
      console.log('opened');
    }
    const closed = ()=> {
      console.log('closed');
    }
    return {
      visible,
      open,
      v1,
      v2,
      open1,
      open2,
      cancel,
      handleClose,
      opened,
      close,
      closed
    };
  },
});
</script>
<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.container > div {
  margin: 20px 0;
}

.v1 .v2 {
  width: 100%;
  height: 100%;
  background-color: #ccc;
  opacity: 0.5;
}
</style>