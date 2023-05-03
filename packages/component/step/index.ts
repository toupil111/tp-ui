import Step from './src/step.vue'//
import {App} from 'vue'

(Step as any).install =(app:App)=>{
   app.component(Step.name, Step); Step
}

//暴露出去
export default Step

