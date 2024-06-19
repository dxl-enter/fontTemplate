// 对外暴露路由(常量路由)
export const constantRoute = [
  {
    path: '/login',
    name: 'login', // 命名路由
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录页面',
      hidden: true, // 代表路由标题在菜单中是否隐藏
      icon: 'Printer', // 菜单文字左侧的图标，支持element-ui
    },
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: '',
      requiresAuth: false,
      hidden: true,
    },
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/home/index.vue'),
        meta: {
          title: '首页',
          icon: 'HomeFilled', // 菜单文字左侧的图标，支持element-ui
        },
      },
    ],
  },
  {
    path: '/screen',
    name: 'screen',
    meta: {
      title: '数据大屏',
      icon: 'Platform',
    },
    children: [
      {
        path: '/three',
        component: () => import('@/views/home/screen/three/index.vue'),
        name: 'three',
        meta: {
          title: '3D可视化',
          icon: 'Picture',
        },
      },
      {
        path: '/echarts',
        component: () => import('@/views/home/screen/echarts/index.vue'),
        name: 'echarts',
        meta: {
          title: 'ECharts展示',
          icon: 'ShoppingBag',
        },
      },
    ],
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404/index.vue'),
    meta: {
      title: '404界面',
      hidden: true,
    },
  },
]
// 异步路由
export const asyncRoute = [
]
//任意路由
export const anyRoute = {
  //任意路由
  path: '/:pathMatch(.*)*',
  redirect: '/404',
  name: 'Any',
  meta: {
    title: '任意路由',
    hidden: true,
    icon: 'DataLine',
  },
}
