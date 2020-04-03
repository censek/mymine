<template>
  <v-container>
    <div class="button-map">
      <v-btn color="depressed" large class="button-where" @click="zero()">看看地图🗺️</v-btn>
      <v-btn color="depressed" large class="button-where" @click="where()">我在哪里❓</v-btn>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn color="depressed" large v-on="on">我想去那❗️</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">路线搜索小能手</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    label="起点城市"
                    v-model="fillStartCity"
                    :error-messages="fillStartCityErrors"
                    required
                    @blur="$v.fillStartCity.$touch()"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    label="起点"
                    v-model="fillStart"
                    :error-messages="fillStartErrors"
                    required
                    @blur="$v.fillStart.$touch()"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    label="终点城市"
                    v-model="fillEndCity"
                    :error-messages="fillEndCityErrors"
                    required
                    @blur="$v.fillEndCity.$touch()"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    label="终点"
                    v-model="fillEnd"
                    :error-messages="fillEndErrors"
                    required
                    @blur="$v.fillEnd.$touch()"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*「起点/终点城市」可以是城市名或者城市编码；「起点/终点」指该城市里的具体地名，其参数可以是关键字、坐标点。</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close()">算了，我不去了</v-btn>
            <v-btn color="blue darken-1" text @click="go()">GoGOGo</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <baidu-map
      class="bm-view"
      :center="{lng: 116.404, lat: 39.915}"
      :zoom="15"
      :scroll-wheel-zoom="true"
    >
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
      <bm-driving
        :start="start"
        :end="end"
        :startCity="startCity"
        :endCity="endCity"
        :auto-viewport="true"
      />
    </baidu-map>
    <div class="myinfo">
      <p v-show="tipWhere">💡：点击地图右下角的图标进行定位。</p>
      <p v-show="tipGo">❌：对不起，小仙女能力有限，搜索不到你输入的地方。</p>
    </div>
  </v-container>
</template>
<script>
import { required } from "vuelidate/lib/validators";
export default {
  inject: ["reload"],
  name: "myMap",
  validations: {
    fillStartCity: { required },
    fillStart: { required },
    fillEndCity: { required },
    fillEnd: { required }
  },
  data() {
    return {
      tipWhere: false,
      dialog: false,
      start: "",
      end: "",
      startCity: "",
      endCity: "",

      fillStart: "",
      fillEnd: "",
      fillStartCity: "",
      fillEndCity: "",

      tipGo: false
    };
  },
  methods: {
    zero() {
      this.reload();
    },
    where() {
      this.tipWhere = true;
      setTimeout(() => {
        this.tipWhere = false;
      }, 3500);
    },
    go() {
      this.$v.$touch();
      if (
        this.fillStartCity == "" ||
        this.fillStart == "" ||
        this.fillEndCity == "" ||
        this.fillEnd == ""
      ) {
        return false;
      }

      this.dialog = false;
      this.start = this.fillStart;
      this.end = this.fillEnd;
      this.startCity = this.fillStartCity;
      this.endCity = this.fillEndCity;
      setTimeout(() => {
        this.tipGo = true;
      }, 2000);
      setTimeout(() => {
        this.tipGo = false;
      }, 5000);
    },
    close() {
      this.dialog = false;
      this.reload();
    }
  },
  computed: {
    fillStartCityErrors() {
      const errors = [];
      if (!this.$v.fillStartCity.$dirty) return errors;
      !this.$v.fillStartCity.required &&
        errors.push("为了 🧚‍♀️可以更准确的找到，请输入起点城市。");
      return errors;
    },
    fillStartErrors() {
      const errors = [];
      if (!this.$v.fillStart.$dirty) return errors;
      !this.$v.fillStart.required &&
        errors.push("为了 🧚‍♀️可以更准确的找到，请输入起点。");
      return errors;
    },
    fillEndCityErrors() {
      const errors = [];
      if (!this.$v.fillEndCity.$dirty) return errors;
      !this.$v.fillEndCity.required &&
        errors.push("为了 🧚‍♀️可以更准确的找到，请输入终点城市。");
      return errors;
    },
    fillEndErrors() {
      const errors = [];
      if (!this.$v.fillEnd.$dirty) return errors;
      !this.$v.fillEnd.required &&
        errors.push("为了 🧚‍♀️可以更准确的找到，请输入终点。");
      return errors;
    }
  }
};
</script>
<style scoped>
.container {
  text-align: center;
}
.container /deep/ .anchorBL {
  display: none;
}
.bm-view {
  width: 98%;
  height: 500px;
}
.button-map {
  margin-top: 60px;
  margin-bottom: 60px;
}
.button-where {
  margin-right: 80px;
}
.myinfo {
  width: 98%;
  margin-top: 60px;
}
</style>