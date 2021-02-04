<template>
  <div class="home">
      我是vue home页
  </div>
  <router-link to="/news">点击<router-link>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    name: 'Home',
    setup () {
      
    }
})
</script>

<style lang="less" scoped>
.home{
  color: violet;
}
</style>
