import { createRouter, createWebHashHistory } from "vue-router";

import button from "../components/button.vue";
import layout from "../components/layout.vue";
import checkbox from "../components/checkbox.vue";
import transfer from "../components/transfer.vue";
import message from '../components/message.vue'

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
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});
export default router;
