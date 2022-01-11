export class ResponseToken {
  accessToken: string;
  username: string;
  constructor(responseTokenType: ResponseTokenType) {
    this.accessToken = responseTokenType.accessToken;
    this.username = responseTokenType.username;
  }
}

export type ResponseTokenType = {
  accessToken: string;
  username: string;
  password: string;
};
