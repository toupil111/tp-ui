<template>
    <teleport to="body">
        <transition name="dialog-fade">
            <div class="mask" v-show="visible" v-bind="$attrs">
                <div class="tp-dialog">
                    <header ref="headerRef" class="dialog-header">
                        <slot name="header">
                        </slot>
                    </header>
                    <slot />
                    <footer v-if="mySlots.footer" class="dialog-footer">
                        <slot name="footer" />
                    </footer>
                </div>
            </div>
        </transition>
    </teleport>
</template>
<script lang="ts">
import {
    computed,
    provide,
    ref,
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
import overlay from "./overlay.vue";
import Overlay from "./overlay.vue";
console.log(overlay);

// const props = defineProps({
//   visible: { type: Boolean, default: false },
//   title: { type: String, default: "tips" },
// });

// const slots = useSlots();
// console.log(!slots.title);
export default defineComponent({
    name: "tp-dialog",
    props: {
        visible: { type: Boolean, default: false },
        // title: { type: String, default: "tips" },
    },
    setup(props, { slots }) {
        console.log(props);
        console.log(slots);
        // const slots = useSlots()
        // console.log(slots,'slots');
        const mySlots = slots;
        return {
            mySlots,
        };
    },
    components: { Overlay }
});
</script>
<style lang="scss" scoped>
.mask {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0 0 0 / 50%);
    z-index: 2023;
    .tp-dialog {
        width: 300px;
        height: 300px;
        background-color: #fff;
        z-index: 2024;
    }
}
</style>