import { defineComponent, h, computed, provide } from "vue";

export default defineComponent({
  name: "tp-row",
  //用户属性  tag
  props: {
    tag: {
      type: String,
      default: "div",
    },
    gutter: {
      type: Number,
      default: 0,
    },
    justify: {
      tyle: String,
      default: "start",
    },
  },
  setup(props, ctx) {
    //父组件中提供数据 provide  子组件中使用
    provide("tp-row", props.gutter);
    console.log(ctx, 555);

    const class_prop = computed(() => [
      "tp-row",
      //justify
      props.justify !== "start" ? `is-${props.justify}` : "",
    ]);
    //解决gutter 给开头和结尾元素和容器对其                                                                                                                        
    const styles = computed(() => {
      let ret = {
        marginLeft: "",
        marginRight: "",
      };
      //判断一下
      if (props.gutter) {
        ret.marginLeft = ret.marginRight = `-${props.gutter / 2}px`;
      }
      return ret;
    });
    
    return () =>
      h(
        props.tag,
        {
          class: class_prop.value,
          style: styles.value,
        },
        ctx.slots.default?.()
      ); // ts链式判断运算符 ctx.slots.defalut&& ctx.slots.defalut（）
  },
});
