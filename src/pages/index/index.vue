<template>
  <div>
    <img src="" alt="哒哒哒">
    <el-button>哒哒哒</el-button>
    <hello-world></hello-world>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld';
import { Message, Loading } from 'element-ui'
export default {
  name: 'Index',
  data() {
    return {

    }
  },

  mounted() {
    let loading = Loading.service();
    loading.close();
    this.$message({
      message: '你好',
      type: 'success'
    })
  },
  components: {
    HelloWorld
  }
}
</script>

<style scoped>
</style>