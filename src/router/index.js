import Vue from 'vue'
import VueRouter from 'vue-router'
import Container from "../views/Container.vue"
import Unknown from "../views/Unknown.vue"
import RecommendView from "../views/RecommendView"
import DataInfo from "../views/DataInfo"


Vue.use(VueRouter)

const routes = [
  {
    path: '/earth_dataset_odyssey',
    name: 'Container',
    redirect: '/earth-dataset-odyssey/recommend-datasets',
    component: Container,
    children: [
      {
        name: 'RecommendView',
        path: 'recommend-datasets',
        component: RecommendView
      },
      {
        name: 'DataInfo',
        path: 'data-infomation/:dataId',
        component: DataInfo
      }
    ]
  },
  {
    path: '/',
    redirect: '/earth_dataset_odyssey/recommend-datasets'
  },
  {
    path: "*",
    component: Unknown
  }
]

const router = new VueRouter({
  routes
})

export default router
