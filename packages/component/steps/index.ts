import Steps from './src/steps.vue'//
import {App} from 'vue'

(Steps as any).install =(app:App)=>{
   app.component(Steps.name, Steps); Steps
}

//暴露出去
export default Steps

