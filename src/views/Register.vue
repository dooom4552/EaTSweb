<script lang="ts">
//import router from "@/router";
import { getAgensyByRegister, UserCreate } from "@/API/API";
import { AgencyVMResponse } from "@/models/AgencyVM";
import { UserVM } from "@/models/UserVM";
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class Register extends Vue {
  valid: boolean = true;
  name: string = "";
  login: string = "";
  email: string = "";
  agencyId: number = 0;
  agencyes: AgencyVMResponse[] = [];
  password: string = "";
  phone: string = "";
  show: boolean = false;
  $notification: any;
  get validForm() {
    return (
      this.name &&
      this.login &&
      this.email &&
      this.agencyId &&
      this.password &&
      this.phone
    );
  }
  async created() {
    try {
      this.agencyes = await getAgensyByRegister();
      this.agencyId = this.agencyes[0].id;
    } catch (error) {
      console.log(error);
    }
  }
  async userCreate() {
    try {
      const userVM: UserVM = {
        name: this.name,
        login: this.login,
        password: this.password,
        phone: this.phone,
        email: this.email,
        agencyId: this.agencyId,
      };
      await UserCreate(userVM);
      const payload = {
        login: this.login,
        password: this.password,
      };
      this.$notification.success("Вы зарегистрированы", {
        timer: 10,
        position: "bottomRight",
      });
      await this.$store.dispatch("initUser", payload);
      this.$router.push("/");
    } catch (error) {
      this.name = "";
      this.login = "";
      this.password = "";
      this.phone = "";
      this.email = "";
      this.agencyId = 0;
      console.log(error);
      this.$notification.error(error, {
        timer: 10,
        position: "bottomRight",
      });
    }
  }
  async usersCreate() {
    for (let index = 0; index < 100; index++) {
      try {
        const userVM: UserVM = {
          name: `Userr${index}`,
          login: `Userr${index}`,
          password: `${index}`,
          phone: `444${index}`,
          email: `userr${index}@mail.ru`,
          agencyId: this.agencyId,
        };
        await UserCreate(userVM);
        this.$notification.success(`Вы Userr${index} зарегистрированы`, {
          timer: 10,
          position: "bottomRight",
        });
      } catch (error) {
        console.log(error);
        this.$notification.error(error, {
          timer: 10,
          position: "bottomRight",
        });
        break;
      }
    }
  }
}
</script>
<template>
  <div class="wrapper-register">
    <div class="box-register-content">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="name"
          :counter="10"
          label="Имя"
          required
        ></v-text-field>
        <v-select
          v-model="agencyId"
          :items="agencyes"
          :item-text="'shortName'"
          :item-value="'id'"
          label="Учреждения"
          required
        ></v-select>
        <v-text-field
          v-model="login"
          :counter="10"
          label="Логин"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show ? 'text' : 'password'"
          name="input-10-1"
          label="Normal with hint text"
          hint="At least 8 characters"
          counter
          @click:append="show = !show"
        ></v-text-field>
        <v-text-field
          v-model="phone"
          :counter="11"
          label="Телефон"
          required
        ></v-text-field>
        <v-text-field v-model="email" label="E-mail" required></v-text-field>
        <v-btn
          color="success"
          class="mr-4"
          :disabled="!validForm"
          @click="userCreate"
        >
          Зарегистрироватся
        </v-btn>
        <v-btn color="success" class="mr-4" @click="usersCreate">
          Добавить кучу пользователей
        </v-btn>
      </v-form>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.wrapper-register {
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;

  .box-register-content {
    width: 400px;
  }
}
</style>
