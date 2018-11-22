<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key"></router-view>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',

}
</script>

<style scoped>
.app-main {
	min-height: calc(100vh - 84px);
	width: 100%;
	position: relative;
	overflow: hidden;
}
</style>
