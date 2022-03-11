export interface EquipmentKind {
  id: number;
  name: string;
  description: string | null;
  price: number | null;
  isObsolete: boolean;
}
