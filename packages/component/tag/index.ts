import Tag from "./src/tag.vue"; //
import { App } from "vue";

console.log(Tag.name,'Tag.nameTag.name');
(Tag as any).install = (app: App) => {
  app.component(Tag.name, Tag);
};

//暴露出去
export default Tag;
