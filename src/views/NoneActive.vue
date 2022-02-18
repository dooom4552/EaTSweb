<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AgencyList from "./AgencyList.vue";
import { mapGetters } from "vuex";

@Component({
  components: { AgencyList },
  computed: {
    ...mapGetters([
      "AccountInfo",
      // ...
    ]),
  },
})
export default class MainUser extends Vue {}
</script>
<template>
  <div id="app">
    <v-app id="inspire">
      <v-card>
        <v-toolbar color="cyan" dark flat>
          <v-col class="hidden-xs-only" sm="1" md="1">
            <v-avatar color="primary" size="56">{{
              AccountInfo.login
            }}</v-avatar>
          </v-col>

          <v-toolbar-title>Ваш аккаунт не подтвержден</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn href="logout" icon>
            <v-icon>mdi-logout</v-icon>
          </v-btn>

          <template v-slot:extension> </template>
        </v-toolbar>
      </v-card>
    </v-app>
  </div>
</template>
