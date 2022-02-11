/* eslint-disable no-unused-vars */
export class User {
  id: number = 1;
  name: string;
  agency: null;
  login: string;
  password: string;
  phone: string;
  email: string;
  role: UserRole;
  constructor(parameters: UserType) {
    this.id = parameters.id;
    this.name = parameters.name;
    this.agency = parameters.agency;
    this.login = parameters.login;
    this.password = parameters.password;
    this.phone = parameters.phone;
    this.email = parameters.email;
    this.role = parameters.role;
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
  agency: null;
  login: string;
  password: string;
  phone: string;
  email: string;
  role: UserRole;
};
