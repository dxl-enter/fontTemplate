<template>
  <div class="box">
    <el-button type="primary" @click="goHome">回到首页</el-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
let $router = useRouter()
const goHome = () => {
  $router.push('/home')
}
</script>

<style scoped lang="scss">
.box {
  width: 100vw;
  height: 100vh;
  background: #2c3e50;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 1000px;
    height: 400px;
  }
  button {
    margin-left: 300px;
    width: 300px;
    height: 50px;
  }
}
</style>
