import { createRouter, createWebHashHistory } from "vue-router";

import button from "../components/button.vue";
import layout from "../components/layout.vue";
import checkbox from "../components/checkbox.vue";
import transfer from "../components/transfer.vue";
import message from "../components/message.vue";
import dialog from "../components/dialog.vue";
import steps from "../components/steps.vue";
import Switch from "../components/switch.vue";
import Input from "../components/input.vue";
import Skeleton from "../components/skeleton.vue";
import Main from "../components/main.vue";
import Tag from "../components/tag.vue";
import App from "../App.vue";

const routes = [
  {
    path: "/",
    name: "App",
    component: App,
    redirect: "/main",
  },
  {
    path: "/button",
    name: "Button",
    component: button,
  },
  {
    path: "/layout",
    name: "layout",
    component: layout,
  },
  {
    path: "/checkbox",
    name: "checkbox",
    component: checkbox,
  },
  {
    path: "/transfer",
    name: "transfer",
    component: transfer,
  },
  {
    path: "/message",
    name: "message",
    component: message,
  },
  {
    path: "/dialog",
    name: "Dialog",
    component: dialog,
  },
  {
    path: "/steps",
    name: "Steps",
    component: steps,
  },
  {
    path: "/switch",
    name: "Switch",
    component: Switch,
  },
  {
    path: "/input",
    name: "Input",
    component: Input,
  },
  {
    path: "/skeleton",
    name: "Input",
    component: Skeleton,
  },
  {
    path: "/tag",
    name: "Tag",
    component: Tag,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});
export default router;
