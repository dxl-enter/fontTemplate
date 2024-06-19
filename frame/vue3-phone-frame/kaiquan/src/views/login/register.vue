<!-- 视图层 -->
<template>
  <van-nav-bar
      title="注册"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />
  <div class="login">
    <img :src="img" alt="" />
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="username"
            left-icon="phone-o"
            name="username"
            placeholder="请输入手机号码"
            :rules="[{ required: true, message: '请填写手机号码' }]"
        />
        <van-field
            v-model="captcha"
            center
            left-icon="sign"
            name="captcha"
            placeholder="请输入验证码"
            :rules="[{ required: true, message: '请填写验证码' }]"
        >
          <template #button>
            <van-button size="small" type="primary">发送验证码</van-button>
          </template>
        </van-field>
        <van-field
            v-model="password"
            left-icon="manager-o"
            type="password"
            name="password"
            placeholder="请设计6-20位登录密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
            v-model="passwordT"
            left-icon="manager-o"
            type="password"
            name="passwordT"
            placeholder="请再次确认密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field name="checkbox">
          <template #input>
            <van-checkbox v-model="checked" shape="round"
            >同意《<router-link to="protocol"><a>用户服务协议</a></router-link
            >》</van-checkbox
            >
          </template>
        </van-field>
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          注册
        </van-button>
      </div>
    </van-form>
  </div>
  <div class="find">
    <router-link to="/login"><span>已有账号,立即登录</span></router-link>
  </div>
</template>
<!-- 逻辑层 -->
<script setup>
import { reactive, ref } from "vue";
import { get, post, put, del } from "@/utils/http";
import { showDialog } from "vant";
// 本地图片引入
import img from "@/assets/images/vue.svg";
// 导入useRouter方法
import { useRouter } from "vue-router";
const router = useRouter();
// 返回上一页
const onClickLeft = () => {
  router.go(-1);
};
// 表单
const username = ref("");
const captcha = ref("");
const password = ref("");
const passwordT = ref("");
const checked = ref(true);
async function onSubmit(values) {
  //两次输入密码一致
  if (values.password == values.passwordT) {
    let res = await get("/api/infomation");
    console.log(res);
    res.data.some((element) => {
      if (element.iphone == values.username) {
        showDialog({
          title: "提示",
          message: "手机号已被注册",
        });
      } else if (values.password.length < 6 && values.passwordT.length < 6) {
        showDialog({
          title: "提示",
          message: "密码不低于六位",
        });
      } else {
        //增加数据
        let res3 = post("/api/infomation", {
          iphone: values.username,
          password: values.password,
          name: "",
          gender: "",
          state: "",
          degree: "",
          num1: [],
          num2: [],
          num3: [],
          num4: [],
          num5:[],
          num6:[],
          num7:[],
          img:""
        });
        router.push("/login");
        throw new Error();
      }
    });
  } else {
    showDialog({
      title: "提示",
      message: "确定密码跟密码不一致",
    });
  }
}
</script>
<!-- 样式层 -->
<style  scoped>
.login {
  width: 100%;
  margin-top: 12.6667vw;
}
.login img {
  margin-left: 50vw;
  transform: translate(-50%, 0);
}
.find {
  width: 70%;
  margin: 0 auto;
}
.find span {
  display: block;
  width: 100%;
  color: #0079fe;
  text-align: center;
}
.ways {
  width: 80%;
  margin: 7.6667vw auto;
  text-align: center;
}
.ways > span {
  display: block;
  margin-bottom: 5.3333vw;
  color: #999999;
}
.ways div {
  display: flex;
  width: 80%;
  margin: 0 auto;
  justify-content: space-around;
}
.ways div span {
  font-size: 8.3333vw;
}
a {
  color: #0079fe;
}
</style>
