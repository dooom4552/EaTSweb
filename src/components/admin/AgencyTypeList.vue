<script lang="ts">
import { AgencyTypeCreate, AgencyTypeDelete } from "@/API/API";
import { AgencyType, AgencyTypeResponse } from "@/models/AgencyType";
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class AgencyTypeList extends Vue {
  @Prop()
  readonly currentAgencyTypes!: AgencyType[];

  ///data
  dialog: boolean = false;
  dialogUdate: boolean = false;
  AgencyTypeShortName: string = "";
  AgencyTypeName: string = "";
  $notification: any;
  currentAgencyType: AgencyType = this.currentAgencyTypes[0];
  ///methods
  async AgencyTypeAdd() {
    try {
      const parameters: AgencyTypeResponse = {
        id: 0,
        name: this.AgencyTypeName,
        shortName: this.AgencyTypeShortName,
        agencies: [],
      };
      let agencyType = new AgencyType(parameters);
      this.dialog = false;
      const resultAgencyType = await AgencyTypeCreate(agencyType);
      this.$emit("AgencyTypeCreate", resultAgencyType);
      this.AgencyTypeName = "";
      this.AgencyTypeShortName = "";
    } catch (error) {
      this.$notification.error(error, {
        timer: 10,
        position: "bottomRight",
      });
    }
  }
  async AgencyTypeUpdate() {
    try {
      if (this.currentAgencyType) {
        const params: AgencyTypeResponse = {
          id: this.currentAgencyType.id,
          name: this.AgencyTypeName,
          shortName: this.AgencyTypeShortName,
          agencies: this.currentAgencyType.agencies,
        };
        const updatingAgency = new AgencyType(params);
        const resultAgency = await AgencyTypeCreate(updatingAgency);
        this.$emit("AgencyTypeUpdate", resultAgency);
      }
    } catch (error) {
      this.$notification.error(error, {
        timer: 10,
        position: "bottomRight",
      });
    } finally {
      this.dialogUdate = false;
      this.AgencyTypeName = "";
      this.AgencyTypeShortName = "";
    }
  }
  setCurrentAgencyType(agencyType: AgencyType) {
    try {
      this.currentAgencyType = agencyType;
      this.dialogUdate = true;
      this.AgencyTypeShortName = agencyType.shortName;
      this.AgencyTypeShortName = agencyType.name;
    } catch (error) {
      this.$notification.error(error, {
        timer: 10,
        position: "bottomRight",
      });
    }
  }
  async AgencyTypeDelete(agencyType: AgencyType) {
    try {
      agencyType.name = "loading";
      await AgencyTypeDelete(agencyType);
      agencyType.name = "";
      this.$emit("AgencyTypeDelete", agencyType);
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
  <div v-if="currentAgencyTypes">
    <v-container>
      <v-row class="mb-4 mt-4" justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              Добавить новый тип учреждения
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">Добавление типа учреждения</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="AgencyTypeShortName"
                      label="Короткое название"
                      type="text"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="AgencyTypeName"
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
              <v-btn color="blue darken-1" text @click="dialog = false">
                Закрыть
              </v-btn>
              <v-btn
                :disabled="!AgencyTypeName || !AgencyTypeShortName"
                color="blue darken-1"
                text
                @click="AgencyTypeAdd"
              >
                Добавить
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogUdate" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="text-h5"
                >Изменение {{ currentAgencyType.name }}</span
              >
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="AgencyTypeShortName"
                      label="Короткое название"
                      type="text"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="AgencyTypeName"
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
                :disabled="!AgencyTypeName || !AgencyTypeShortName"
                color="blue darken-1"
                text
                @click="AgencyTypeUpdate"
              >
                Изменить
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <v-list>
        <v-list-item-group color="primary">
          <v-list-item v-for="(agencyType, i) in currentAgencyTypes" :key="i">
            <template>
              <v-list-item-content>
                <v-list-item-subtitle>
                  <v-list-item>
                    <v-list-item-content>
                      {{ agencyType.name }}
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-btn
                class="mr-3"
                color="primary"
                dark
                :disabled="agencyType.name === 'loading'"
                @click="setCurrentAgencyType(agencyType)"
              >
                изменить
              </v-btn>
              <v-btn
                :loading="agencyType.name === 'loading'"
                :disabled="agencyType.name === 'loading'"
                dark
                color="error"
                @click="AgencyTypeDelete(agencyType)"
                >удалить</v-btn
              >
            </template>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-container>
  </div>
</template>
