<template>
    <div class="container">
        <tp-button type="primary" @click="open">click</tp-button>
        <tp-dialog :visible="visible" :title="'test'">
            <template #header>
                    header
            </template>
            <template #title>
                    title
            </template>
            <template #footer>
                    footer
            </template>
        </tp-dialog>
    </div>
</template>
<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
    setup() {
        const visible = ref(false)
        const open = () => {
            visible.value = true;
        }
        return {
            visible,
            open,
        };
    },
});
</script>
<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
}

.container>div {
    margin: 20px 0;
}
</style>