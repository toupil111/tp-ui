<!-- 学到了一个witdh：unset的属性 -->
<template>
  <div :class="['tp-skeleton', animated ? 'is-animated' : '']">
    <template v-for="item in count" :key="item">
      <slot v-if="loading" name="template">
        <tp-skeleton-item variant="p" class="is-first"></tp-skeleton-item>
        <tp-skeleton-item
          v-for="(i, idx) in rows"
          variant="p"
          :key="idx"
          :class="[idx == rows - 1 && rows > 1 ? 'is-last' : '']"
        ></tp-skeleton-item>
      </slot>
    </template>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "tp-skeleton",
  props: {
    animated: {
      type: Boolean,
      default: false,
    },
    count: {
      type: Number,
      default: 1,
    },
    rows: {
      type: Number,
      default: 3,
    },
    loading: {
      type: Boolean,
      default: true,
    },
    throttle: {
      type: Number,
    },
  },
  setup(props, {}) {},
});
</script>
