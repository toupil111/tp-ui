//这个是每个组件中的入口文件

import ButtonGroup from "../button/src/button-group.vue"; //导出组件  问题 他是.vue文件类型  解决ts中的文件类型
import { App } from "vue";

//  let app =  crateApp(())   app.use(Button)
//

ButtonGroup.install = (app: App) => {
  //注册组件

  app.component(ButtonGroup.name, ButtonGroup);
};

//暴露出去
export default ButtonGroup;

//x
