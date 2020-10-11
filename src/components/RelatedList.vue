<template>
  <div
    ref="related_container"
    class="related-container min-h-15vh md:max-h-80vh md:overflow-y-auto w-full py-8 px-16 shadow-card bg-white rounded-1rem mb-20"
  >
    <citation-popup
      class="fixed"
      v-if="showCitation"
      :citationObj="citationObj"
      @close-citation-comp="closeCitationComp"
    />
    <div
      v-if="type && type === 'disasterToData'"
      class="header flex justify-between items-center"
    >
      <a :href="inputObj.url" target="_blank" class="text-24R font-bold">
        Related datasets of
        <span class="text-lightgreen"
          >{{ inputObj.title }} ({{ relatedList.length }})</span
        >
      </a>
      <span
        class="text-lightgreen text-2xl font-medium cursor-pointer"
        @click="emitHideRelatedEvent"
        >Hide related datasets</span
      >
    </div>
    <div
      v-else-if="type && type === 'datainfoToData'"
      class="header flex justify-between items-center"
    >
      <div class="text-24R font-bold">
        Similar Datasets
        <span class="text-lightgreen"> ({{ relatedList.length }})</span>
      </div>
    </div>
    <div v-else-if="type" class="header flex justify-between items-center">
      <div class="text-24R font-bold">
        Recommend for
        <span class="text-lightgreen">You ({{ relatedList.length }})</span>
      </div>
    </div>
    <div class="main flex flex-col w-full">
      <div
        class="flex sm:flex-col lg:flex-row w-full mt-6 cursor-pointer p-4 hover:bg-lightgreen2 duration-150 rounded-2rem"
        @click="toDataPage(eachdata.id)"
        v-for="(eachdata, index) in relatedList"
        :key="eachdata.id + '_' + index"
      >
        <div class="sm:mb-6 lg:mr-10 rounded-1rem">
          <img
            class="mx-auto"
            :src="baseImageURL + eachdata.id + '?h=200&w=300'"
            alt=""
            width="120"
          />
        </div>
        <div class="w-full">
          <h3 class="px-2 mb-4 text-3xl font-bold sm:break-all md:break-normal">
            {{ eachdata.title }}
          </h3>
          <div class="info-key w-full min-w-30vw text-3xl font-semibold">
            <div class="w-full flex sm:flex-col md:flex-row mb-4">
              <div class="w-72">Data Format</div>
              <div class="px-5 text-2xl font-normal">
                {{ eachdata.original_format }}
              </div>
            </div>
            <div class="w-full flex sm:flex-col md:flex-row mb-4">
              <div class="w-72">Spatial Extent</div>
              <div class="px-5 text-2xl font-normal">
                {{ eachdata.cmr.spatialExtent }}
              </div>
            </div>
            <div class="w-full flex sm:flex-col md:flex-row mb-4">
              <div class="w-72">Number of Granules</div>
              <div class="px-5 text-2xl font-normal">
                {{ eachdata.granule_count }}
              </div>
            </div>
            <div class="w-full flex sm:flex-col md:flex-row mb-4">
              <div class="w-72">Citation</div>
              <div
                class="px-5 text-2xl font-normal"
                :class="{
                  'text-lightgreen': eachdata.citation.length > 0,
                  'hover:text-hov-lightgreen': eachdata.citation.length > 0,
                }"
              >
                {{ eachdata.citation.length }}
                <i
                  @click.stop="showCitationPopup(eachdata)"
                  v-show="eachdata.citation.length > 0"
                  class="fa fa-external-link-square z-10 cursor-pointer"
                  aria-hidden="true"
                ></i>
              </div>
            </div>
            <div class="w-full flex sm:flex-col md:flex-row mb-4">
              <div class="w-72">Instrument</div>
              <div class="px-5 text-2xl font-normal">
                {{ eachdata.cmr.Instrument }}
              </div>
            </div>
            <div class="w-full flex sm:flex-col md:flex-row mb-4">
              <div class="w-72">Version</div>
              <div class="px-5 text-2xl font-normal">
                {{ eachdata.version_id }}
              </div>
            </div>
            <div class="w-full flex sm:flex-col md:flex-row mb-4">
              <div class="w-72">Updated</div>
              <div class="px-5 text-2xl font-normal">
                {{ data_format(eachdata.updated) }}
              </div>
            </div>
            <div class="w-full flex sm:flex-col flex-wrap md:flex-row mb-4">
              <div class="w-72">Totla of Votes</div>
              <div class="px-5 text-2xl font-normal flex flex-wrap">
                <div class="mr-8">
                  <span class="text-lightgreen mr-2">4</span>Researches
                </div>
                <div class="mr-8">
                  <span class="text-lightgreen mr-2">10</span>Analysis
                </div>
                <div class="mr-8">
                  <span class="text-lightgreen mr-2">10</span>citizen scientist
                </div>
              </div>
            </div>
            <!-- 
            <table class="w-full">
              <colgroup>
                <col span="1" style="width: 20%" />
                <col span="1" style="width: 80%" />
              </colgroup>
              <tr class="leading-12">
                <td>Data Format</td>
                <td class="text-2xl font-normal">
                  {{ eachdata.original_format }}
                </td>
              </tr>
              <tr class="leading-12">
                <td>Number of Granules</td>
                <td class="text-2xl font-normal">
                  {{ eachdata.granule_count }}
                </td>
              </tr>
              <tr class="leading-12">
                <td>Citations</td>
                <td
                  class="text-2xl font-normal"
                  :class="{
                    'text-lightgreen': eachdata.citation.length > 0,
                    'hover:text-hov-lightgreen': eachdata.citation.length > 0,
                  }"
                >
                  {{ eachdata.citation.length }}
                  <i
                    @click.stop="showCitationPopup(eachdata)"
                    v-show="eachdata.citation.length > 0"
                    class="fa fa-external-link-square z-10 cursor-pointer"
                    aria-hidden="true"
                  ></i>
                </td>
              </tr>
              <tr class="leading-12">
                <td>Instrument</td>
                <td class="text-2xl font-normal">
                  {{ eachdata.cmr.Instrument }}
                </td>
              </tr>
              <tr class="leading-12">
                <td>Version</td>
                <td class="text-2xl font-normal">
                  {{ eachdata.version_id }}
                </td>
              </tr>
              <tr class="leading-12">
                <td>Updated</td>
                <td class="text-2xl font-normal">
                  {{ data_format(eachdata.updated) }}
                </td>
              </tr>
              <tr class="leading-12">
                <td>Totla of Votes</td>
                <td class="flex text-2xl font-normal">
                  <div class="mr-8">
                    <span class="text-lightgreen mr-2">4</span>Researches
                  </div>
                  <div class="mr-8">
                    <span class="text-lightgreen mr-2">10</span>Analysis
                  </div>
                  <div class="mr-8">
                    <span class="text-lightgreen mr-2">10</span>citizen
                    scientist
                  </div>
                </td>
              </tr>
            </table> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-debugger */

