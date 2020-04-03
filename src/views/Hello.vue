<template>
  <v-container fluid>
    <div class="hello">
      <v-row justify="center">
        <h1>{{ msg }}</h1>
      </v-row>
      <v-row justify="center">
        <h1>👇</h1>
      </v-row>
      <v-row justify="center">
        <img src="../assets/cover.jpeg" class="img" alt="魔法传送门" @click="enter()" />
      </v-row>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "Hello",
  data() {
    return {
      msg: "这是一个魔法传送门 🚪"
    };
  },
  methods: {
    enter() {
      this.$router.push("/note");
    }
  }
};
</script>

<style scoped>
.container {
		height: 100%;
		background-color: #E4EEFE;
}
.hello {
  padding-top: 10%;
}
h1 {
  font-weight: bolder;
  padding-top: 5px;
}
.img {
  padding-top: 20px;
  width: 20%;
}
</style>
