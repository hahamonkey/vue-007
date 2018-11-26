<template>
  <div>
    <el-color-picker v-model="theme" class="theme-picker" propper-class="theme-picker-dropdown" />
  </div>
</template>

<script>
const version = require('element-ui/package.json').version
const ORIGINAL_THEME = '#409EFF'

export default {
  data() {
    return {
      chalk: '',
      theme: ORIGINAL_THEME
    }
  }
}
</script>

<style scoped>
</style>
