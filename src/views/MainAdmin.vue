<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AgencyList from "./AgencyList.vue";
import AgencyTypeList from "../components/admin/AgencyTypeList.vue";
import EquipmentTypeList from "../components/admin/EquipmentTypeList.vue";
import UsersList from "../components/admin/UsersList.vue";
import SettingsUser from "../components/navPanel/SettingsUser.vue";
import { mapGetters } from "vuex";
import { AgencyGetAll } from "@/API/API";
import { AgencyType } from "@/models/AgencyType";
import { AgencyVM } from "@/models/AgencyVM";
import { Item } from "@/models/Item";

@Component({
  components: {
    AgencyList,
    AgencyTypeList,
    UsersList,
    SettingsUser,
    EquipmentTypeList,
  },
  computed: {
    ...mapGetters([
      "AccountInfo",
      // ...
    ]),
  },
})
export default class MainAdmin extends Vue {
  items: Item[] = [
    { name: "Пользователи", loading: false, color: "cyan" },
    { name: "Типы учреждений", loading: false, color: "cyan" },
    { name: "Учреждения", loading: false, color: "cyan" },
    { name: "Мероприятия", loading: false, color: "cyan" },
    { name: "Тип оборудования", loading: false, color: "cyan" },
  ];
  tab: any = null;
  currentAgencyTypes: AgencyType[] = [];
  currentAgencyType: AgencyType = new AgencyType({
    id: 0,
    name: "",
    shortName: "",
    agencies: [],
  });

  $notification: any;
  async created() {
    try {
      this.items[1].loading = true;
      this.items[2].loading = true;
      this.currentAgencyTypes = await AgencyGetAll();
      this.currentAgencyType = this.currentAgencyTypes[0];
    } catch (error) {
      console.log(error);
      this.$notification.error(error, {
        timer: 20,
        position: "bottomRight",
      });
    } finally {
      this.items[1].loading = false;
      this.items[2].loading = false;
    }
  }
  setCurrentAgencyType(agencyType: AgencyType) {
    this.tab = 2;
    this.currentAgencyType = agencyType;
  }
  AgencyCreate(agencyVM: AgencyVM) {
    this.currentAgencyType.agencies.push(agencyVM);
  }
  AgencyUpdate(agencyVM: AgencyVM) {
    const updatingAgencyVM = this.currentAgencyType.agencies.find(
      (ag) => ag.id === agencyVM.id
    );
    if (!updatingAgencyVM) throw Error("Не найдено учреждение");
    Object.assign(updatingAgencyVM, agencyVM);
  }
  AgencyDelete(agencyVM: AgencyVM) {
    const indexDeleteAgencyVM = this.currentAgencyType.agencies.findIndex(
      (ag) => ag.id === agencyVM.id
    );
    this.currentAgencyType.agencies.splice(indexDeleteAgencyVM, 1);
  }
  setTab(index: number) {
    if (index !== 2) this.tab = index;
  }
  AgencyTypeCreate(agencyType: AgencyType) {
    this.currentAgencyTypes.push(agencyType);
  }
  AgencyTypeUpdate(agencyType: AgencyType) {
    const updatingAgencyType = this.currentAgencyTypes.find(
      (at) => at.id === agencyType.id
    );
    if (!updatingAgencyType) throw Error("Не найдено у тип чреждение");
    Object.assign(updatingAgencyType, agencyType);
  }
  AgencyTypeDelete(agencyType: AgencyType) {
    const indexDeleteAgencyType = this.currentAgencyTypes.findIndex(
      (at) => at.id === agencyType.id
    );
    this.currentAgencyTypes.splice(indexDeleteAgencyType, 1);
  }
}
</script>
<template>
  <div id="app">
    <v-app id="inspire">
      <v-card>
        <v-toolbar color="cyan" dark flat>
          <SettingsUser />
          <v-col class="hidden-xs-only" sm="1" md="1">
            <v-avatar color="primary" size="56">{{
              AccountInfo.login[0]
            }}</v-avatar>
          </v-col>
          <v-col>
            <v-toolbar-title>Админ панель</v-toolbar-title>
          </v-col>
          <v-menu v-for="(Btn, index) in items" :key="index" offset-y>
            <template v-slot:activator="{ attrs, on }">
              <v-btn
                @click="setTab(index)"
                :loading="items[index].loading"
                :color="items[index].color"
                class="white--text ma-5"
                :attrs="attrs"
                v-on="on"
              >
                {{ Btn.name }}
              </v-btn>
            </template>

            <v-list v-if="Btn.name === 'Учреждения'">
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
              <v-card v-if="item.name === 'Пользователи'">
                <UsersList />
              </v-card>
              <v-card v-else-if="item.name === 'Типы учреждений'">
                <AgencyTypeList
                  :currentAgencyTypes="currentAgencyTypes"
                  @AgencyTypeCreate="AgencyTypeCreate"
                  @AgencyTypeUpdate="AgencyTypeUpdate"
                  @AgencyTypeDelete="AgencyTypeDelete"
                />
              </v-card>

              <v-card v-else-if="item.name === 'Учреждения'"
                ><AgencyList
                  v-if="currentAgencyTypes"
                  :currentAgencyType="currentAgencyType"
                  @AgencyCreate="AgencyCreate"
                  @AgencyDelete="AgencyDelete"
                  @AgencyUpdate="AgencyUpdate"
              /></v-card>
              <v-card v-else-if="item.name === 'Мероприятия'">{{
                item.name
              }}</v-card>
              <v-card v-else-if="item.name === 'Тип оборудования'">
                <EquipmentTypeList />
              </v-card>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-app>
  </div>
</template>
