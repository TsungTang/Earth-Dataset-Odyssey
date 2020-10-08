<template>
  <div class="header-container w-full">
    <div
      v-if="current_route_name === 'RecommendView'"
      class="flex flex-col items-center w-full"
    >
      <div class="header-bg w-full min-h-50vh">
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
      <div class="search-container relative w-full">
        <div
          class="search-card absolute flex flex-col items-center py-12 w-4/5 rounded-1rem bg-deepblue"
        >
          <h2 class="mb-4 text-white text-5.5xl font-bold">
            Search for <span class="text-lightgreen">7,000</span> dataset on
            NASA
          </h2>
          <h4
            class="sub-search-title mb-6 text-2xl text-white font-inter font-normal"
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
              <input
                @keyup.enter="searchDataset"
                ref="search_input"
                class="flex-grow py-3 text-3xl font-medium"
                type="text"
                v-model="searchText"
                placeholder="Search for Dataset"
              />
              <div class="relativew h-full border-l border-m-grapy py-4 px-6">
                <span
                  @click.stop.prevent="showCalender = !showCalender"
                  class="text-2xl font-inter leading-10 cursor-pointer"
                  ><i class="fa fa-calendar mr-2" aria-hidden="true"></i>
                  {{ renderDate }}
                </span>
                <v-date-picker
                  v-click-outside="closeDatePicker"
                  :dark="true"
                  v-if="showCalender"
                  class="calender-body min-w-290px absolute z-20 border border-black"
                  v-model="dates"
                  range
                >
                </v-date-picker>
              </div>
            </div>
            <div
              class="justify-self-end rounded-1rem mx-6 px-6 py-4 bg-lightgreen text-2xl font-normal font-inter text-white cursor-pointer"
              aria-hidden="true"
              @click="searchDataset"
            >
              Search
            </div>
          </div>
          <h3 class="mt-12 text-white font-medium text-3xl leading-10">
            Top Datasets Searches
          </h3>
          <div
            class="keyword-card flex items-center justify-center mt-4 text-2xl text-white font-normal"
          >
            <div
              v-for="keyword in defaultKeyWordList"
              :key="keyword"
              @click="defaultKeyToSearchText(keyword)"
              class="p-2 mx-4 border-solid border border-white rounded-lg cursor-pointer"
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
            <div class="text-2xl ml-6 leading-12">
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
              class="flex-grow py-3 text-3xl font-medium"
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

import { mapGetters } from "vuex"
export default {
  name: "Header",
  // components: {
  //   DateRangePicker,
  // },
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
    closeDatePicker() {
      this.showCalender = false
    },
    dateFormat(classes, date) {
      if (!classes.disabled) {
        classes.disabled = date.getTime() < new Date()
      }
      // return classes
    },
    updateValues() {
      console.log("update")
    },
    checkOpen() {
      console.log("toggle")
    },
    searchDataset() {
      console.log("start search ", this.searchText)
      if (this.$route.name !== "SearchResult")
        this.$router.push({ name: "SearchResult" })
      this.$store.dispatch("set_searchKeyword", this.searchText)
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
}
.search-container {
  height: 20rem;
}
.search-card {
  left: 50%;
  bottom: 10%;
  transform: translateX(-50%);
}
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
</style>


