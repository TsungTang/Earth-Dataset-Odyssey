<template>
  <div class="main-container w-full min-h-screen">
    <Header v-if="current_route_name !== 'DataInfo'" />
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./Header"
// import DataList from "@/components/DataList"

export default {
  name: "Container",
  components: {
    Header,
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
  background-color: #fff;
}
</style>
