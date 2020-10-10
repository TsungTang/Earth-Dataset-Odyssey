<template>
  <div class="datalist-container w-full h-full mb-40">
    <div class="w-4/5 mx-auto">
      <div class="disasters-container w-full">
        <h2 class="subtitle mt-6 text-4xl font-bold">
          Recent
          <span class="text-lightgreen">Natural Disasters</span> datasets
        </h2>
        <div
          class="disaster-card flex sm:flex-wrap md:flex-wrap lg:flex-no-wrap"
        >
          <a
            class="disaster-subcard flex flex-col bg-white shadow-card rounded-lg font-inter text-current hover:text-opacity-75 sm:mb-8 md:mb-0"
            :class="{ 'mr-8': index !== 3 }"
            v-for="(disaster, index) in disasterData"
            :key="index + disaster.title"
            href="javascript:void(0);"
            @click="toDisasterPage(disaster.url)"
          >
            <img class="rounded-t-lg" :src="disaster.img" alt="" height="122" />
            <div class="flex flex-col justify-between p-4">
              <div>
                <h3 class="mt-3 text-4xl font-bold">{{ disaster.title }}</h3>
                <div
                  class="descriptive text-2xl font-inter break-normal text-justify"
                >
                  {{ cutLongString(disaster.des) }}
                </div>
              </div>
              <span
                @click.self.stop.prevent="disasterRelatedData(disaster)"
                class="text-lightgreen p-3 text-2xl font-medium hover:text-hov-lightgreen"
                >{{
                  "Showing related datasets (" +
                  disaster.relatedDataCounts +
                  ")"
                }}</span
              >
            </div>
          </a>
        </div>
      </div>
      <div ref="disasterlist"></div>
      <RelatedList
        v-if="showRelatedDataset"
        class="my-12"
        :inputObj="disasterObj"
        :type="'disasterToData'"
        @hideRelatedDataList="hideRelatedDataList"
      />
      <RelatedList class="my-12" :type="'dataToData'" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import RelatedList from "@/components/RelatedList"

export default {
  name: "RecommendView",
  components: {
    RelatedList,
  },
  data() {
    return {
      disasterObj: {},
      showRelatedDataset: false,
      disasterData: [
        {
          title: "California Continues to Burn",
          id: "article_0003",
          url:
            "https://earthobservatory.nasa.gov/images/147215/california-continues-to-burn",
          img:
            "https://eoimages.gsfc.nasa.gov/images/imagerecords/147000/147215/california_oli_2020245.jpg",
          des: `August 2020 brought a “lightning siege” in California that sparked a rash of wildfires across the state. By early September, nearly 14,000 lightning strikes had ignited 900 fires that have burned more than 1.5 million acres.

          More than a quarter million of those acres burned within the August Complex, a fire located northwest of Willows, California, in Mendocino National Forest and adjacent areas. Smoke still streamed from the complex on September 1, when the Operational Land Imager (OLI) on Landsat 8 acquired these images. The first image is natural color and shows smoke blanketing numerous communities in Mendocino County.`,
          relatedDataCounts: 20,
        },
        {
          title: "Extreme Monsoon Rains in Pakistan",
          id: "article_0006",
          url: "https://earthobservatory.nasa.gov/images/147350/spalte-splits",
          img:
            "https://eoimages.gsfc.nasa.gov/images/imagerecords/147000/147330/pakistanflooding_tmo_2020265.jpg",
          des: `A heavy monsoon season has caused fatal flooding across Pakistan in 2020. More than 400 people have died since mid-June; another 400 were injured; and more than 200,000 homes were damaged or destroyed.

The Sindh province in southeastern Pakistan, which received historic amounts of rain, has been the most affected region. The images above show a portion of Sindh on (September 21, 2020) compared to the same time last year (September 21, 2019). The false-color images, acquired by the Moderate Resolution Imaging Spectroradiometer (MODIS) on NASA’s Terra satellite, use a combination of infrared and visible light (bands 7-2-1) to make it easier to see the boundary between water and land. Water appears navy blue and black; vegetation is bright green.`,
          relatedDataCounts: 20,
        },
        {
          title: "Fire Scorches Southern California",
          id: "article_0002",
          url:
            "https://earthobservatory.nasa.gov/images/147324/bobcat-fire-scorches-southern-california",
          img:
            "https://eoimages.gsfc.nasa.gov/images/imagerecords/147000/147324/bobcatfire752_oli_2020265%20(1).jpg",
          des: `After burning more than 180 square miles (460 square kilometers) of the San Gabriel Mountains in September 2020, the Bobcat fire now ranks among the largest fires on record for Los Angeles County, California. The blaze began on September 6 near Cogswell Dam, and grew steadily over the next three weeks in the midst of unusually hot, dry conditions.

“Strong winds that have shifted direction several times over the course of the fire helped it spread over such a large area,” explained Natasha Stavros, a wildfire expert with NASA’s Jet Propulsion Laboratory. “And the fire is burning on steep terrain with limited access to roads, which made it challenging to contain.”`,
          relatedDataCounts: 20,
        },
        {
          title: "Record Flooding in Sudan",
          id: "article_0008",
          url:
            "https://earthobservatory.nasa.gov/images/147288/record-flooding-in-sudan",
          img:
            "https://eoimages.gsfc.nasa.gov/images/imagerecords/147000/147288/sudanflooding_oli_2016267.jpg",
          des: `A wetter-than-usual rainy season has devastated communities across Sudan in 2020, as the Nile River and some of its tributaries reached their highest levels in 100 years.

Widespread flooding has claimed at least 100 lives and damaged or destroyed more than 110,000 homes since mid-July 2020, according to United Nations Office for the Coordination of Humanitarian Affairs (OCHA). The office reported that more people have been affected by flooding in Sudan this year—more than 650,000—than any of the past seven rainy seasons. The Sudanese government declared a three-month national state of emergency on September 4.`,
          relatedDataCounts: 20,
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      baseImageURL: "getBaseImageURL",
      responseData: "get_responseData",
    }),
  },
  methods: {
    cutLongString(longString) {
      if (longString.length > 80) {
        longString = longString.slice(0, 160) + "..."
      }
      return longString
    },
    toDisasterPage(url) {
      window.open(url)
    },
    goto(refName) {
      var element = this.$refs[refName]
      console.log(element)
      var top = element.offsetTop
      window.scrollTo(0, top)
    },
    disasterRelatedData(disaster) {
      this.disasterObj = disaster
      this.disasterObj.time = new Date().format("yyyy-MM-dd hh:mm:ss")
      this.disasterObj.from = "disaster"

      this.showRelatedDataset = true

      setTimeout(() => {
        this.goto("disasterlist")
      }, 300)
    },
    hideRelatedDataList() {
      this.disasterObj = {}
      this.showRelatedDataset = false
    },
    updateBlogRecode() {
      const newRecodeObj = {
        id: this.disasterObj.id,
        time: new Date().format("yyyy-MM-dd hh:mm:ss"),
      }
      this.$store.dispatch("push_new_recode", {
        recodeType: "blog",
        newRecodeObj,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.data-card {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
.descriptive {
  letter-spacing: -0.01em;
  line-height: 24px;
}
</style>
