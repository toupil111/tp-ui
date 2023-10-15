<template>
  <div  class="main-container">
    <mainContainer></mainContainer>
    <router-view></router-view>
  </div>
</template>
<style> 
  * {
    margin: 0;
  }
  .main-container{
    margin: 10px;
  }
</style>
<script lang="ts">
import { defineComponent, ref } from "vue";
import mainContainer from './components/main.vue'
export default defineComponent({
  components:{
    mainContainer
  },
  setup() {
    return {

    };
  },
});
</script>
