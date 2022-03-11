<script lang="ts">
import { EquipmentKind } from "@/models/Equipment/equipmentKind";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class EquipmentKindVue extends Vue {
  @Prop()
  readonly equipmentKind!: EquipmentKind;
}
</script>
<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-subtitle
        >Описание: {{ equipmentKind.description }}</v-list-item-subtitle
      >
      <v-list-item-subtitle
        >Цена: {{ equipmentKind.price }}</v-list-item-subtitle
      >
    </v-list-item-content>
  </v-list-item>
</template>
