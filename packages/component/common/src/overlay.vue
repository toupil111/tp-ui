<template>
    <div class="container">
    </div>
</template>
<script lang="ts">
import {
    defineComponent,
} from "vue";
export default defineComponent({
    name: "overlay",
    props: {
        visible: { type: Boolean, default: false },
    },
    setup(props) {
        return {

        };
    },
});
</script>
<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100%;
    background-color: red;
}
</style>