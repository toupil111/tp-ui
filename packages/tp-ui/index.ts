// //进行整合
import Button from "@tp-ui/component/button";
import Icon from "@tp-ui/component/icon";
import ButtonGroup from "@tp-ui/component/button-group";
import Row from '@tp-ui/component/row'
import Col from '@tp-ui/component/col'
import CheckBox from '@tp-ui/component/checkbox'
import CheckboxGroup from '@tp-ui/component/checkbox-group'
import Transfer from '@tp-ui/component/transfer'
import Dialog from '@tp-ui/component/dialog'
import Step from '@tp-ui/component/step'
import Steps from '@tp-ui/component/steps'
import Switch from '@tp-ui/component/switch'
import Input from '@tp-ui/component/input'
import Skeleton from '@tp-ui/component/skeleton'
import SkeletonItem from '@tp-ui/component/skeleton-item'
import Tag from '@tp-ui/component/Tag'


import { App } from "vue";
// 创建一个组件
// import { Dialog } from '@tp-ui/component/index'
  // console.log(Dialog);
const components = [
  //全部引入
  Button,
  Icon,
  ButtonGroup,
  Row, 
  Col,
  CheckBox,
  CheckboxGroup,
  Transfer,
  Dialog,
  Step,
  Steps,
  Switch,
  Input,
  Skeleton,
  SkeletonItem,
  Tag
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
