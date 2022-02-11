export class AgencyType {
  id: number;
  name: string;
  shortName: string;
  constructor(parameters: AgencyResponse) {
    this.id = parameters.id;
    this.name = parameters.name;
    this.shortName = parameters.shortName;
  }
}

export type AgencyResponse = {
  id: number;
  name: string;
  shortName: string;
};
