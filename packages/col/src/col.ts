// 自定义  标签
import { defineComponent, h, computed, inject } from "vue";

export default defineComponent({
  name: "tp-col",
  //用户属性  tag
  props: {
    tag: {
      type: String,
      default: "div",
    },
    span: {
      type: Number,
      default: 24,
    },
    offset: {
      type: Number,
      default: 0,
    },
  },
  setup(props, ctx) {
    console.log(ctx);
    //我们已经定好属性  通过计算属性  tp-col-span - 5   tp-col-offset - 5
    //获取数据
    const gutter = inject("tp-row", 0);

    const class_props = computed(() => {
      let ret = [];
      const pops = ["span", "offset"] as const;
      pops.forEach((item) => {
        const size = props[item];
        if (typeof size == "number" && size > 0) {
          ret.push(`tp-col-${item}-${size}`);
        }
      });

      return ["tp-col", ...ret];
    });
    //gutter 处理
    const styles = computed(() => {
      if (gutter !== 0) {
        return {
          paddingLeft: gutter / 2 + "px",
          paddingRight: gutter / 2 + "px",
        };
      }
      return {};
    });
    return () =>
      h(
        props.tag,
        {
          class: class_props.value,
          style: styles.value,
        },
        ctx.slots.default?.()
      ); // ts链式判断运算符 ctx.slots.defalut&& ctx.slots.defalut（）
  },
});
