/*
 * @Author: liangweibin
 * @Date: 2023-05-05 16:22:40
 * @LastEditors: liangweibin
 * @LastEditTime: 2023-05-05 17:14:12
 * @Description: 
 */
import Switch from './src/switch.vue'//
import {App} from 'vue'

(Switch as any).install =(app:App)=>{
   app.component(Switch.name, Switch); Switch
}

//暴露出去
export default Switch

