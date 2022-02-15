<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AgencyList from "./AgencyList.vue";
import { mapGetters } from "vuex";
import { AgencyGetAll } from "@/API/API";
import { AgencyType } from "@/models/AgencyType";
import { AgencyVM } from "@/models/AgencyVM";

@Component({
  components: { AgencyList },
  computed: {
    ...mapGetters([
      "AccountInfo",
      // ...
    ]),
  },
})
export default class MainAdmin extends Vue {
  items: any[] = [
    { name: "Пользователи" },
    { name: "Учреждения" },
    { name: "Мероприятия" },
  ];
  tab: any = null;
  currentAgencyTypes: AgencyType[] = [];
  currentAgencyType: AgencyType = new AgencyType({
    id: 0,
    name: "ggg",
    shortName: "jj",
    agencies: [],
  });
  btns: string[] = ["Пользователи", "Учреждения", "Мероприятия"];
  colors: string[] = ["cyan", "cyan", "cyan"];
  items1: any = [...Array(4)].map((_, i) => `Item ${i}`);

  async created() {
    this.currentAgencyTypes = await AgencyGetAll();
    this.currentAgencyType = this.currentAgencyTypes[0];
  }
  setCurrentAgencyType(agencyType: AgencyType) {
    this.tab = 1;
    this.currentAgencyType = agencyType;
  }
  AgencyCreate(agencyVM: AgencyVM) {
    this.currentAgencyType.agencies.push(agencyVM);
  }
  AgencyDelete(agencyVM: AgencyVM) {
    const indexDeleteAgencyVM = this.currentAgencyType.agencies.findIndex(
      (ag) => ag.id === agencyVM.id
    );
    this.currentAgencyType.agencies.splice(indexDeleteAgencyVM, 1);
  }
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
          <v-col>
            <v-toolbar-title>Админ панель</v-toolbar-title>
          </v-col>
          <v-menu v-for="(nameBtn, index) in btns" :key="index" offset-y>
            <template v-slot:activator="{ attrs, on }">
              <v-btn
                :color="colors[index]"
                class="white--text ma-5"
                :attrs="attrs"
                v-on="on"
              >
                {{ nameBtn }}
              </v-btn>
            </template>

            <v-list v-if="nameBtn === 'Учреждения'">
              <v-list-item
                v-for="(agencyType, index) in currentAgencyTypes"
                :key="index"
                link
                @click="setCurrentAgencyType(agencyType)"
              >
                <v-list-item-title
                  v-text="agencyType.shortName"
                ></v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
          <v-btn href="logout" icon>
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </v-toolbar>

        <v-tabs-items v-model="tab">
          <v-tab-item v-for="(item, index) in items" :key="index">
            <v-card flat>
              <v-card v-if="item.name === 'Пользователи'">{{
                item.name
              }}</v-card>
              <v-card v-else-if="item.name === 'Учреждения'"
                ><AgencyList
                  v-if="currentAgencyTypes"
                  :currentAgencyType="currentAgencyType"
                  @AgencyCreate="AgencyCreate"
                  @AgencyDelete="AgencyDelete"
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
