<template>
  <div class="datainfo-container mb-40">
    <citation-popup
      class="fixed"
      v-if="showCitation"
      :citationObj="citationObj"
      @close-citation-comp="closeCitationComp"
    />
    <header class="header-bg py-10 w-full">
      <div
        v-if="Object.keys(dataDetailInfo).length > 0"
        class="top-card mx-auto py-8 w-4/5 text-white font-normal"
      >
        <router-link class="flex items-center" :to="{ name: 'RecommendView' }">
          <div
            :href="dataDetailInfo.links[0].rel"
            target="_blank"
            class="source-link"
          >
            <img
              src="../assets/image/nasalogo_black.png"
              alt="NASA"
              width="50"
              height="40"
            />
          </div>
          <div class="text-2xl ml-6 leading-12">
            Welcome to Earth Dataset Odyssey
          </div>
        </router-link>
      </div>
    </header>
    <div class="main-info-container w-4/5 mx-auto">
      <div @click="$router.go(-1)" class="cursor-pointer">
        <h3 class="flex items-center mt-16 text-24R font-bold">
          <i class="fa fa-chevron-left text-base mr-6" aria-hidden="true"></i
          >Back to Previous Page
        </h3>
      </div>
      <div class="flex sm:flex-col lg:flex-row w-full mt-6">
        <div class="sm:mb-6 lg:mr-10 rounded-1rem">
          <img
            class="mx-auto"
            :src="baseImageURL + dataDetailInfo.id + '?h=200&w=295'"
            alt=""
            width="295"
          />
        </div>

        <div class="w-full">
          <h3 class="px-2 text-3xl font-bold lg:mb-8">
            {{ dataDetailInfo.title }}
          </h3>
          <div class="info-key w-full min-w-30vw text-3xl font-semibold">
            <div class="w-full flex sm:flex-col md:flex-row mb-4">
              <div class="pr-40">Summary</div>
              <div class="px-5 text-2xl font-normal break-normal text-justify">
                {{ dataDetailInfo.cmr.summary }}
              </div>
            </div>
            <div class="w-full flex sm:flex-col md:flex-row mb-4">
              <div class="w-72">Temporal Coverage</div>
              <div class="px-5 text-2xl font-normal">
                {{
                  data_format(dataDetailInfo.time_start, true) +
                  " to " +
                  data_format(dataDetailInfo.time_end, true)
                }}
              </div>
            </div>
            <div class="w-full flex sm:flex-col md:flex-row mb-4">
              <div class="w-72">Data Format</div>
              <div class="px-5 text-2xl font-normal">
                {{ dataDetailInfo.original_format }}
              </div>
            </div>
            <div class="w-full flex sm:flex-col md:flex-row mb-4">
              <div class="w-72">Coordinate System</div>
              <div class="px-5 text-2xl font-normal">
                {{ dataDetailInfo.coordinate_system }}
              </div>
            </div>
            <div class="w-full flex sm:flex-col md:flex-row mb-4">
              <div class="w-72">Spatial Extent</div>
              <div class="px-5 text-2xl font-normal">
                {{ dataDetailInfo.cmr.spatialExtent }}
              </div>
            </div>
            <div class="w-full flex sm:flex-col md:flex-row mb-4">
              <div class="w-72">Number of Granules</div>
              <div class="px-5 text-2xl font-normal">
                {{ dataDetailInfo.granule_count }}
              </div>
            </div>
            <div class="w-full flex sm:flex-col md:flex-row mb-4">
              <div class="w-72">Citation</div>
              <div class="px-5 text-2xl font-normal">
                {{ dataDetailInfo.citation.length }}
                <i
                  @click.stop="showCitationPopup(dataDetailInfo)"
                  v-show="dataDetailInfo.citation.length > 0"
                  class="fa fa-external-link-square z-10 cursor-pointer"
                  aria-hidden="true"
                ></i>
              </div>
            </div>
            <div class="w-full flex sm:flex-col md:flex-row mb-4">
              <div class="w-72">Instrument</div>
              <div class="px-5 text-2xl font-normal">
                {{ dataDetailInfo.cmr.Instrument }}
              </div>
            </div>
            <div class="w-full flex sm:flex-col md:flex-row mb-4">
              <div class="w-72">Version</div>
              <div class="px-5 text-2xl font-normal">
                {{ dataDetailInfo.version_id }}
              </div>
            </div>
            <div class="w-full flex sm:flex-col md:flex-row mb-4">
              <div class="w-72">Updated</div>
              <div class="px-5 text-2xl font-normal">
                {{ data_format(dataDetailInfo.updated) }}
              </div>
            </div>
            <div class="w-full flex sm:flex-col md:flex-row mb-4">
              <div class="w-72">URL</div>
              <div class="px-5 text-2xl font-normal">
                <a
                  class="border rounded-lg p-2"
                  :href="dataDoc + dataDetailInfo.id + '.html'"
                  target="_blank"
                  >{{ dataDoc + dataDetailInfo.id + ".html" }}</a
                >
              </div>
            </div>
            <div class="w-full flex sm:flex-col md:flex-row mb-4">
              <div class="w-72">Totla of Votes</div>
              <div class="px-5 text-2xl font-normal flex">
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
                <col span="1" class="sm:w-full md:w-1/5" />
                <col span="1" class="sm:w-0 md:w-4/5" />
              </colgroup>


              <tr class="">
                <td>URL</td>
                <td class="text-2xl font-normal">
                  <a
                    class="border rounded-lg p-2"
                    :href="dataDoc + dataDetailInfo.id + '.html'"
                    target="_blank"
                    >{{ dataDoc + dataDetailInfo.id + ".html" }}</a
                  >
                </td>
              </tr>
              <tr>
                <td>Totla of Votes</td>
                <td class="flex mt-3 text-2xl h-full font-normal">
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
            <footer
              class="flex justify-end mt-12 text-white text-3xl font-normal"
            >
              <div class="mr-8 bg-lightgreen px-4 rounded-lg cursor-pointer">
                <i class="fa fa-thumbs-o-up mr-3" aria-hidden="true"></i
                ><span class="">Vote</span>
              </div>

              <div class="mr-8 bg-lightgreen px-4 rounded-lg cursor-pointer">
                <img class="mr-3 inline" src="../assets/image/download.svg" />
                Download
              </div>

              <div class="mr-8 bg-lightgreen px-4 rounded-lg cursor-pointer">
                <img
                  class="mr-3 inline"
                  src="../assets/image/downloadPackage.svg"
                />
                Download Package
              </div>
            </footer>
          </div>
        </div>
      </div>
      <RelatedList
        class="my-12"
        :type="'datainfoToData'"
        :inputObj="inputDataInfoObj"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import Date from "@/modules/DateFormat.js"
import RelatedList from "@/components/RelatedList"
import CitationPopup from "@/components/CitationPopup"
/* eslint-disable no-debugger */

export default {
  name: "DataInfo",
  components: {
    RelatedList,
    CitationPopup,
  },
  data() {
    return {
      showCitation: false,
      citationObj: {},
    }
  },
  computed: {
    ...mapGetters({
      baseImageURL: "getBaseImageURL",
      dataDetailInfo: "get_dataDetailInfo",
      recommend_api_base_data: "get_recommend_api_base_data",
      dataDoc: "get_dataDoc",
    }),
    inputDataInfoObj() {
      return {
        id: this.dataDetailInfo.id,
        time: new Date().format("yyyy-MM-dd hh:mm:ss"),
      }
    },
  },
  mounted() {
    if (Object.keys(this.dataDetailInfo).length === 0) {
      this.$router.push({ name: "RecommendView" })
    }

    window.scrollTo(0, 0)
  },
  methods: {
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

<style lang="scss">
@import url("../assets/styles/_base.css");
table tr td:first-child {
  line-height: 4rem;
}
.header-bg {
  background-image: url("../assets/image/headerCover.png");
}
</style>
