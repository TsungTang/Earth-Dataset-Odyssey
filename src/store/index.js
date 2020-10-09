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

// const init_search_recode = () => {
//   return {
//     searchKeyWord: '',
//     searchTime: { start: '', end: '' }
//   }
// }

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
    searchTime: { start: '', end: '' },
    dataDetailInfo: {}
  },
  getters: {
    get_user_recode: (state) => {
      return state.user_recode
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

        // init input data
        let inputData
        if (state.firstRecommend) {
          inputData = init_recode()
        } else {
          inputData = data
        }
        axios.post("/api/recommend", inputData).then((res) => {

          // let returnData = res.data.replace('}, ]', '}]')

          // returnData = JSON.parse(returnData)
          const returnData = res.data
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
    set_searchKeyword({ commit }, { searchText, searchTime }) {
      commit('set_searchKeyword', { searchText: searchText.toLowerCase(), searchTime })
    },
    search_api({ state }) {
      return new Promise((resolve, reject) => {
        axios.post("/api/search", {
          mode: 'B',
          keyword: state.searchKeyWord,
          start_time: state.searchTime.start,
          end_time: state.searchTime.end
        }).then(res => {
          if (typeof res.data !== 'string' && res.data.data.length === 0) {
            throw new Error('empty datalist')
          }
          const returnData = res.data

          // state.searchTime = init_search_recode()[1]
          resolve(returnData.data)
        }
        )
          .catch(err => {
            console.error(err)
            // state.searchTime = init_search_recode()[1]

            reject()
          })

      })

    }
  },
  mutations: {
    set_dataDetailInfo(state, dataInfoObj) {
      state.dataDetailInfo = dataInfoObj
    },
    push_new_recode(state, { recodeType, newRecodeObj }) {
      const newUserRecode = JSON.parse(JSON.stringify(state.user_recode))
      newUserRecode[recodeType].push(newRecodeObj)
      state.user_recode = newUserRecode
      localStorage.setItem('user_recode', JSON.stringify(state.user_recode))
    },
    set_searchKeyword(state, { searchText, searchTime }) {
      state.searchKeyWord = searchText
      state.searchTime.start = searchTime[0]
      state.searchTime.end = searchTime[1]
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
