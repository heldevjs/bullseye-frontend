import vue from 'vue'
import vueRouter from 'vue-router'

import warning from './views/warning'
import home from './views/home'
import signup from './views/signup'
import signin from './views/signin'
import main_frame from './views/main_frame'
import board from './views/board'
import store from './store'

vue.use(vueRouter)

const router = new vueRouter({
  mode: 'history',
  routes: [
    {
      path: '*',
      name: 'warning',
      component: warning,
      meta: {open_access: true}
    },
    {
      path: '/',
      name: 'home',
      component: home,
      meta: {open_access: true}
    },
    {
      path: '/signup',
      name: 'signup',
      component: signup,
      meta: {open_access: true}
    },
    {
      path: '/signin',
      name: 'signin',
      component: signin,
      meta: {open_access: true}
    },
    {
      path: '/board',
      component: main_frame,
      meta: {close_access: true},
      children: [
        {
          path: '',
          name: 'board',
          component: board
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.open_access)) {
    next()
  } else if (store.state.user) {
    if (to.matched.some(record => record.meta.close_access)) {
      next()
    }
  } else {
    next({name: 'signin'})
  }
})

export default router
