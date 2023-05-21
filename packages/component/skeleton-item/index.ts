import SkeletonItem from "./src/skeleton-item.vue"; //
import { App } from "vue";

(SkeletonItem as any).install = (app: App) => {
  app.component(SkeletonItem.name, SkeletonItem);
};

//暴露出去
export default SkeletonItem;
