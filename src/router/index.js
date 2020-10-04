import Vue from 'vue'
import VueRouter from 'vue-router'
import Container from "../views/Container.vue"
import Unknown from "../views/Unknown.vue"
import RecommendView from "../views/RecommendView"
import DataInfo from "../views/DataInfo"
import SearchResult from "../views/SearchResult"


Vue.use(VueRouter)

const routes = [
  {
    path: '/edo',
    name: 'Container',
    redirect: '/edo/recommend-datasets',
    component: Container,
    children: [
      {
        name: 'RecommendView',
        path: 'recommend-datasets',
        component: RecommendView
      },
      {
        name: "SearchResult",
        path: 'search-result',
        component: SearchResult
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
    redirect: '/edo/recommend-datasets'
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
