<template>
  <div class="logo" v-if="settings.logoHidden">
    <img :src='settings.logo' alt='logo'>
    <p>{{settings.title}}</p>
  </div>
</template>
<script lang='ts' setup>
// 引入设置logo与标题的配置文件
import settings from '@/utils/settings'
</script>
<script lang="ts">
export default {
  name: 'Logo',
}
</script>

<style lang="scss" scoped>
@import '@/style/variable.scss';
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  color: white;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 8px;
  img {
    width: 40px;
    height: 40px;
  }
  p {
    font-size: $base-logo-title-fontSize;
    margin-left: 10px;
  }
}
</style>
