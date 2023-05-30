import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import user from "@/store/user";

Vue.use(VueRouter)

const routes = [
  {
    path: '/administrator',
    name: 'Home',
    component: Home,
    meta: {
      title: "lab直聘",
      requireAuth: true
    }
  },
  {
    path: '/administrator/login',
    name: 'Login',
    component: () => import('../views/Login'),
    meta: {
      title: "lab直聘",
    }
  },
  {
    path: '/administrator/stulist',
    name: 'Stulist',
    component: () => import('../views/Stulist'),
    meta: {
      title: "lab直聘",
      requireAuth: true
    }
  },
  {
    path: '/administrator/user',
    name: 'User',
    component: () => import('../views/User'),
    meta: {
      title: "lab直聘",
      requireAuth: true
    }
  },
  {
    path: '/administrator/tuser',
    name: 'Tuser',
    component: () => import('../views/Tuser'),
    meta: {
      title: "lab直聘",
      requireAuth: true
    }
  },
  {
    path: '/administrator/moments',
    name: 'Momentlist',
    component: () => import('../views/Momentlist'),
    meta: {
      title: "lab直聘",
      requireAuth: true
    }
  },
  {
    path: '/administrator/innermoments',
    name: 'Innermomentlist',
    component: () => import('../views/Innermomentlist'),
    meta: {
      title: "lab直聘",
      requireAuth: true
    }
  },
  {
    path: '/administrator/teacherlist',
    name: 'Teacherlist',
    component: () => import('../views/Teacherlist'),
    meta: {
      title: "lab直聘",
      requireAuth: true
    }
  },
  {
    path: '/administrator/moment',
    name: 'Moment',
    component: () => import('../views/Moment'),
    meta: {
      title: "lab直聘",
      requireAuth: true
    }
  },
  {
    path: '/administrator/momenti',
    name: 'Momenti',
    component: () => import('../views/Momenti'),
    meta: {
      title: "lab直聘",
      requireAuth: true
    }
  },
  {
    path: '/administrator/message',
    name: 'Message',
    component: () => import('../views/Message'),
    meta: {
      title: "lab直聘",
      requireAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }

  // 通过 Vuex 获取用户登录信息
  const userInfo = user.getters.getUser(user.state());

  // 若前往的是登录路由，则保存当前路由，以便登录成功后跳转
  /* if (to.path === '/administrator/login') {
    localStorage.setItem("preRoute", router.currentRoute.fullPath);
  } */

  // 若用户未登录且访问的页面需要登录，则跳转至登录页面
  if (!userInfo && to.meta.requireAuth) {
    next({
      name: 'Login',
    })
  }

  next()
})

export default router
