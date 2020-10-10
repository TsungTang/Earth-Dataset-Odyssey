<template>
  <div class="header-container w-full">
    <div class="top-nav absolute top-0 left-0 w-screen z-20">
      <div class="sm:w-fulll xl:w-4/5 flex justify-end mx-auto p-8">
        <div class="text-white text-2xl font-medium">API Document</div>
        <div class="ml-16 text-white text-2xl font-medium">About Us</div>
      </div>
    </div>
    <div
      v-if="current_route_name === 'RecommendView'"
      class="flex flex-col items-center w-full"
    >
      <div class="header-bg absolute top-0 left-0 w-full min-h-50vh">
        <router-link :to="{ name: 'RecommendView' }">
          <div class="top-card w-4/5 mx-auto mt-12 text-white font-normal">
            <div class="source-link">
              <img
                src="../assets/image/nasalogo_black.png"
                alt="NASA"
                width="50"
                height="40"
              />
            </div>
            <div class="text-2xl mt-2 leading-12">
              Welcome to Earth Dataset Odyssey
            </div>
            <div class="text-7xl">Earthling</div>
          </div>
        </router-link>
      </div>
      <div class="search-container relative w-full min-h-50vh h-full mt-96">
        <div
          class="search-card mx-auto flex flex-col items-center py-12 sm:px-2 md:px-0 w-4/5 rounded-1rem bg-deepblue"
        >
          <h2 class="mb-4 text-white text-5.5xl font-bold text-center">
            Search for <span class="text-lightgreen">7,000</span> dataset on
            NASA
          </h2>
          <h4
            class="sub-search-title mb-6 text-2xl text-white font-inter font-normal text-center"
          >
            NASA's Earth science data archives over 7,000 datasets comprising
            over half a billion files.
          </h4>
          <div class="search-input-card flex items-center w-4/5">
            <div
              class="flex items-center justify-between bg-white rounded-1rem"
            >
              <i
                class="fa fa-search p-4 text-3xl text-gray-900"
                aria-hidden="true"
              ></i>
              <resizable-textarea ref="resize">
                <textarea
                  @keyup.enter="searchDataset"
                  ref="textarea"
                  class="search-text flex-grow text-3xl font-medium focus:outline-none py-12"
                  wrap="soft"
                  type="text"
                  maxlength="5000"
                  v-model="searchText"
                  placeholder="Search for Dataset"
                ></textarea>
              </resizable-textarea>
            </div>
          </div>
          <div class="my-4 text-lightgreen3 text-2xl font-inter text-center">
            <img
              src="../assets/image/star.svg"
              alt="star"
              class="inline mr-4"
            />EDO will using NLP techniques for optimize your search results
          </div>
          <div class="relative mb-6">
            <span
              @click.stop.prevent="showCalender = !showCalender"
              class="text-2xl font-semibold text-white font-inter leading-10 cursor-pointer"
              ><i class="fa fa-calendar mr-2" aria-hidden="true"></i>
              {{ renderDate }}
            </span>
            <v-date-picker
              v-click-outside="closeDatePicker"
              :dark="true"
              :show-current="false"
              @change="dateCheck"
              v-if="showCalender"
              class="calender-body min-w-290px absolute z-20 border border-black"
              v-model="dates"
              range
            >
            </v-date-picker>
          </div>
          <div
            class="rounded-1rem px-32 py-4 bg-lightgreen text-2xl font-normal font-inter text-white cursor-pointer"
            aria-hidden="true"
            @click="searchDataset"
          >
            Search
          </div>
          <h3 class="mt-6 text-white font-medium text-3xl leading-10">
            Top Datasets Searches
          </h3>
          <div
            class="keyword-card flex items-center justify-center sm:flex-col md:flex-row mt-4 text-2xl text-white font-normal"
          >
            <div
              v-for="keyword in defaultKeyWordList"
              :key="keyword"
              @click="defaultKeyToSearchText(keyword)"
              class="p-2 mx-4 border-solid border border-white rounded-lg cursor-pointer sm:mb-4 md:mb-0"
            >
              {{ keyword }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="'search-result'" class="search-header w-full">
      <header class="header-bg py-10 w-full">
        <div class="top-card mx-auto py-8 w-4/5 text-white font-normal">
          <router-link
            class="flex items-center"
            :to="{ name: 'RecommendView' }"
          >
            <div class="source-link">
              <img
                src="../assets/image/nasalogo_black.png"
                alt="NASA"
                width="50"
                height="40"
              />
            </div>
            <div class="text-2xl ml-4 leading-12">
              Welcome to Earth Dataset Odyssey
            </div>
          </router-link>
        </div>
      </header>

      <!-- search card -->
      <div class="search-container_result relative mb-40 w-full">
        <div
          class="search-card_result absolute flex flex-col items-center mx-auto py-12 w-4/5 rounded-1rem bg-deepblue"
        >
          <div
            class="search-input-card flex items-center bg-white w-4/5 rounded-1rem"
          >
            <i
              class="fa fa-search p-4 text-3xl text-gray-900"
              aria-hidden="true"
            ></i>
            <input
              @keyup.enter="searchDataset"
              ref="search_input"
              class="flex-grow py-3 text-3xl font-medium break-words"
              style="text-wrap: unrestricted"
              type="text"
              v-model="searchText"
              placeholder="Search for Dataset"
            />
            <div
              class="justify-self-end rounded-full mx-6 px-6 py-2 bg-lightgreen text-2xl font-normal font-inter text-white cursor-pointer"
              aria-hidden="true"
              @click="searchDataset"
            >
              Search
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Date from "@/modules/DateFormat.js"
import ResizableTextarea from "@/components/ResizableTextarea"
import { mapGetters } from "vuex"

export default {
  name: "Header",
  components: {
    ResizableTextarea,
  },
  data() {
    const init_date = this.initDatePickerData()
    return {
      ...init_date,
      searchText: "",
      defaultKeyWordList: [
        "EARTH SCIENCE",
        "SPECTIRAL ENGINEERING",
        "INFRAED WAVELENGTHS",
      ],
    }
  },
  // watch: {
  //   renderDate: {
  //     handler() {
  //       if (this.dates.filter((el) => el.length > 0).length !== 2) return
  //       //  if(   this.dates[1])
  //       Date.parse(temp1[0]) <
  //     },
  //     deep: true,
  //   },
  // },
  computed: {
    ...mapGetters({
      dataListURL: "getDataListURL",
    }),
    current_route_name() {
      return this.$route.name
    },
    renderDate() {
      if (this.dates.filter((el) => el.length > 0).length === 0) {
        return "Anytime"
      }
      const existElement = (ele) => {
        if (ele && ele.length > 0) {
          return true
        }
        return false
      }

      const start_time = existElement(this.dates[0]) ? this.dates[0] : "_"
      const end_time = existElement(this.dates[1]) ? this.dates[1] : "_"
      return `${start_time} To ${end_time}`
    },
  },
  methods: {
    initDatePickerData() {
      return {
        dates: ["", ""],
        showCalender: false,
      }
    },
    dateCheck() {
      if (this.dates.filter((el) => el.length > 0).length === 0) {
        return
      }

      if (Date.parse(this.dates[1]) < Date.parse(this.dates[0])) {
        this.dates[1] = ""
      }
    },
    triggerInput() {
      this.$nextTick(() => {
        this.$refs.resize.$el.dispatchEvent(new Event("input"))
      })
    },
    closeDatePicker() {
      this.showCalender = false
    },
    dateFormat(classes, date) {
      if (!classes.disabled) {
        classes.disabled = date.getTime() < new Date()
      }
      return classes
    },
    updateValues() {
      console.log("update")
    },
    checkOpen() {
      console.log("toggle")
    },
    searchDataset() {
      if (this.$route.name !== "SearchResult")
        this.$router.push({ name: "SearchResult" })
      this.$store.dispatch("set_searchKeyword", {
        searchText: this.searchText,
        searchTime: this.dates,
      })
    },
    defaultKeyToSearchText(keyword) {
      this.searchText = keyword
    },
  },
}
</script>

<style lang="scss">
@import url("../assets/styles/_base.css");
@import url("../assets/styles/_input.css");

::v-deep .calender-body .v-picker {
  color: black;
  position: absolute;
}

::v-deep .calender-body > .v-picker__title {
  color: #000000;
}

.header-bg {
  background-image: url("../assets/image/headerCover.png");
  background-size: auto;
  background-position: center;
  background-color: #000000;
}
.search-container {
  height: 20rem;
}
// .search-card {
//   left: 50%;
//   bottom: 10%;
//   transform: translateX(-50%);
// }
.search-card_result {
  left: 50%;
  transform: translateX(-50%) translateY(-30%);
}
@media (min-height: 1000px) {
  .search-card {
    left: 50%;
    bottom: 20%;
    transform: translateX(-50%);
  }
  .search-container {
    height: 12rem;
  }
}

.search-text {
  resize: none;
  max-height: 20rem;
}
</style>


