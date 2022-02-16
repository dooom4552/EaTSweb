import { AgencyTypeResponse, AgencyType } from "@/models/AgencyType";
import { AgencyVM, AgencyVMResponse } from "@/models/AgencyVM";
import { IresponseToken } from "@/models/interfaces/IresponseToken";
import { User } from "@/models/User";
import axios from "axios";
import store from "@/store";

const http = axios.create({
  baseURL: "https://localhost:7035",
});

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status) {
      if (error.response.status === 401) {
        const currentUser: User = store.getters.AccountInfo;

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
        throw new Object(error);
      }
    }
  }
);

export const getTokenByUsernameAndPassword = async (
  username: string,
  password: string
) => {
  try {
    const { data } = await http({
      url: "Account/GetToken",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    } else {
      console.log(error);
    }
    throw error;
  }
};

export const AgencyGetAll = async () => {
  try {
    const { data } = await http({
      url: "AgencyTypes",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + store.getters.getToken,
      },
    });
    const response: AgencyTypeResponse[] = data;
    const res = response.map(
      (AgencyResponse) => new AgencyType(AgencyResponse)
    );
    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    } else {
      console.log(error);
    }
    throw error;
  }
};

export const AgencyTypeCreate = async (agencyType: AgencyType) => {
  try {
    const { data } = await http({
      url: "AgencyTypes/Create",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + store.getters.getToken,
      },
      data: {
        Name: agencyType.name,
        ShortName: agencyType.shortName,
      },
    });
    const response: AgencyTypeResponse = data;
    return new AgencyType(response);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    } else {
      console.log(error);
    }
    throw error;
  }
};
export const AgencyCreate = async (agencyVM: AgencyVM) => {
  try {
    const { data } = await http({
      url: "Agencyes/Create",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + store.getters.getToken,
      },
      data: agencyVM,
    });
    const response: AgencyVMResponse = data;
    return new AgencyVM(response);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    } else {
      console.log(error);
    }
    throw error;
  }
};
export const AgencyUpdate = async (agencyVM: AgencyVM) => {
  try {
    const { data } = await http({
      url: "Agencyes/Update",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + store.getters.getToken,
      },
      data: agencyVM,
    });
    const response: AgencyVMResponse = data;
    return new AgencyVM(response);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    } else {
      console.log(error);
    }
    throw error;
  }
};
export const AgencyDelete = async (agencyVM: AgencyVM) => {
  try {
    const { data } = await http({
      url: "Agencyes/Delete",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + store.getters.getToken,
      },
      data: agencyVM,
    });
    const response: AgencyVMResponse = data;
    return new AgencyVM(response);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    } else {
      console.log(error);
    }
    throw error;
  }
};
