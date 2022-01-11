import { ResponseToken, ResponseTokenType } from "@/models/ResponseToken";
import { TodoItem, TodoItemType } from "@/models/TodoItem";
import axios from "axios";
const http = axios.create({
  baseURL: "https://localhost:44330",
});

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(error);
    if (error.response && error.response.status) {
      if (error.response.status === 401) {
        console.log(error.response.status);
        const parseResult = window.localStorage.getItem("token");
        if (!parseResult) return;
        const currentResponseTokenType: ResponseTokenType =
          JSON.parse(parseResult);
        const currentResponseToken: ResponseToken | undefined =
          await getTokenByUsernameAndPassword(
            currentResponseTokenType.username,
            currentResponseTokenType.password
          );
        if (!currentResponseToken) return;

        window.localStorage.setItem(
          "token",
          JSON.stringify(currentResponseToken)
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
): Promise<ResponseToken | undefined> => {
  try {
    const { data } = await http({
      url: "token",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        username,
        password,
      },
    });
    const responseToken: ResponseToken = data;
    return responseToken;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    } else {
      console.log(error);
    }
  }
};

export const getRole = async (): Promise<string | undefined> => {
  try {
    const parseResult = window.localStorage.getItem("token");
    if (!parseResult) return;
    const currentResponseTokenType: ResponseTokenType = JSON.parse(parseResult);
    console.log(currentResponseTokenType.accessToken);
    const { data } = await http({
      url: "/api/values/getrole",
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
export const getList = async (): Promise<TodoItem[]> => {
  try {
    const parseResult = window.localStorage.getItem("token");
    if (!parseResult) return [];

    const currentResponseTokenType: ResponseTokenType = JSON.parse(parseResult);

    const { data } = await http({
      url: "/api/values/getlist",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + currentResponseTokenType.accessToken,
      },
    });
    const resulTtypes: TodoItemType[] = data;
    const results: TodoItem[] = resulTtypes.map(
      (resulTtype) => new TodoItem(resulTtype)
    );
    return results;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    } else {
      console.log(error);
    }
    return [];
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
