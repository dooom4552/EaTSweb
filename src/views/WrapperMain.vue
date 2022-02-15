<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MainAdmin from "./MainAdmin.vue";
import MainCurator from "./MainCurator.vue";
import MainUser from "./MainUser.vue";
import { mapGetters } from "vuex";

@Component({
  components: {
    MainAdmin,
    MainCurator,
    MainUser,
  },
  computed: {
    ...mapGetters([
      "AccountInfo",
      // ...
    ]),
  },
})
export default class WrapperMain extends Vue {
  logout(): void {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("currentUser");
    this.$router.push("register");
  }
}
</script>
<template>
  <div v-if="AccountInfo">
    <div v-if="AccountInfo.role === UserRole.Administrator"><MainAdmin /></div>
    <div v-else-if="AccountInfo.role === UserRole.Curator"><MainCurator /></div>
    <div v-else><MainUser /></div>
  </div>
</template>
<style></style>
