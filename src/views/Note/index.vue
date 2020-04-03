<template>
  <v-container>
    <div class="button_insert">
      <v-row align="center" justify="end">
        <v-btn class="mx-2" fab dark color="indigo">
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </v-row>
    </div>

    <div class="note_content">
      <v-row align="center">
        <v-expansion-panels>
          <v-expansion-panel v-for="(item,i) in items" :key="i">
            <v-expansion-panel-header>
              {{items[i].title}}
              <template v-slot:actions>
                <v-icon color="indigo" @click="edit()">mdi-pencil-circle</v-icon>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>{{items[i].content}}</v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "myNote",
  data() {
    return {
      panel: "",
      items: [
        {
          id: "001",
          title: "便签1",
          content: "内容1"
        },
        {
          id: "002",
          title: "便签2",
          content: "内容2"
        },
        {
          id: "003",
          title: "便签3",
          content: "内容3"
        }
      ]
    };
  },
  methods: {
    edit() {
      console.log("kaishibianji"+this.items[i].id);
    }
  } 
};
</script>
<style scoped>
.container {
  padding: 0;
  /* width: 94%; */
}
.button_insert {
  margin: 30px 50px 20px 50px;
}
.note_content {
  margin: 0 50px 20px 10px;
}
</style>