import { computed } from "vue";

export const useComponentData = (props) => {
  // 左边的数据

  //1 获取到key
  let propKey = computed(() => props.props.key);

  //2把数组变成对象  []=>{}   {}=[]
  const data = computed(() => {
    //[{key:1},{key:2}]
    return props.data.reduce((memo, cur) => {
      memo[cur[propKey.value]] = cur;
      return memo; //返回值
    }, {});
  });
  
  //3 将数据分 左右
  const sourceData = computed(() => {
    //就是  modelValue =[1,4]
    return props.data.filter(
      (item) => !props.modelValue.includes(item[propKey.value])
    );
  });
  //   console.log(sourceData.value)
  //右边的数据
  const targetData = computed(() => {
    //就是  modelValue =[1,4]
    return props.data.filter((item) =>
      props.modelValue.includes(item[propKey.value])
    );
  });

  return {
    propKey,
    sourceData,
    targetData,
  };
};
