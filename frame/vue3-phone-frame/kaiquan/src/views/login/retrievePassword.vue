<!-- 视图层 -->
<template>
  <div>
  <van-nav-bar
      title="验证"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />
  <van-tabs v-model:active="active" title-active-color="#0079FE" color="#fff">
    <van-tab title="1.验证手机号码">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
              v-model="username"
              left-icon="phone-o"
              name="username"
              placeholder="请输入注册手机号码"
              :rules="[{ required: true, message: '请填写手机号码' }]"
          />
          <van-field
              v-model="password"
              center
              left-icon="sign"
              name="password"
              placeholder="请输入验证码"
              :rules="[{ required: true, message: '请填写验证码' }]"
          >
            <template #button>
              <van-button size="small" type="primary">发送验证码</van-button>
            </template>
          </van-field>
        </van-cell-group>
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit">
            下一步
          </van-button>
        </div>
      </van-form>
    </van-tab>
    <van-tab title="2.设置新密码" disabled></van-tab>
  </van-tabs>
  </div>
</template>
<!-- 逻辑层 -->
<script setup>
import { get, post, put, del } from "@/utils/http";
import { showDialog } from "vant";
import { ref } from "vue";
// 导入useRouter方法
import { useRouter } from "vue-router";
const router = useRouter();
// 返回上一页
const onClickLeft = () => {
  router.go(-1);
};
// 表单
const username = ref("");
const password = ref("");
async function onSubmit(values) {
  let res = await get("/api/infomation");
  res.data.forEach((element) => {
    if (element.iphone == values.username) {
      //传出id值
      router.push({
        path: "/revise",
        query: {
          id: element.id,
        },
      });
      throw new Error();
    } else {
      username.value = "";
      password.value = "";
    }
  });
}
</script>
<!-- 样式层 -->
<style  scoped>
</style>
