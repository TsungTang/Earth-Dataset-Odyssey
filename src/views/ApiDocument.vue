<template>
  <div class="api-container w-full mb-64">
    <div
      class="api-card mx-auto mt-6 md:w-3/5 sm:w-full md:px-0 sm:px-4 text-current"
    >
      <h2 class="api-title text-7xl font-bold mb-4">Open API Document</h2>
      <div class="text-2xl mb-4 text-current font-inter">
        <div>EDO provides open Searching Dataset APIS to all users.</div>
        <div class="mb-4">You can easily use EDO's API service anywhere.</div>
      </div>

      <codemirror v-model="code" :options="cmOptions" class="min-h-10vh" />
      <div class="text-2xl text-current font-inter">
        <div class="my-6">
          Users only need to enter keywords or articles, EDO will recommend
          suitable data sets for you. Not only that, you can also search for
          datasets within a specific date.
        </div>
        <ul class="list-disc">
          <li class="leading-12">
            <span class="text-hov-lightgreen">&lt;KEY WORD&gt;</span>: Please
            fill in keywords or articles
          </li>
          <li class="leading-12">
            <span class="text-hov-lightgreen">&lt;STRAT TIME&gt;</span>: Please
            fill in starting time (format:
            <span class="text-hov-lightgreen">"yyyy-MM-dd"</span>)
          </li>
          <li class="leading-12">
            <span class="text-hov-lightgreen">&lt;END TIME&gt;</span>: Please
            fill in ending time (format:
            <span class="text-hov-lightgreen">"yyyy-MM-dd"</span>)
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { codemirror } from "vue-codemirror"
import "codemirror/lib/codemirror.css"

export default {
  components: {
    codemirror,
  },
  data() {
    return {
      code: `curl  -X POST http://35.206.243.204:5566/api/search 
             -L
             -H "Content-Type: application/json" 
             -d '{
             "keyword": <YOUR KEYWORD>
             "start_time": <START TIME>,
             "end_time": <END TIME>
             }'`,
      cmOptions: {
        tabSize: 6,
        mode: "text/x-sh",
        theme: "duotone-light",
        lineNumbers: true,
        line: true,
        readOnly: true,
      },
    }
  },
}
</script>

<style lang='scss' scoped>
</style>
