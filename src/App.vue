<template>
  <v-app id="app">
    <!--路由管道标签，任何符合某一路由(route)信息的组件都会在这个标签内展示出来 -->
    <router-view v-if="isRouterAlive"></router-view>
  </v-app>
</template>

<script>
export default {
  name: "app",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  color: #2c3e50;
}
</style>
