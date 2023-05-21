import Skeleton from './src/skeleton.vue'//
import {App} from 'vue'

(Skeleton as any).install =(app:App)=>{
   app.component(Skeleton.name, Skeleton); 
}

//暴露出去
export default Skeleton
