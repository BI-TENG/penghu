import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      login: false,
      title: '澎揪'
    }
  },
  {
    path: '/explore',
    name: 'Explore',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "explore" */ '../views/Explore.vue'),
    meta: {
      login: false,
      title: '澎揪 | 景點探索'
    }
  },
  {
    path: '/magong',
    name: 'Magong',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "magong" */ '../views/Magong.vue'),
    meta: {
      login: false,
      title: '澎揪 | 馬公市'
    }
  },
  {
    path: '/huxi',
    name: 'Huxi',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "huxi" */ '../views/Huxi.vue'),
    meta: {
      login: false,
      title: '澎揪 | 湖西鄉'
    }
  },
  {
    path: '/wangan',
    name: 'Wangan',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "wangan" */ '../views/Wangan.vue'),
    meta: {
      login: false,
      title: '澎揪 | 望安鄉'
    }
  },
  {
    path: '/xiyu',
    name: 'Xiyu',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "xiyu" */ '../views/Xiyu.vue'),
    meta: {
      login: false,
      title: '澎揪 | 西嶼鄉'
    }
  },
  {
    path: '/qimei',
    name: 'Qimei',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "qimei" */ '../views/Qimei.vue'),
    meta: {
      login: false,
      title: '澎揪 | 七美鄉'
    }
  },
  {
    path: '/baisha',
    name: 'Baisha',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "baisha" */ '../views/Baisha.vue'),
    meta: {
      login: false,
      title: '澎揪 | 白沙鄉'
    }
  },
  {
    path: '/activity',
    name: 'Activity',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "activity" */ '../views/Activity.vue'),
    meta: {
      login: false,
      title: '澎揪 | 主題活動'
    }
  },
  {
    path: '/planning',
    name: 'Planning',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "planning" */ '../views/Planning.vue'),
    meta: {
      login: true,
      title: '澎揪 | 行程規劃'
    }
  },
  {
    path: '/album',
    name: 'Album',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "album" */ '../views/Album.vue'),
    meta: {
      login: false,
      title: '澎揪 | 旅遊相簿'
    }
  },
  {
    path: '/reg',
    name: 'Reg',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "reg" */ '../views/Reg.vue'),
    meta: {
      login: false,
      title: '註冊'
    }
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  if (to.meta.login && !store.state.user) {
    next('login')
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  if (to.name !== 'Album' && to.name !== 'Planning') {
    document.title = to.meta.title
  } else {
    document.title = 'Hello \n 歡迎來到澎揪'
  }
})

export default router
