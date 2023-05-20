<template>
  <div class="tp-transfer">
    <!-- 布局：组件化：-->
    <tp-transferItem
      :data="sourceData"
      :props="props"
      @checkChange="sourceCheckChange"
    ></tp-transferItem>
    <div class="tp-transfer__buttons">
      <tp-button @click="leftClick" :disabled="rightState.length === 0">{{
        `<`
      }}</tp-button>
      <tp-button @click="rightClick" :disabled="leftState.length === 0">{{
        `>`
      }}</tp-button>
    </div>
    <tp-transferItem
      :data="targetData"
      :props="props"
      @checkChange="targetCheckChange"
    ></tp-transferItem>
  </div>
</template>

<script>
import { defineComponent, PropType,reactive,toRefs } from "vue";
import tpTransferItem from "./transferItem.vue";
import tpbutton from "@tp-ui/component/button";
import { propsToAttrMap } from "@vue/shared";
import { ItransferProps } from './transfer.type.ts'
import { useComponentData } from './useComponentData.ts'

export default defineComponent({
  //处理属性
  name: "tp-transfer",
  components: {
    tpTransferItem,
    tpbutton
  },
  props:{
    data:{
        type: Array
    },
    props:{ //别名
         type:Object
    },
     modelValue:{
         type:Array
     }
  },
  emits:["update:modelValue"],
  setup(props,{emit}){
              //获取左右列表中选中的数据
        let checkState = reactive({ //保存 选中数据
            leftState:[],
            rightState:[] //[1]
        })
        const sourceCheckChange =(leftValue)=>{
             checkState.leftState = leftValue
        }
        const targetCheckChange =(rightValue)=>{
             checkState.rightState = rightValue
        }
        //实现穿梭
        const leftClick =()=>{ //右边的数据给左边
            //获取到右边的数据
            let currentValue = props.modelValue.slice(0) // [1,4]
            // 选中的有，就删除
            checkState.rightState.forEach(item=>{
               let index = currentValue.indexOf(item) // -1
               if(index>-1){
                 currentValue.splice(index,1)
               }
            })
            console.log(currentValue,'leftClick');
              //通知父亲
            emit("update:modelValue",currentValue)
            
        }
        //左边到右边
         const rightClick=()=>{
            let currentValue = props.modelValue.slice(0) // [1,4]
           //合并
            currentValue = currentValue.concat(checkState.leftState)
            console.log(currentValue,'rightClick');
            emit("update:modelValue",currentValue)
        }
       //问题：data =>分为左右  =》 modelValue [1,4]  =>key
       let { propsKey, sourceData, targetData } = useComponentData(props)

       return {
           propsKey,
           sourceData,
           targetData,
           sourceCheckChange,
           targetCheckChange,
           ...toRefs(checkState),
           leftClick,
           rightClick
       }
  }
  //处理核心属性 modelValue ,data,props
});

// 写ui 组件库  =》   vue3  组件传值 slot

//样式
</script>
