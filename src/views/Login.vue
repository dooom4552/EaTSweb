<script lang="ts">
//import router from "@/router";
import { User } from "@/models/User";
import Vue from "vue";
import Component from "vue-class-component";
//import { getTokenByUsernameAndPassword } from "../API/API";

@Component({})
export default class Login extends Vue {
  login: string = "";
  password: string = "";
  $notification: any;

  async getToken() {
    try {
      const payload = {
        login: this.login,
        password: this.password,
      };
      const user = (await this.$store.dispatch("initUser", payload)) as User;
      if (user) {
        this.$router.push("/");
      }
    } catch (error) {
      console.log(error);
      this.$notification.error(error, {
        timer: 10,
        position: "bottomRight",
      });
    }
  }
}
</script>

<template>
  <div class="wrapper">
    <div class="login-box">
      <v-form ref="form">
        <v-text-field v-model="login" required></v-text-field>

        <v-text-field
          type="password"
          v-model="password"
          required
        ></v-text-field>

        <v-btn block color="primary" @click="getToken"> Войти </v-btn>
        <v-btn block color="primary" class="mt-2" href="register">
          Регистрация
        </v-btn>
      </v-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  height: calc(100vh - 20px);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .login-box {
    height: 200px;
    width: 200px;
  }
}
</style>
