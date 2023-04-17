//处理解析  ts 中的声明文件  （vue）

declare module "*.vue"{
    //所有的 通过 ts  from 'xxx.vue'  
    import {defineComponent,App} from 'vue'
    const component:  ReturnType <typeof defineComponent>&{
        install(app:App):void
    }

    //导出组件

    export default component
}
