<script>
import { mapGetters } from "vuex";
import { UserUpdate } from "../../API/API";

export default {
  data: () => ({
    fav: false,
    menu: false,
    message: false,
    hints: true,
    accountInfo: {
      email: "",
      login: "",
      name: "",
      phone: "",
      password: "",
    },
  }),
  computed: {
    ...mapGetters([
      "AccountInfo",
      // ...
    ]),
  },
  created() {
    this.email = this.AccountInfo.email;
    this.login = this.AccountInfo.login;
    this.name = this.AccountInfo.name;
    this.phone = this.AccountInfo.phone;
    this.password = this.AccountInfo.password;
  },
  methods: {
    async userUpdate() {
      try {
        this.menu = false;
        this.fav = false;
        const userVM = {
          id: this.AccountInfo.id,
          name: this.name,
          login: this.login,
          password: this.password,
          phone: this.phone,
          email: this.email,
          agencyId: this.AccountInfo.agency.id,
        };
        const resultUser = await UserUpdate(userVM);
        const payload = {
          login: this.login,
          password: this.password,
        };
        await this.$store.dispatch("initUser", payload);
        this.$notification.success(`Пользователь ${resultUser.name} изменен`, {
          timer: 10,
          position: "bottomRight",
        });
      } catch (error) {
        this.$notification.error(error, {
          timer: 10,
          position: "bottomRight",
        });
      }
    },
  },
};
</script>

<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
    >
      <template v-slot:activator="{ on, attrs }">
        <v-app-bar-nav-icon v-bind="attrs" v-on="on"></v-app-bar-nav-icon>
      </template>
      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <v-avatar color="primary">{{ login[0] }}</v-avatar>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title
                ><input
                  type="text"
                  v-model="login"
                  :class="fav ? 'brown lighten-5' : ''"
                  :disabled="!fav"
              /></v-list-item-title>
              <v-list-item-subtitle
                ><input
                  type="text"
                  v-model="name"
                  :class="fav ? 'brown lighten-5' : ''"
                  :disabled="!fav"
              /></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn
                :class="fav ? 'brown lighten-5' : ''"
                icon
                @click="fav = !fav"
              >
                <v-icon>mdi-wrench</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Телефон</v-list-item-title>
              <v-list-item-subtitle
                ><input
                  type="text"
                  v-model="phone"
                  :class="fav ? 'brown lighten-5' : ''"
                  :disabled="!fav"
                />
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Учреждение</v-list-item-title>
              <v-list-item-subtitle>{{
                AccountInfo.agency.shortName
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Электронная почта</v-list-item-title>
              <v-list-item-subtitle
                ><input
                  type="text"
                  v-model="email"
                  :class="fav ? 'brown lighten-5' : ''"
                  :disabled="!fav"
              /></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text @click="menu = false"> Закрыть </v-btn>
          <v-btn color="primary" text @click="userUpdate"> Сохранить </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>
