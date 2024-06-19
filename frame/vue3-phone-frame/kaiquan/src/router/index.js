//1. 导入vue-router相关函数
import { createRouter, createWebHashHistory } from "vue-router"
// 2.路由规则
const routes = [
    {
        path: "/login",
        name: "Login",
        component: import('@/views/login/index.vue')
    },
    {
        path: "/register",
        name: "Register",
        component: import('@/views/login/register.vue')
    },
    {
        path: "/retrievePassword",
        name: "RetrievePassword",
        component: import('@/views/login/retrievePassword.vue')
    }
]
// 3.路由对象实例化
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
// 暴露导出
export default router
