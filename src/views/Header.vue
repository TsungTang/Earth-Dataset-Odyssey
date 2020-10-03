<template>
  <div class="header-container flex flex-col items-center w-full">
    <div class="header-bg w-full min-h-50vh">
      <div class="top-card w-4/5 mx-auto mt-12 text-white font-normal">
        <a :href="dataListURL" target="_blank" class="source-link">
          <img
            src="../assets/image/nasalogo_black.png"
            alt="NASA"
            width="50"
            height="40"
          />
        </a>
        <div class="text-2xl mt-2 leading-12">Welcome to NASA</div>
        <div class="text-7xl">Earthling</div>
      </div>
    </div>
    <div class="search-container relative w-full">
      <div
        class="search-card absolute flex flex-col items-center py-12 w-4/5 rounded-1rem bg-deepblue"
      >
        <h2 class="mb-4 text-white text-5.5xl font-bold">
          Search for <span class="text-lightgreen">7,000</span> dataset on NASA
        </h2>
        <h4
          class="sub-search-title mb-6 text-2xl text-white font-inter font-normal"
        >
          NASA's Earth science data archives over 7,000 datasets comprising over
          half a billion files.
        </h4>
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
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: "Header",
  data() {
    return {
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
  },
  methods: {
    searchDataset() {
      console.log("start search ", this.searchText)
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


