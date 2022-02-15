export class AgencyVM {
  id: number;
  name: string;
  shortName: string;
  agencyTypeId: number;
  displayOrder: number;

  constructor(parameters: AgencyVMResponse) {
    this.id = parameters.id;
    this.name = parameters.name;
    this.shortName = parameters.shortName;
    this.agencyTypeId = parameters.agencyTypeId;
    this.displayOrder = parameters.displayOrder;
  }
}
export type AgencyVMResponse = {
  id: number;
  name: string;
  shortName: string;
  agencyTypeId: number;
  displayOrder: number;
};
