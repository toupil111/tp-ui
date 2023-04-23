<template>
    <div class="container" v-show="visible">
        {{ title }}
        <div>
            {{ $slots }}
            <header ref="headerRef" class="dialog-header">
                <slot name="header">
                </slot>
            </header>
            {{ mySlots }}
            <slot />
            <footer v-if="mySlots.footer" class="dialog-footer">
                <slot name="footer" />
            </footer>
        </div>
    </div>
</template>
<script lang="ts">
import {
    defineComponent,
} from "vue";
export default defineComponent({
    name: "overlay",
    props: {
        visible: { type: Boolean, default: true },
        title: { type: String, default: "tips" },
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
});
</script>
<style lang="scss" scoped>
.container {
    height: 100%;
    width: 100%;
    background-color: red;
}
</style>