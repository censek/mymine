<template>
  <v-container>
    <div class="myCard">
      <v-row :align="alignment" :justify="justify" class="mySearch">
        <v-col cols="12" md="6">
          <v-text-field label="Solo" solo placeholder="你想知道哪个城市的天气咧 ☁❓" v-model="city"></v-text-field>
        </v-col>
        <v-col cols="12" md="1">
          <v-btn text icon color="indigo" @click="search()">
            <v-icon>mdi-star</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row :align="alignment" :justify="justify" class="myPic" v-show="picIsShow">
        <v-col cols="12" md="4">
          <img src="../../assets/weather.jpeg" alt="我的超能力不见了，直接点星星吧" width="300px" />
        </v-col>
      </v-row>
      <v-row :align="alignment" :justify="justify" v-show="tipIsShow">
        <v-col cols="12" md="7">
          <div class="myTip">
            对不起，小仙女能力有限，搜索不到此（{{city}}）地。
            <br />
            <br />【一定要点击小星星喔🌟】
          </div>
        </v-col>
      </v-row>
      <v-row :align="alignment" :justify="justify" v-show="weatherTableIsShow">
        <v-col cols="12" md="9">
          <v-data-iterator
            :items="items"
            :items-per-page.sync="itemsPerPage"
            :footer-props="{ itemsPerPageOptions }"
          >
            <template v-slot:default="props">
              <v-row>
                <v-col v-for="item in props.items" :key="item.date" cols="12" sm="6" md="4" lg="3">
                  <v-card>
                    <v-card-title>
                      <h4>{{ item.date }}</h4>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-list dense>
                      <v-list-item>
                        <v-list-item-content>天气 ☁️：</v-list-item-content>
                        <v-list-item-content class="align-end">{{ item.type }}</v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>最高温度 🌡️：</v-list-item-content>
                        <v-list-item-content class="align-end">{{ item.high }}</v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>最低温度 🌡：</v-list-item-content>
                        <v-list-item-content class="align-end">{{ item.low }}</v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>风力 🌀：</v-list-item-content>
                        <v-list-item-content class="align-end">{{ item.fengli }}</v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-card>
                </v-col>
              </v-row>
            </template>
          </v-data-iterator>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>
<script>
export default {
  name: "myWeather",
  data() {
    return {
      alignment: "center",
      justify: "center",
      city: "",
      picIsShow: true,
      tipIsShow: false,
      weatherTableIsShow: false,
      itemsPerPageOptions: [4, 8],
      itemsPerPage: 4,
      items: []
    };
  },
  methods: {
    getWeather() {
      this.$axios({
        methods: "get",
        url: "http://wthrcdn.etouch.cn/weather_mini?city=" + this.city
      }).then(res => {
        if (res.data.data == undefined) {
          this.weatherTableIsShow = false;
          this.tipIsShow = true;
          return;
        }
        this.tipIsShow = false;
        this.weatherTableIsShow = true;
        this.items = res.data.data.forecast.map(
            iterator => {
              return {
                date: iterator.date,
                type: iterator.type,
                high: iterator.high.split(" ")[1],
                low: iterator.low.split(" ")[1],
                fengli: iterator.fengli.substring(9).split("]")[0]
              };
            }
          );
        // this.items = res.data.data.forecast;
      });
    },
    search() {
      if (this.city.length == 0) {
        return false;
      }
      this.getWeather();
      this.picIsShow = false;
      this.weatherTable = true;
    }
  }
};
</script>
<style scoped>
.myCard {
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  width: 98%;
  padding-bottom: 150px;
}
.container {
  padding: 0;
}
.mySearch {
  padding-top: 30px;
}
.myCard /deep/ .v-text-field__details {
  display: none;
}
.myPic {
  padding-top: 40px;
}
.myTip {
  background-color: #E5E5F1;
  padding: 10px 20px;
  margin-top: 25px;
}
</style>