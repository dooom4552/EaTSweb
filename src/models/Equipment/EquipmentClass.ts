import { EquipmentKind } from "./equipmentKind";

export interface EquipmentClass {
  id: number;
  shortName: string;
  fullName: string;
  equipments: EquipmentKind[];
  isRepair: boolean;
  displayOrder: number;
}
