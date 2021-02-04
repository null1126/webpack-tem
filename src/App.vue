<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup () {
      const num = ref<string>('大佬尤雨溪')
      return {
        num
      }
    }
})
</script>

<style lang="less" scoped>
.app{
  color: violet;
}
</style>
