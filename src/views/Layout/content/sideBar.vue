<template>
  <v-container fluid>
    <div class="side_bar">
      <v-navigation-drawer :hide-overlay="hideOverlay">
        <v-list-item>
          <v-list-item-content @click="goHome()">
            <v-list-item-title class="title">叽里咕噜嘛咪嘛呀</v-list-item-title>
            <v-list-item-subtitle>️</v-list-item-subtitle>
            <v-list-item-subtitle>&nbsp;小仙女聚集地🧚‍♀ ️</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <!-- 分割线 -->
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-content></v-list-item-content>
        </v-list-item>
        <v-list dense nav>
          <v-list-item link @click="goNote()">
            <v-list-item-icon>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>便签本</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link @click="goPics()">
            <v-list-item-icon>
              <v-icon>mdi-image</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>图片库</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link @click="goMap()">
            <v-list-item-icon>
              <v-icon>mdi-home-city</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>看地图</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link @click="goWeather()">
            <v-list-item-icon>
              <v-icon>mdi-magnify</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>知天气</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-help-box</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>未完待续……</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <div class="date">
          <v-date-picker no-title width="220"></v-date-picker>
        </div>
      </v-navigation-drawer>
    </div>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      hideOverlay: true
    };
  },
  methods: {
    goHome() {
      this.$router.push("/");
    },
    goNote() {
      this.$router.push("/note");
    },
    goPics() {
      this.$router.push("/pics");
    },
    goMap() {
      this.$router.push("/map");
    },
    goWeather() {
      this.$router.push("/weather");
    }
  }
};
</script>
<style scoped>
@media screen and (max-height: 740px) {
  .date {
    display: none;
  }
}
.container--fluid {
  height: 100% !important;
}
.side_bar {
  height: 100%;
  position: relative;
}
.blank {
  height: 20%;
}
.date {
  margin-left: 8px;
  position: absolute;
  bottom: 20px;
}
</style>