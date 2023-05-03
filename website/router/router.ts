
import { createRouter, createWebHashHistory } from "vue-router";

import button from "../components/button.vue";
import layout from "../components/layout.vue";
import checkbox from "../components/checkbox.vue";
import transfer from "../components/transfer.vue";
import message from '../components/message.vue'
import dialog from '../components/dialog.vue'
import steps from '../components/steps.vue'

const routes = [
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
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});
export default router;
