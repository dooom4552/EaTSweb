<script lang="ts">
import { AgencyType } from "@/models/AgencyType";
import { AgencyVM, AgencyVMResponse } from "@/models/AgencyVM";
import { Component, Vue, Prop } from "vue-property-decorator";
import { AgencyCreate, AgencyDelete, AgencyUpdate } from "../API/API";

@Component({})
export default class AgencyList extends Vue {
  @Prop(AgencyType)
  readonly currentAgencyType!: AgencyType;

  ///data
  dialog: boolean = false;
  dialogUdate: boolean = false;
  AgencyShortName: string = "";
  AgencyName: string = "";
  currentAgencyVM: AgencyVM = this.currentAgencyType.agencies[0];
  $notification: any;

  ///methods
  async AgencyAdd() {
    try {
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
    } catch (error) {
      this.$notification.error(error, {
        timer: 4,
        position: "bottomRight",
      });
    }
  }
  setCurrentAgencyVM(agencyVM: AgencyVM) {
    try {
      this.currentAgencyVM = agencyVM;
      this.dialogUdate = true;
      this.AgencyShortName = agencyVM.shortName;
      this.AgencyName = agencyVM.name;
    } catch (error) {
      this.$notification.error(error, {
        timer: 4,
        position: "bottomRight",
      });
    }
  }
  async AgencyUpdate() {
    try {
      if (this.currentAgencyVM) {
        const params: AgencyVMResponse = {
          name: this.AgencyName,
          shortName: this.AgencyShortName,
          agencyTypeId: this.currentAgencyVM.agencyTypeId,
          displayOrder: this.currentAgencyVM.displayOrder,
          id: this.currentAgencyVM.id,
        };
        const updatingAgency = new AgencyVM(params);
        const resultAgency = await AgencyUpdate(updatingAgency);
        this.$emit("AgencyUpdate", resultAgency);
        this.dialogUdate = false;
        this.AgencyName = "";
        this.AgencyShortName = "";
      }
    } catch (error) {
      this.$notification.error(error, {
        timer: 4,
        position: "bottomRight",
      });
    }
  }
  async AgencyDelete(agencyVM: AgencyVM) {
    try {
      agencyVM.name = "loading";
      await AgencyDelete(agencyVM);
      agencyVM.name = "";
      this.$emit("AgencyDelete", agencyVM);
    } catch (error) {
      this.$notification.error(error, {
        timer: 4,
        position: "bottomRight",
      });
    }
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
        <v-dialog v-model="dialogUdate" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="text-h5">Изменение {{ currentAgencyVM.name }}</span>
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
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialogUdate = false">
                Закрыть
              </v-btn>
              <v-btn
                :disabled="!AgencyName || !AgencyShortName"
                color="blue darken-1"
                text
                @click="AgencyUpdate"
              >
                Изменить
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
                class="mr-3"
                color="primary"
                dark
                :disabled="agencyVM.name === 'loading'"
                @click="setCurrentAgencyVM(agencyVM)"
              >
                изменить
              </v-btn>
              <v-btn
                :loading="agencyVM.name === 'loading'"
                :disabled="agencyVM.name === 'loading'"
                dark
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
