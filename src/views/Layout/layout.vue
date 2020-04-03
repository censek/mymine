<!--  app的框架结构-->
<template>
  <v-row>
    <v-col class="my_left">
      <side-bar></side-bar>
    </v-col>
    <v-col class="my_right">
      <v-row>
        <v-col md="12">
          <top-bar></top-bar>
        </v-col>
      </v-row>
      <v-row>
        <v-col md="12">
          <app-main></app-main>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import appMain from "./content/appMain";
import sideBar from "./content/sideBar";
import topBar from "./content/topBar";
export default {
  data() {
    return {};
  },
  components: {
    appMain,
    sideBar,
    topBar
  }
};
</script>
<style scoped>
.my_left {
  width: 280px !important;
  padding-right: 0;
  flex-grow: 0;
}
.my_right {
  width: 100% !important;
}
</style>