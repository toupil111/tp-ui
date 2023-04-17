<template>
    <!-- <teleport to="body"> -->
        <!-- <transition name="dialog-fade"> -->
            <div class="container" v-show="visible" v-bind="$attrs">
                <!-- {{ title }} -->
                <div >{{ slots.title }}</div>
                <div>
                    <template >
                        <slot v-if="!slots.title" name="header" />
                        <slot v-else name="title" />
                    </template>
                    <slot />
                    <template v-if="slots.footer">
                        <slot name="footer" />
                    </template>
                </div>
            </div>
        <!-- </transition> -->
    <!-- </teleport> -->
</template>
<script lang="ts" setup>

import {
    computed, provide, ref,
    // PropType,
    // computed,
    // ref,
    // onMounted,
    // onUnmounted,
    // render,
    // watch,
    defineComponent,
    useSlots,
} from "vue";

const props = defineProps({
    visible: { type: Boolean, default: false },
    title: { type: String, default: 'tips' }
})

const slots = useSlots()
console.log(!slots.title);

// export default defineComponent({
//     name: "tp-dialog",
//     props: {
//         visible: { type: Boolean, default: false },
//         title: { type: String, default: 'tips' }
//     },
//     setup(props,{slots}) {
//         console.log(props);
//         console.log(slots);
        
//         // const slots = useSlots()
//         // console.log(slots,'slots');
//         return {

//         };
//     },
// });
// defineOptions({
//   name: 'tp-dialog',
// })

// const props = defineProps({
//     visible: { type: Boolean, default: false },
// })
// console.log(props);

// const slots = useSlots()
// import overlay from "./overlay.vue";


</script>
<style lang="scss" scoped>
.container {
    height: 200px;
    width: 200px;
    background-color: red;
}
</style>