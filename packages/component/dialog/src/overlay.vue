<template>
    <div class="container" v-show="visible">
        <div> 123123
        </div>
    </div>
</template>
<script lang="ts">
import {
    defineComponent,
} from "vue";
export default defineComponent({
    name: "tp-dialog",
    props: {
        visible: { type: Boolean, default: false },
    },
    setup(props) {
        console.log(props);
        return {

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