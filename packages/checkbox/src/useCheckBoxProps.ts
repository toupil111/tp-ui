//这个属性  复杂
import { checkBoxProps, IGroupProvide } from "./checkBox.type";
import { computed, getCurrentInstance, inject } from "vue";

function useModel(props: checkBoxProps) {
  //处理 modelValue
  //通计算属性 来处理
  let { emit } = getCurrentInstance();

  //获取 父亲的数据
  let useProvide = inject<IGroupProvide>("tpCheckBoxGroup", {}); //约束的泛型

  const model = computed({
    get() {
      //获取值父亲的数据 =》判断
      // group =》 v-model
      return useProvide.modelValue
        ? useProvide.modelValue.value
        : props.modelValue;
    },
    set(val) {
      //改变通知父亲
      //事件 当前组件的实例
      //在这里触发一个事件（chang）
      if (useProvide.modelValue) {
        return useProvide.handChange(val);
      }
      emit("update:modelValue", val);
    },
  });
  return model;
}
function usecheckbox(props: checkBoxProps, model) {
  const isChecked = computed(() => {
    const value = model.value; //当前是否选中 // []
    //数组 就是group
    if (Array.isArray(value)) {
      // 添加一个value=lable  => lable 包含在v-model  input
      return value.includes(props.label);
    } else {
      //checkbox 单个使用
      return value;
    }
  });
  return isChecked;
}
function useEvent() {
  let { emit } = getCurrentInstance();
  function handChange(e) {
    const target = e.target;
    const value = target.checked ? true : false;
    // console.log("儿子")
    //通知父亲
    emit("change", value);
  }
  return handChange;
}

function isDisable(props, model) {
  let useProvide = inject<IGroupProvide>("tpCheckBoxGroup", {}); //约束的泛型

  let isChecked = usecheckbox(props, model);

  const isLimitDisabled = computed(() => {
    const max = useProvide?.max;
    const min = useProvide?.min;
    
    return (
      (max && model.value.length >= max && !isChecked.value) ||
      (min && model.value.length <= min && isChecked.value)
    );
  });
  
  const isDisabled = computed(
    () => props?.disabled || isLimitDisabled.value
  );
    
  return {
    isDisabled,
    isLimitDisabled,
  };
}
export const useCheckBoxProps = (props: checkBoxProps) => {
  //(1) modelValue =>父亲的数据改变，儿子改变（儿子和父亲的数据一直）
  let model = useModel(props);

  // (2）是否选中状态
  let isChecked = usecheckbox(props, model);
  // (3) 触发事件
  let handChange = useEvent();

  let { isDisabled, isLimitDisabled } = isDisable(props, model);
  return {
    model,
    isChecked,
    handChange,
    isDisabled,
    isLimitDisabled,
  };
};
