<template>
    <div class="container">
        <tp-button type="primary" @click="open">click</tp-button>
        <tp-dialog :visible="visible" :title="'test'">
            <!-- <template #header>
                Header slot is provided
            </template> -->
            <template #title>
                title slot is provided
            </template>
            <template #footer>
                <div>Footer </div>
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