<template>
  <el-dropdown trigger="click" @command="handleSetSize">
    <div>
      <svg-icon class-name="size-icon" icon-class="size" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disable="size==='medium'" command="medium">Medium</el-dropdown-item>
      <el-dropdown-item :disable="size==='small'" command="small">Small</el-dropdown-item>
      <el-dropdown-item :disable="size==='mini'" command="mini">Mini</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  computed: {
    size() {
      return this.$store.getters.size
    }
  },
  methods: {
    handleSetSize(size) {

    },
    refreshView() {

    }
  }
}
</script>

<style scoped>
.size-icon {
	font-size: 20px;
	cursor: pointer;
	vertical-align: -4px !important;
}
</style>
