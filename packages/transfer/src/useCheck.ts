import { key } from './transfer.type';
import { computed, watch, getCurrentInstance } from "vue";
export const useCheck = (props, state) => {
  let { emit } = getCurrentInstance();

  //变成响应式
  const labelProps = computed(() => props.props.label);
  const keyProps = computed(() => props.props.key);
  const disabledPorps = computed(() => props.props.disabled);
  //处理全选和反选
  //  （1）不要disbaled且获取到key
  const checkNotDisable = computed(() => {
    return props.data.filter((item) => !item[disabledPorps.value]);
  });

  //事件
  const handleChange = (val) => {
    state.allCheck = val 
    state.checked = val
      ? checkNotDisable.value.map((item) => {
          return item[keyProps.value];
        })
      : [];
      //右-》左后取消勾选
  };
  // watch
  watch(() => state.checked, () => {
    //1 获取到所有 key
    let checkeys = checkNotDisable.value.map(item => item[keyProps.value]) //获取key

    // 这里真的很神奇，中间那个判断是为了解决 在 indeterminate和allCheck同时为true的时候只显示半选
    state.indeterminate = checkeys.length > 0 && (checkNotDisable.value.length !== state.checked.length) && (state.checked.length > 0)
    
    state.allCheck = checkeys.length > 0 && checkeys.every(key => state.checked.includes(key))
    //触发一个事件 通知父亲
    emit("checkChange",state.checked)
  })
  watch(()=> props.data ,()=>{
    state.allCheckDisabled = props.data.every(item=> item.disabled)
    const checked = [];
    state.checked = checked;
  })
  return {
    labelProps,
    keyProps,
    disabledPorps,
    handleChange,
  };
};