import { mapGetters } from "vuex"
import Date from "@/modules/DateFormat.js"
import CitationPopup from "@/components/CitationPopup"
export default {
  props: {
    inputObj: {
      type: Object,
    },
    type: {
      tpye: String,
      default: "dataToData",
    },
  },
  components: {
    CitationPopup,
  },
  data() {
    return {
      relatedList: [],
      citationObj: {},
      showCitation: false,
    }
  },
  computed: {
    ...mapGetters({
      baseImageURL: "getBaseImageURL",
      user_recode: "get_user_recode",
      recommend_api_base_data: "get_recommend_api_base_data",
    }),
  },
  watch: {
    user_recode: {
      handler() {
        // if (this.tpye === "datainfoToData") return
        this.get_related_data()
      },
      deep: true,
    },
  },
  mounted() {
    this.get_related_data()
  },
  methods: {
    get_related_data() {
      let inputData
      if (this.inputObj) {
        const picked = (({ id, time }) => ({ id, time }))(this.inputObj)

        inputData = JSON.parse(JSON.stringify(this.recommend_api_base_data))
        inputData.blog.push(picked)
      } else {
        inputData = { ...this.user_recode }
      }
      this.$store
        .dispatch("recommend_api", {
          data: inputData,
        })
        .then((res) => {
          // console.log("related-----------------", res)
          this.relatedList = res.data
        })
    },
    emitHideRelatedEvent() {
      this.$emit("hideRelatedDataList")
    },
    toDataPage(dataset_id) {
      if (this.$route.name !== "DataInfo")
        this.$router.push({ name: "DataInfo", params: { dataId: dataset_id } })
      this.$store.dispatch(
        "set_dataDetailInfo",
        this.relatedList.find((el) => el.id === dataset_id)
      )
      this.pushNewRecode_view(dataset_id)

      setTimeout(() => {
        this.$refs.related_container.scrollTop = 0
        window.scrollTo(0, 0)
      }, 300)
    },
    pushNewRecode_view(dataset_id) {
      const newRecodeObj = {
        id: dataset_id,
        time: new Date().format("yyyy-MM-dd hh:mm:ss"),
      }
      this.$store.dispatch("push_new_recode", {
        recodeType: "view",
        newRecodeObj,
      })
    },
    data_format(raw_date, to_day = false) {
      if (to_day) return new Date(raw_date).format("yyyy-MM-dd")
      if (!raw_date) return "_"
      return new Date(raw_date).format("yyyy-MM-dd hh:mm:ss")
    },
    showCitationPopup(dataInfo) {
      this.citationObj.citation = dataInfo.citation
      this.citationObj.title = dataInfo.title
      this.showCitation = true
    },
    closeCitationComp() {
      this.showCitation = false
      this.citationObj = {}
    },
  },
}
</script>

<style>
@import url("../assets/styles/_base.css");
</style>
