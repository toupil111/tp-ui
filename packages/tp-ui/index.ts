//进行整合
import Button from "@tp-ui/button";
import Icon from "@tp-ui/icon";
import ButtonGroup from "@tp-ui/button-group";
import Row from '@tp-ui/row'
import Col from '@tp-ui/col'
import CheckBox from '@tp-ui/checkbox'
import CheckboxGroup from '@tp-ui/checkbox-group'
import Transfer from '@tp-ui/transfer'

import { App } from "vue";
// 创建一个组件


const components = [
  //全部引入
  Button,
  Icon,
  ButtonGroup,
  Row,
  Col,
  CheckBox,
  CheckboxGroup,
  Transfer
];
//全局动态添加组件

const install = (app: App) => {
  components.forEach((componen) => {
    app.component(componen.name, componen);
  });
};
//全局注册  use.(tp-ui)  install

export default {
  install,
};
