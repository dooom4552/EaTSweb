<script lang="ts">
import { AgencyType } from "@/models/AgencyType";
import { AgencyVM, AgencyVMResponse } from "@/models/AgencyVM";
import { Component, Vue, Prop } from "vue-property-decorator";
import { AgencyCreate, AgencyDelete } from "../API/API";

@Component({})
export default class AgencyList extends Vue {
  @Prop(AgencyType)
  readonly currentAgencyType!: AgencyType;
  dialog: boolean = false;
  AgencyShortName: string = "";
  AgencyName: string = "";

  async AgencyAdd() {
    const parameters: AgencyVMResponse = {
      id: 0,
      name: this.AgencyName,
      shortName: this.AgencyShortName,
      agencyTypeId: this.currentAgencyType?.id,
      displayOrder: 0,
    };
    let agency = new AgencyVM(parameters);
    this.dialog = false;
    const resultAgency = await AgencyCreate(agency);
    this.$emit("AgencyCreate", resultAgency);
    this.AgencyName = "";
    this.AgencyShortName = "";
  }
  async AgencyDelete(agencyVM: AgencyVM) {
    agencyVM.name = "loading";
    await AgencyDelete(agencyVM);
    agencyVM.name = "";
    this.$emit("AgencyDelete", agencyVM);
  }
}
</script>
<template>
  <div v-if="currentAgencyType">
    <v-container>
      <v-row class="mb-4 mt-4" justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              Добавить учреждение
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5"
                >Добавление {{ currentAgencyType.name }}</span
              >
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="AgencyShortName"
                      label="Короткое название"
                      type="text"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="AgencyName"
                      label="Название*"
                      type="text"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">
                Закрыть
              </v-btn>
              <v-btn
                :disabled="!AgencyName || !AgencyShortName"
                color="blue darken-1"
                text
                @click="AgencyAdd"
              >
                Добавить
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <v-list>
        <v-subheader>{{ currentAgencyType.name }}</v-subheader>
        <v-list-item-group color="primary">
          <v-list-item
            v-for="(agencyVM, i) in currentAgencyType.agencies"
            :key="i"
          >
            <template>
              <v-list-item-content>
                <v-list-item-subtitle>
                  <v-list-item>
                    <v-list-item-content>
                      {{ agencyVM.name }}
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-btn
                :disabled="agencyVM.name === 'loading'"
                class="mr-4"
                depressed
                color="primary"
                >изменить</v-btn
              >
              <v-btn
                :loading="agencyVM.name === 'loading'"
                :disabled="agencyVM.name === 'loading'"
                depressed
                color="error"
                @click="AgencyDelete(agencyVM)"
                >удалить</v-btn
              >
            </template>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-container>
  </div>
</template>
<style></style>
