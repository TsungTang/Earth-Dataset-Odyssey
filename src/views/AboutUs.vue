<template>
  <div class="aboutus-container w-full mb-24">
    <div
      class="api-card mx-auto mt-6 md:w-3/5 sm:w-full md:px-0 sm:px-4 text-current"
    >
      <h2 class="api-title sm:text-5xl md:text-7xl font-bold">About Us</h2>
      <div class="flex flex-wrap">
        <div class="flex items-center mx-20 sm:my-16 md:my-10">
          <a class="mr-10" :href="github + '/bonzoyang'" target="_blank">
            <img
              class="rounded-full"
              src="@/assets/image/profile/Yu.png"
              alt=""
            />
          </a>
          <div>
            <h2 class="text-24R font-bold leading-12 mb-6">Yu Chun Yang</h2>
            <ul class="list-none text-current text-2xl font-normal">
              <li>Data Analyst</li>
              <li>Back End Dev.</li>
            </ul>
          </div>
        </div>

        <div class="flex items-center mx-20 sm:my-16 md:my-10">
          <a class="mr-10" :href="github + '/s8371112345678'" target="_blank">
            <img
              class="rounded-full"
              src="@/assets/image/profile/Tsao.png"
              alt=""
            />
          </a>
          <div>
            <h2 class="text-24R font-bold leading-12 mb-6">Tsao Hao Chun</h2>
            <ul class="list-none text-current text-2xl font-normal">
              <li>Data Analyst</li>
            </ul>
          </div>
        </div>

        <div class="flex items-center mx-20 sm:my-16 md:my-10">
          <a class="mr-10" :href="github + '/TsungTang'" target="_blank">
            <img
              class="rounded-full"
              src="@/assets/image/profile/Tang.png"
              alt=""
            />
          </a>
          <div>
            <h2 class="text-24R font-bold leading-12 mb-6">Lee, Tsung-Tang</h2>
            <ul class="list-none text-current text-2xl font-normal">
              <li>Front End Developer</li>
            </ul>
          </div>
        </div>

        <div class="flex items-center mx-20 sm:my-16 md:my-10">
          <a class="mr-10" :href="github + '/sophiejiang'" target="_blank">
            <img
              class="rounded-full"
              src="@/assets/image/profile/Jiang.png"
              alt=""
            />
          </a>
          <div>
            <h2 class="text-24R font-bold leading-12 mb-6">Jiang, Feng-Xiu</h2>
            <ul class="list-none text-current text-2xl font-normal">
              <li>UIUX Designer</li>
            </ul>
          </div>
        </div>

        <div class="flex items-center mx-20 sm:my-16 md:my-10">
          <a class="mr-10" :href="github + '/nondayo'" target="_blank">
            <img
              class="rounded-full"
              src="@/assets/image/profile/Li.png"
              alt=""
            />
          </a>
          <div>
            <h2 class="text-24R font-bold leading-12 mb-6">Li, Cheng-En</h2>
            <ul class="list-none text-current text-2xl font-normal">
              <li>Data Analyst</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      github: "https://github.com/",
    }
  },
}
</script>

<style>
</style>
