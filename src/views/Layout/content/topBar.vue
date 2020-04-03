<template>
  <v-row>
    <v-card class="my_top">
      <div class="guide">📍➡ {{ guide }}</div>
      <span class="text">抬头看看阳光还在星星闪耀，你又有什么理由不努力呢？💛</span>
      <div class="heart">
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
      </div>
    </v-card>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  computed: {
    guide() {
      return this.$route.name;
    }
  }
};
</script>
<style scoped>
.my_top {
  height: 50px;
  width: 98%;
  text-align: center;
}
.guide {
  float: left;
  line-height: 50px;
  font-weight: bolder;
  font-size: 13px;
  padding-left: 8px;
}
.text {
  line-height: 50px;
  font-size: 12px;
}
.heart {
  float: right;
  padding-top: 7px;
  padding-right: 10px;
}
</style>