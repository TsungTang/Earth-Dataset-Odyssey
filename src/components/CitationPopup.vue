<template>
  <div
    class="citation-outside-container flex flex-col justify-center z-10 w-screen h-screen bg-covergray"
  >
    <div
      v-click-outside="closeCitationComp"
      class="sm:w-full md:w-4/5 lg:w-3/5 min-h-30vh max-h-80vh overflow-y-auto m-auto bg-white p-8 shadow-card rounded-1rem"
    >
      <header
        class="flex sm:flex-col md:flex-row justify-between max-h-80vh mb-10"
      >
        <h2
          class="sm:w-full md:w-4/6 text-24R font-bold sm:text-left md:text-justify"
        >
          The follwing {{ citationObj.citation.length }} publications cited the
          dataset
          <span class="text-lightgreen">{{ citationObj.title }} </span>
        </h2>
        <h4
          @click="closeCitationComp"
          class="text-lightgreen text-2xl font-medium cursor-pointer sm:mt-6 md:mt-0"
        >
          Close
        </h4>
      </header>
      <div>
        <table class="citation-table">
          <tr class="bg-lightgray text-3xl font-bold">
            <th align="left" class="px-8">Year</th>
            <th align="left" class="px-10 border-2 border-white">Citation</th>
          </tr>
          <tr v-for="cite in citationObj.citation" :key="'cite' + cite">
            <td align="center" class="text-3xl font-bold">
              {{ get_year(cite) }}
            </td>
            <td
              class="pl-10 text-2xl font-normal font-inter sm:text-left md:text-justify"
            >
              {{ cite }}
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    citationObj: {
      type: Object,
    },
  },
  methods: {
    closeCitationComp() {
      this.$emit("close-citation-comp")
    },
    get_year(fullCitation) {
      try {
        const re = /((?<=\.\s)[0-9]{4}(?=\.)|((?<=\()[0-9]{4}(?=)))/
        const year = re.exec(fullCitation)
        return year[0]
      } catch (error) {
        return ""
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.citation-outside-container {
  display: fixed;
  left: 0%;
  top: 0%;
}
.citation-table {
  border-collapse: separate;
  border-spacing: 0 5px;
}
</style>
