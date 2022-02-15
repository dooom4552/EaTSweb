import { AgencyTypeResponse, AgencyType } from "@/models/AgencyType";
import { AgencyVM, AgencyVMResponse } from "@/models/AgencyVM";
import { IresponseToken } from "@/models/interfaces/IresponseToken";
import { ResponseTokenType } from "@/models/ResponseToken";
import { TodoItem, TodoItemType } from "@/models/TodoItem";
import { User } from "@/models/User";
import axios from "axios";
const http = axios.create({
  baseURL: "https://localhost:7035",
});

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(error);
    if (error.response && error.response.status) {
      if (error.response.status === 401) {
        const parseResult = window.localStorage.getItem("token");
        if (!parseResult) throw new Error("no parseResult");
        const parseCurrentUserJSON = window.localStorage.getItem("currentUser");
        if (!parseCurrentUserJSON) throw new Error("no parseResult");
        const currentUser: User = JSON.parse(parseCurrentUserJSON);
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
    const parseResult = window.localStorage.getItem("token");
    if (!parseResult) throw new Error("no parseResult");
    const { data } = await http({
      url: "AgencyTypes",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + JSON.parse(parseResult),
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
    const parseResult = window.localStorage.getItem("token");
    if (!parseResult) throw new Error("no parseResult");
    const currentResponseTokenType: string = JSON.parse(parseResult);

    const { data } = await http({
      url: "AgencyTypes/Create",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + currentResponseTokenType,
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
    const parseResult = window.localStorage.getItem("token");
    if (!parseResult) throw new Error("no parseResult");
    const currentResponseTokenType: string = JSON.parse(parseResult);

    const { data } = await http({
      url: "Agencyes/Create",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + currentResponseTokenType,
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
    const parseResult = window.localStorage.getItem("token");
    if (!parseResult) throw new Error("no parseResult");
    const currentResponseTokenType: string = JSON.parse(parseResult);

    const { data } = await http({
      url: "Agencyes/Delete",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + currentResponseTokenType,
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

export const getLogin = async (): Promise<string> => {
  try {
    const parseResult = window.localStorage.getItem("token");
    if (!parseResult) return "";

    const currentResponseTokenType: ResponseTokenType = JSON.parse(parseResult);

    const { data } = await http({
      url: "/api/values/getlogin",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + currentResponseTokenType.accessToken,
      },
    });
    const result: string = data;
    return result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    } else {
      console.log(error);
    }
    return "";
  }
};

export const addItem = async (TaskDescription: string) => {
  try {
    const parseResult = window.localStorage.getItem("token");
    if (!parseResult) return;
    const currentResponseTokenType: ResponseTokenType = JSON.parse(parseResult);

    const { data } = await http({
      url: "/api/values/Item",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + currentResponseTokenType.accessToken,
      },
      data: { TaskDescription },
    });
    const resultType: TodoItemType = data;
    const result: TodoItem = new TodoItem(resultType);

    return result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    } else {
      console.log(error);
    }
  }
};
export const changeItem = async (todoItemType: TodoItemType) => {
  try {
    const parseResult = window.localStorage.getItem("token");
    if (!parseResult) return;
    const currentResponseTokenType: ResponseTokenType = JSON.parse(parseResult);

    const { data } = await http({
      url: "/api/values/Item",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + currentResponseTokenType.accessToken,
      },
      data: todoItemType,
    });
    const resultType: TodoItemType = data;
    const result: TodoItem = new TodoItem(resultType);

    return result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    } else {
      console.log(error);
    }
  }
};

export const deleteItem = async (todoItem: TodoItem) => {
  try {
    const parseResult = window.localStorage.getItem("token");
    if (!parseResult) return;
    const currentResponseTokenType: ResponseTokenType = JSON.parse(parseResult);

    const { data } = await http({
      url: "/api/values/Item",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + currentResponseTokenType.accessToken,
      },
      data: todoItem,
    });
    const result: boolean = data;

    return result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    } else {
      console.log(error);
    }
  }
};
