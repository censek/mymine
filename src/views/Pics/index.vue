<template>
  <v-container>
    <div>
      <v-row>
        <v-col cols="9">
          <v-card class="mx-auto" max-width="800">
            <v-container fluid>
              <v-row dense>
                <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
                  <v-card>
                    <v-img :src="card.src" class="white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="300px"></v-img>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col cols="3">
          <!-- <v-card raised class="upload_card">
            <v-file-input label="快来传图啦！" prepend-icon="mdi-cloud-upload" color="blue-grey"></v-file-input>
            <v-btn depressed small>确认上传</v-btn>
          </v-card>-->
          <v-btn color="blue-grey" class="ma-2 white--text" @click="uploadPic()">
            上传图片
            <v-icon right dark>mdi-cloud-upload</v-icon>
          </v-btn>
          <!-- <input @change="uploadPhoto($event)" type="file" /> -->
        </v-col>
      </v-row>
    </div>
    <div>111</div>
    <div class="vue-uploader">
      <div class="file-list">
        <section v-for="(file, index) of files" class="file-item draggable-item" :key="file.name">
          <img :src="file.src" alt="" ondragstart="return false;">
          <span class="file-remove" @click="remove(index)">+</span>
        </section>
        <section v-if="status == 'ready'" class="file-item">
          <div @click="add" class="add"></div>
        </section>
      </div>
      <section v-if="files.length != 0" class="upload-func">
        <div class="progress-bar">
          <section v-if="uploading" :width="(percent * 100) + '%'">{{(percent * 100) + '%'}}</section>
        </div>
        <div class="operation-box">
          <button v-if="status == 'ready'" @click="submit">上传</button>
          <button v-if="status == 'finished'" @click="finished">完成</button>
        </div>
      </section>
      <input type="file" @change="fileChanged" ref="file" multiple="multiple" accept="image/jpg,image/jpeg,image/png,image/bmp">
    </div>
  </v-container>
</template>
<script>
export default {
  name: "myPics",
  data() {
    return {
      cards: [
        {
          src: require("../../assets/pic1.jpeg"),
          flex: 6
        },
        {
          src: require("../../assets/pic2.jpeg"),
          flex: 6
        },
        {
          src: require("../../assets/pic3.jpeg"),
          flex: 6
        },
        {
          src: require("../../assets/pic4.jpeg"),
          flex: 6
        },
        {
          src: require("../../assets/pic5.jpeg"),
          flex: 6
        },
        {
          src: require("../../assets/pic6.jpeg"),
          flex: 6
        },
        {
          src: require("../../assets/pic7.jpeg"),
          flex: 12
        }
      ],
      status: "ready",
      files: [],
      point: {},
      uploading: false,
      percent: 0
    };
  },
  methods: {
    uploadPic() {
      alert("再等等，此功能正疯狂建设中……");
    },
    add() {
      this.$refs.file.click();
    },
    submit() {
      console.log(this.files);
      // if (this.files.length === 0) {
      //   console.warn('no file!');
      //   return
      // }
      var that = this;
      // 这里是OSS
      const client = new OSS.Wrapper({
        region: "oss-cn-hangzhou",
        accessKeyId: "your access key",
        accessKeySecret: "your access secret",
        bucket: "your bucket name"
      });
      const fNum = this.files;
      for (var i = 0; i < fNum.length; i++) {
        var f = fNum[i].file;
        console.log(f);
        const Name = f.name;
        console.log(Name);
        const suffix = Name.substr(Name.indexOf("."));
        const obj = this.timestamp();
        const storeAs = "header/" + obj + suffix; // 路径+时间戳+后缀名
        console.log(storeAs);
        client.multipartUpload(storeAs, f).then(function(result) {
          console.log(result.res.requestUrls);
        });
      }
    },
    // 时间戳
    timestamp: function() {
      const time = new Date();
      const y = time.getFullYear();
      const m = time.getMonth() + 1;
      const d = time.getDate();
      const h = time.getHours();
      const mm = time.getMinutes();
      const s = time.getSeconds();
      const ms = time.getMilliseconds();
      return (
        "" +
        y +
        this.Add0(m) +
        this.Add0(d) +
        this.Add0(h) +
        this.Add0(mm) +
        this.Add0(s) +
        this.Add0(ms)
      );
    },
    Add0: function(m) {
      return m < 10 ? "0" + m : m;
    },

    finished() {
      this.files = [];
      this.status = "ready";
    },
    remove(index) {
      this.files.splice(index, 1);
    },
    fileChanged() {
      const list = this.$refs.file.files;
      for (let i = 0; i < list.length; i++) {
        if (!this.isContain(list[i])) {
          const item = {
            name: list[i].name,
            size: list[i].size,
            file: list[i]
          };
          this.html5Reader(list[i], item);
          this.files.push(item);
        }
      }
      this.$refs.file.value = "";
    },
    // 将图片文件转成BASE64格式
    html5Reader(file, item) {
      const reader = new FileReader();
      reader.onload = e => {
        this.$set(item, "src", e.target.result);
      };
      reader.readAsDataURL(file);
    },
    isContain(file) {
      return this.files.find(
        item => item.name === file.name && item.size === file.size
      );
    }
  }
};
</script>
<style scoped>
.upload_card {
  height: 110px;
  padding-left: 15px;
  padding-right: 15px;
}
.vue-uploader {
  border: 1px solid #e5e5e5;
}
.vue-uploader .file-list {
  padding: 10px 0px;
}
.vue-uploader .file-list:after {
  content: "";
  display: block;
  clear: both;
  visibility: hidden;
  line-height: 0;
  height: 0;
  font-size: 0;
}
.vue-uploader .file-list .file-item {
  float: left;
  margin-left: 10px;

  position: relative;
  width: 150px;
  text-align: center;
}
.vue-uploader .file-list .file-item img {
  width: 150px;
  height: 150px;
  border: 1px solid #ececec;
}
.vue-uploader .file-list .file-item .file-remove {
  position: absolute;
  right: 4px;
  display: none;
  top: 4px;
  width: 20px;
  height: 20px;
  font-size: 20px;
  text-align: center;
  color: white;
  cursor: pointer;
  line-height: 20px;
  border-radius: 100%;
  transform: rotate(45deg);
  background: rgba(0, 0, 0, 0.5);
}
.vue-uploader .file-list .file-item:hover .file-remove {
  display: inline;
}
.vue-uploader .file-list .file-item .file-name {
  margin: 0;
  height: 40px;
  word-break: break-all;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.vue-uploader .add {
  width: 150px;
  height: 150px;
  float: left;
  text-align: center;
  line-height: 150px;
  font-size: 30px;
  cursor: pointer;
  background: url("../../assets/weather.jpeg") no-repeat;
  background-size: 100% 100%;
}
.vue-uploader .upload-func {
  display: flex;
  padding: 10px;
  margin: 0px;
  background: #f8f8f8;
  border-top: 1px solid #ececec;
}
.vue-uploader .upload-func .progress-bar {
  flex-grow: 1;
}
.vue-uploader .upload-func .progress-bar section {
  margin-top: 5px;
  background: #00b4aa;
  border-radius: 3px;
  text-align: center;
  color: #fff;
  font-size: 12px;
  transition: all 0.5s ease;
}
.vue-uploader .upload-func .operation-box {
  flex-grow: 0;
  padding-left: 10px;
}
.vue-uploader .upload-func .operation-box button {
  padding: 4px 12px;
  color: #fff;
  background: #007acc;
  border: none;
  border-radius: 2px;
  cursor: pointer;
}
.vue-uploader > input[type="file"] {
  display: none;
}
</style>