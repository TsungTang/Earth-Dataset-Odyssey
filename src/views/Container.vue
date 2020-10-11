<template>
  <div class="main-container w-full min-h-screen">
    <Header v-if="current_route_name !== 'DataInfo'" />
    <router-view></router-view>
    <Footer class="main-footer sm:hidden md:contents" />
  </div>
</template>

<script>
import Header from "./Header"
import Footer from "./Footer"
// import DataList from "@/components/DataList"

export default {
  name: "Container",
  components: {
    Header,
    Footer,
    // DataList,
  },
  computed: {
    current_route_name() {
      return this.$route.name
    },
  },
}
</script>

<style>
.main-container {
  background-color: #f7f7f7;
}
</style>
