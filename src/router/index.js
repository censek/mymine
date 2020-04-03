import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../views/Hello'
import Layout from '../views/Layout/layout'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'Hello',
      component: Hello,
    },
    {
      path: '/note',
      component: Layout,
      // redirect: '/note',
      children: [{
        path: '/',
        component: () => import('@/views/Note/index'),
        name: 'myNote',
      }]
    },
    {
      path: '/pics',
      component: Layout,
      // redirect: '/pics',
      children: [{
        path: '/',
        component: () => import('@/views/Pics/index'),
        name: 'myPics',
      }]
    },
    {
      path: '/map',
      component: Layout,
      // redirect: '/map',
      children: [{
        path: '/',
        component: () => import('@/views/Map/index'),
        name: 'myMap',
      }]
    },
    {
      path: '/weather',
      component: Layout,
      // redirect: '/weather',
      children: [{
        path: '/',
        component: () => import('@/views/Weather/index'),
        name: 'myWeather',
      }]
    },
  ]
})