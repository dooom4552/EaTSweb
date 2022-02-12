<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AgencyList from "./AgencyList.vue";
import { mapGetters } from "vuex";

@Component({
  components: { AgencyList },
  computed: {
    ...mapGetters([
      "AccountInfo",
      // ...
    ]),
  },
})
export default class MainUser extends Vue {
  items: any[] = [
    { name: "Пользователи" },
    { name: "Учреждения" },
    { name: "Мероприятия" },
  ];
  tab: any = null;
  text: string =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  // @Watch("group")
  // onPropertyChanged(value: string, oldValue: string) {

  // }
}
</script>
<template>
  <div id="app">
    <v-app id="inspire">
      <v-card>
        <v-toolbar color="cyan" dark flat>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
          <v-col class="hidden-xs-only" sm="1" md="1">
            <v-avatar color="primary" size="56">{{
              AccountInfo.login
            }}</v-avatar>
          </v-col>

          <v-toolbar-title>Админ панель</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
          <v-btn href="logout" icon>
            <v-icon>mdi-logout</v-icon>
          </v-btn>

          <template v-slot:extension>
            <v-tabs v-model="tab" align-with-title>
              <v-tabs-slider color="yellow"></v-tabs-slider>

              <v-tab v-for="(item, index) in items" :key="index">
                {{ item.name }}
              </v-tab>
            </v-tabs>
          </template>
        </v-toolbar>

        <v-tabs-items v-model="tab">
          <v-tab-item v-for="(item, index) in items" :key="index">
            <v-card flat>
              <v-card v-if="item.name === 'Пользователи'">{{
                item.name
              }}</v-card>
              <v-card v-else-if="item.name === 'Учреждения'"
                ><AgencyList
              /></v-card>
              <v-card v-else-if="item.name === 'Мероприятия'">{{
                item.name
              }}</v-card>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-app>
  </div>
</template>
