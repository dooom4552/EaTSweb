import { AgencyVM, AgencyVMResponse } from "./AgencyVM";

export class AgencyType {
  id: number;
  name: string;
  shortName: string;
  agencies: AgencyVM[] = [];
  constructor(parameters: AgencyTypeResponse) {
    this.id = parameters.id;
    this.name = parameters.name;
    this.shortName = parameters.shortName;
    this.agencies = parameters.agencies.map((ag) => new AgencyVM(ag));
    // this.agencies =
    //   parameters.agencies && parameters.agencies.map((ag) => new AgencyVM(ag));
  }
}

export type AgencyTypeResponse = {
  id: number;
  name: string;
  shortName: string;
  agencies: AgencyVMResponse[];
};
