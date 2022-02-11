<script lang="ts">
//import router from "@/router";
import { User } from "@/models/User";
import Vue from "vue";
import Component from "vue-class-component";
//import { getTokenByUsernameAndPassword } from "../API/API";

@Component({})
export default class Register extends Vue {
  login: string = "";
  password: string = "";

  async getToken() {
    const payload = {
      login: this.login,
      password: this.password,
    };
    const user = (await this.$store.dispatch("initUser", payload)) as User;
    if (user) {
      this.$router.push("/");
    }
  }
}
</script>

<template>
  <div class="wrapper">
    <div class="login-box">
      <v-form ref="form">
        <v-text-field v-model="login" label="Login" required></v-text-field>

        <v-text-field
          type="password"
          v-model="password"
          label="Password"
          required
        ></v-text-field>

        <v-btn block color="primary" @click="getToken"> Login </v-btn>
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
