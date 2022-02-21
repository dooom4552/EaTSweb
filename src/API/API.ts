import { AgencyTypeResponse, AgencyType } from "@/models/AgencyType";
import { AgencyVM, AgencyVMResponse } from "@/models/AgencyVM";
import { IresponseToken } from "@/models/interfaces/IresponseToken";
import { User } from "@/models/User";
import axios from "axios";
import store from "@/store";
import { getLocalStorage } from "@/service/localStorageService";
import { UserVM } from "@/models/UserVM";

const http = axios.create({
  baseURL: "https://localhost:7035",
});

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status) {
      console.log(error.response);
      if (error.response.status === 401) {
        const currentUser: User =
          store.getters.AccountInfo || getLocalStorage("currentUser");

        const currentResponseToken: { accessToken: string; currentUser: User } =
          await getTokenByUsernameAndPassword(
            currentUser.login,
            currentUser.password
          );
        if (!currentResponseToken) return;

        window.localStorage.setItem(
          "token",
          JSON.stringify(currentResponseToken.accessToken)
        );
        error.config.headers["Authorization"] =
          "Bearer " + currentResponseToken.accessToken;
        return await http.request(error.config);
      } else {
        if (axios.isAxiosError(error)) {
          throw new Error(
            `Статус:${error.response.status} ${error.response.request.responseURL} ${error.response.data}`
          );
        } else {
          throw error;
        }
      }
    }
  }
);
http.interceptors.request.use((request) => {
  if (request.headers && request.url) {
    if (
      !["Account/Create", "Account/GetToken"].some(
        (item) => item === request.url
      )
    ) {
      request.headers.Authorization = "Bearer " + store.getters.getToken;
    }
    request.headers["Content-Type"] = "application/json";
  }

  return request;
});

export const getTokenByUsernameAndPassword = async (
  username: string,
  password: string
) => {
  const { data } = await http({
    url: "Account/GetToken",
    method: "POST",

    data: {
      username,
      password,
    },
  });
  const responseToken: IresponseToken = data;
  const { accessToken, user } = responseToken;
  const currentUser = new User(user);
  const response = { accessToken, currentUser };
  return response;
};
export const getAgensyByRegister = async (id?: number) => {
  const { data } = await http({
    url: "Agency/Get",
    method: "GET",
    params: {
      id,
    },
  });
  const responseToken: AgencyVMResponse[] = data;
  console.log(responseToken);
  return responseToken;
};
export const getUser = async (id?: number) => {
  const { data } = await http({
    url: "Account/Get",
    method: "GET",
    params: {
      id,
    },
  });
  const responseToken: User[] = data;
  return responseToken;
};

export const UserCreate = async (userVM: UserVM) => {
  const { data } = await http({
    url: "Account/Create",
    method: "POST",
    data: userVM,
  });
  const responseToken: User = data;
  return responseToken;
};
export const UpdateAdminData = async (userVM: UserVM) => {
  const { data } = await http({
    url: "Account/UpdateStatusOrRole",
    method: "PUT",
    data: userVM,
  });
  const responseToken: User = data;
  return responseToken;
};

export const AgencyGetAll = async () => {
  const { data } = await http({
    url: "AgencyTypes",
    method: "GET",
  });
  const response: AgencyTypeResponse[] = data;
  const res = response.map((AgencyResponse) => new AgencyType(AgencyResponse));
  return res;
};

export const AgencyTypeCreate = async (agencyType: AgencyType) => {
  const { data } = await http({
    url: "AgencyTypes/Create",
    method: "POST",
    data: {
      Name: agencyType.name,
      ShortName: agencyType.shortName,
    },
  });
  const response: AgencyTypeResponse = data;
  return new AgencyType(response);
};
export const AgencyTypeUpdate = async (agencyType: AgencyType) => {
  const { data } = await http({
    url: "AgencyTypes/Update",
    method: "PUT",
    data: {
      Name: agencyType.name,
      ShortName: agencyType.shortName,
    },
  });
  const response: AgencyTypeResponse = data;
  return new AgencyType(response);
};
export const AgencyTypeDelete = async (agencyType: AgencyType) => {
  const { data } = await http({
    url: "AgencyTypes/Delete",
    method: "DELETE",
    params: {
      id: agencyType.id,
    },
  });
  return data;
};
export const AgencyCreate = async (agencyVM: AgencyVM) => {
  const { data } = await http({
    url: "Agencyes/Create",
    method: "POST",
    data: agencyVM,
  });
  const response: AgencyVMResponse = data;
  return new AgencyVM(response);
};
export const AgencyUpdate = async (agencyVM: AgencyVM) => {
  const { data } = await http({
    url: "Agencyes/Update",
    method: "PUT",
    data: agencyVM,
  });
  const response: AgencyVMResponse = data;
  return new AgencyVM(response);
};
export const AgencyDelete = async (agencyVM: AgencyVM) => {
  const { data } = await http({
    url: "Agencyes/Delete",
    method: "DELETE",
    data: agencyVM,
  });
  const response: AgencyVMResponse = data;
  return new AgencyVM(response);
};
