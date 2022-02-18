import { AgencyVM, AgencyVMResponse } from "./AgencyVM";

/* eslint-disable no-unused-vars */
export class User {
  id: number = 1;
  name: string;
  agency: AgencyVM;
  login: string;
  password: string;
  phone: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  constructor(parameters: UserType) {
    this.id = parameters.id;
    this.name = parameters.name;
    this.agency = new AgencyVM(parameters.agency);
    this.login = parameters.login;
    this.password = parameters.password;
    this.phone = parameters.phone;
    this.email = parameters.email;
    this.role = parameters.role;
    this.isActive = parameters.isActive;
  }
}

export enum UserRole {
  Administrator,
  Curator,
  User,
}

export type UserType = {
  id: number;
  name: string;
  agency: AgencyVMResponse;
  login: string;
  password: string;
  phone: string;
  email: string;
  role: UserRole;
  isActive: boolean;
};
