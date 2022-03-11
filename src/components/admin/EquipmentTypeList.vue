<script lang="ts">
import {
  CreateEquipmentClass,
  CreateEquipmentType,
  DeleteEquipmentType,
  EditEquipmentType,
  GetEquipmentTypes,
} from "@/API/API";
import { EquipmentClassVM } from "@/models/Equipment/EquipmentClassVM";
import { EquipmentType } from "@/models/Equipment/EquipmentType";
import { Component, Vue } from "vue-property-decorator";
import EquipmentKindVue from "./EquipmentKind.vue";

@Component({
  components: {
    EquipmentKindVue,
  },
})
export default class EquipmentTypeList extends Vue {
  ///data
  equipmentTypes: EquipmentType[] = [];
  createEquipmentTypeDialog: boolean = false;
  editEquipmentTypeDialog: boolean = false;
  deleteEquipmentTypeDialog: boolean = false;
  createEquipmentClassDialog: boolean = false;
  currentDeleteIdEquipmentType: number | null = null;
  createEquipmentTypeName: string = "";
  currentEquipmentType: EquipmentType | null = null;
  currentEquipmentClassVM: EquipmentClassVM | null = null;
  $notification: any;

  async created() {
    this.equipmentTypes = await GetEquipmentTypes();
  }
  async createEquipmentType(name: string) {
    try {
      this.createEquipmentTypeDialog = false;
      const newEquipmentType: EquipmentType = {
        name: name,
      };
      const resultEquipmentType = await CreateEquipmentType(newEquipmentType);
      this.equipmentTypes.push(resultEquipmentType);
      this.createEquipmentTypeName = "";
    } catch (error) {
      this.$notification.error(error, {
        timer: 4,
        position: "bottomRight",
      });
    }
  }
  showEditEquipmentTypeDialog(equipmentType: EquipmentType) {
    this.currentEquipmentType = equipmentType;
    this.editEquipmentTypeDialog = true;
  }
  async editEquipmentType(equipmentType: EquipmentType) {
    try {
      this.editEquipmentTypeDialog = false;
      const resultEquipmentType = await EditEquipmentType(equipmentType);
      equipmentType = Object.assign(equipmentType, resultEquipmentType);
      this.$notification.new("Изменено", { timer: 4 });
    } catch (error) {
      this.$notification.error(error, {
        timer: 4,
        position: "bottomRight",
      });
    }
  }
  showDeleteEquipmentTypeDialog(id: number) {
    this.currentDeleteIdEquipmentType = id;
    this.deleteEquipmentTypeDialog = true;
  }
  async deleteEquipmentType(id: number) {
    try {
      const resultMessage = await DeleteEquipmentType(id);
      this.$notification.new(resultMessage, { timer: 4 });
      this.equipmentTypes = await GetEquipmentTypes();
    } catch (error) {
      this.$notification.error(error, {
        timer: 4,
        position: "bottomRight",
      });
    } finally {
      this.deleteEquipmentTypeDialog = false;
    }
  }
  showCreateEquipmentClassDialog(currentEquipmentType: EquipmentType) {
    if (!currentEquipmentType.id) return;
    this.currentEquipmentType = currentEquipmentType;
    this.currentEquipmentClassVM = {
      equipmentTypeId: currentEquipmentType.id,
      fullName: "",
      shortName: "",
      isRepair: false,
    };
    this.createEquipmentClassDialog = true;
  }
  async createEquipmentClass() {
    try {
      if (!this.currentEquipmentClassVM) return;
      const resultEquipmentClass = await CreateEquipmentClass(
        this.currentEquipmentClassVM
      );
      this.currentEquipmentType?.classes?.push(resultEquipmentClass);
    } catch (error) {
      this.$notification.error(error, {
        timer: 4,
        position: "bottomRight",
      });
    } finally {
      this.createEquipmentClassDialog = false;
    }
  }
}
</script>
<template>
  <div>
    <v-dialog v-model="createEquipmentTypeDialog" width="500">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Добавление типа оборудования
        </v-card-title>
        <v-text-field
          v-model="createEquipmentTypeName"
          label="Название*"
          type="text"
          required
        ></v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="createEquipmentType(createEquipmentTypeName)"
          >
            Добавить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-if="currentEquipmentType"
      v-model="editEquipmentTypeDialog"
      width="500"
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Изменение типа оборудования
        </v-card-title>
        <v-text-field
          v-model="currentEquipmentType.name"
          label="Название*"
          type="text"
          required
        ></v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="editEquipmentType(currentEquipmentType)"
          >
            Изменить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="deleteEquipmentTypeDialog" width="500">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Удаление типа оборудования
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="
              deleteEquipmentTypeDialog = false;
              currentDeleteIdEquipmentType = null;
            "
          >
            Отменить
          </v-btn>
          <v-btn
            color="error"
            text
            @click="deleteEquipmentType(currentDeleteIdEquipmentType)"
          >
            Удалить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-if="currentEquipmentClassVM"
      v-model="createEquipmentClassDialog"
      width="500"
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Добавление класса оборудования
        </v-card-title>
        <v-text-field
          v-model="currentEquipmentClassVM.fullName"
          label="Полное название*"
          type="text"
          required
        ></v-text-field>
        <v-text-field
          v-model="currentEquipmentClassVM.shortName"
          label="Короткое название*"
          type="text"
          required
        ></v-text-field>
        <v-switch
          v-model="currentEquipmentClassVM.isRepair"
          :label="`Подлежит ремонту`"
        ></v-switch>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="createEquipmentClass">
            Добавить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-btn @click="createEquipmentTypeDialog = true"
      >Добавить тип оборудования</v-btn
    >
    <v-expansion-panels>
      <v-expansion-panel
        v-for="(equipmentType, index) in equipmentTypes"
        :key="index"
      >
        <v-expansion-panel-header>
          {{ equipmentType.name }}
          <template v-slot:actions>
            <v-icon class="mr-3"> $expand</v-icon>
            <v-btn
              class="mr-3"
              @click="showCreateEquipmentClassDialog(equipmentType)"
            >
              Добавить класс оборудования
            </v-btn>
            <v-btn
              class="mr-3"
              color="primary"
              @click="showEditEquipmentTypeDialog(equipmentType)"
            >
              Изменить
            </v-btn>
            <v-btn
              color="error"
              @click="showDeleteEquipmentTypeDialog(equipmentType.id)"
            >
              Удалить
            </v-btn>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-expansion-panels>
            <v-expansion-panel
              v-for="(equipmentClass, index) in equipmentType.classes"
              :key="index"
            >
              <v-expansion-panel-header>
                {{ equipmentClass.shortName }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-expansion-panels>
                  <v-expansion-panel
                    v-for="(equipmentKind, index) in equipmentClass.equipments"
                    :key="index"
                  >
                    <v-expansion-panel-header>
                      {{ equipmentKind.name }}
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <EquipmentKindVue :equipmentKind="equipmentKind" />
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
