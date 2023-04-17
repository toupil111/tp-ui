//这个是每个组件中的入口文件

import Checkbox from "./src/checkBox.vue"; //导出组件  问题 他是.vue文件类型  解决ts中的文件类型
import { App } from "vue";

//

//注册组件 vue3  vue.use(Button)    vuex  install

//  let app =  crateApp(())   app.use(Button)
//

Checkbox.install = (app: App) => {
  //注册组件
  app.component(Checkbox.name, Checkbox);
};

//暴露出去
export default Checkbox;

