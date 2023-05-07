//这个是每个组件中的入口文件

import Dialog from "./src/tp-dialog.vue"; //导出组件  问题 他是.vue文件类型  解决ts中的文件类型
import { App } from "vue";


Dialog.install = (app: App) => {
  //注册组件
  app.component(Dialog.name, Dialog);
};

//暴露出去
export default Dialog;

//x
