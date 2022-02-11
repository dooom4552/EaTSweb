<script lang="ts">
import { AgencyType } from "@/models/AgencyType";
import { Component, Vue } from "vue-property-decorator";
import { AgencyGetAll } from "../API/API";

@Component({})
export default class MainCurator extends Vue {
  list: AgencyType[] = [];
  async created() {
    this.list = await AgencyGetAll();
  }
}
</script>
<template>
  <div>
    MainCurator
    <v-container class="m-5">
      <v-list>
        <v-subheader>Список</v-subheader>

        <v-form>
          <v-text-field label="TaskDescription" required></v-text-field>
          <v-btn type="submit">add</v-btn>
        </v-form>
        <v-list-item-group color="primary">
          <v-list-item v-for="(item, i) in list" :key="i">
            <template>
              <v-list-item-action>
                <v-checkbox color="primary"></v-checkbox>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Задача</v-list-item-title>
                <v-list-item-subtitle>{{ item.name }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-btn depressed color="error">delete</v-btn>
            </template>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-container>
  </div>
</template>
<style></style>
