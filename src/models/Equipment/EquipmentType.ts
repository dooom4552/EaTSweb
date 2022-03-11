import { EquipmentClass } from "./equipmentClass";

export interface EquipmentType {
  id?: number;
  name: string;
  classes?: EquipmentClass[] | null;
  displayOrder?: number;
}
