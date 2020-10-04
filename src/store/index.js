/* eslint-disable no-debugger */

import Vue from 'vue'
import Vuex from 'vuex'
// import image from "./modules/image"
// import sample from "@/sample_res.js"
import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/json';

const init_recode = () => {
  return {
    "mode": "B",
    "view": [
      {
        "id": "C179002853-ORNL_DAAC",
        "time": "2020-10-01 20:33:45"
      },
      {
        "id": "C179003246-ORNL_DAAC",
        "time": "2020-09-30 05:44:45"
      },
      {
        "id": "C1251051178-GES_DISC",
        "time": "2020-09-30 04:38:45"
      }
    ],
    "select": [],
    "blog": []
  }
}

const link = {
  namespced: true,
  state: {
    baseImageURL: "https://cmr.earthdata.nasa.gov/browse-scaler/browse_images/datasets/",
    dataListURL: "https://search.earthdata.nasa.gov/search",
    dataDoc: "https://cmr.earthdata.nasa.gov/search/concepts/"
  },
  getters: {
    getDataListURL(state) {
      return state.dataListURL
    },
    getBaseImageURL(state) {
      return state.baseImageURL
    },
    get_dataDoc(state) {
      return state.dataDoc
    }
  },
  mutations: {},
  actions: {}
}

const dataset = {
  namespced: true,
  state: {
    firstRecommend: true,
    user_recode: {
      "mode": "B",
      "view": [],
      "select": [],
      "blog": []
    },
    recommend_api_base_data: {

      "mode": "B",
      "view": [],
      "select": [],
      "blog": []

    },
    searchKeyWord: '',
    // disasterToData: [],
    // datainfoToData: [],
    // dataToData: [],
    // keywordToData: [],
    dataDetailInfo: {}
  },
  getters: {
    get_user_recode: (state) => {
      // if (localStorage.getItem('user_recode') !== null) {
      //   return JSON.parse(localStorage.getItem('user_recode'))
      // } else {
      return state.user_recode
      // }
    },
    get_dataDetailInfo: (state) => {
      return state.dataDetailInfo
    },
    get_responseData: (state) => (type) => {
      return state[type]
    },
    get_recommend_api_base_data: (state) => {
      return state.recommend_api_base_data
    },
    get_searchKeyWord: (state) => {
      return state.searchKeyWord
    }
  },
  actions: {
    set_dataDetailInfo({ commit }, dataInfoObj) {
      commit("set_dataDetailInfo", dataInfoObj)
    },
    recommend_api({ state }, { data }) {
      return new Promise((resolve, reject) => {
        // if (!localStorage.getItem('user_recode') === null) {
        //   state.user_recode = localStorage.getItem('user_recode')
        // }

        // init input data
        let inputData
        if (state.firstRecommend) {
          inputData = init_recode()
        } else {
          inputData = data
        }
        axios.post("http://localhost:5566/api/recommend", inputData).then((res) => {
          let returnData = res.data.replace('}, ]', '}]')

          returnData = JSON.parse(returnData)
          state.firstRecommend = false
          localStorage.setItem('firstRecommend', false)

          resolve(returnData)
        }).catch(err => {
          console.error(err)
          reject()
        }
        )
      })
    },
    push_new_recode({ commit }, { recodeType, newRecodeObj }) {
      return new Promise((resolve) => {
        commit('push_new_recode', { recodeType, newRecodeObj })
        resolve()
      })
    },
    set_searchKeyword({ commit }, keyword) {
      commit('set_searchKeyword', keyword.toLowerCase())
    },
    search_api({ state }) {
      return new Promise((resolve, reject) => {
        axios.post("http://localhost:5566/api/search", {
          mode: 'B', keyword: state.searchKeyWord
        }).then(res => {
          if (typeof res.data !== 'string' && res.data.data.length === 0) {
            throw new Error('empty datalist')
          }
          let returnData = res.data.replace('}, ]', '}]')

          returnData = JSON.parse(returnData)
          resolve(returnData.data)
        }
        )
          .catch(err => {
            console.error(err)
            reject()
          })

      })

    }
  },
  mutations: {
    set_dataDetailInfo(state, dataInfoObj) {
      state.dataDetailInfo = dataInfoObj
    },
    // recommend_api(state, { response_data, type }) {
    //   // axios 解析 json失敗 手動解析
    //   // console.log(response_data)
    //   let returnData = response_data.replace('}, ]', '}]')
    //   returnData = JSON.parse(returnData)
    //   state[type] = returnData.data
    //   state.firstRecommend = false
    // },
    push_new_recode(state, { recodeType, newRecodeObj }) {
      const newUserRecode = JSON.parse(JSON.stringify(state.user_recode))
      newUserRecode[recodeType].push(newRecodeObj)
      state.user_recode = newUserRecode
      localStorage.setItem('user_recode', JSON.stringify(state.user_recode))
    },
    set_searchKeyword(state, keyword) {
      state.searchKeyWord = keyword
    }
  }
}


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    link,
    dataset
  }
})
