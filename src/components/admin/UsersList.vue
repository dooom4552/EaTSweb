<script>
import { getUser } from "../../API/API";

export default {
  name: "tutorials-list",
  data() {
    return {
      fakeAllUsers: [],
      users: [],
      tutorials: [],
      headers: [
        { text: "Логин", align: "start", sortable: false, value: "login" },
        { text: "Имя", align: "start", sortable: false, value: "name" },
        { text: "Электронная почта", value: "email", sortable: false },
        { text: "Телефон", value: "phone", sortable: false },
        { text: "Статус", value: "isActive", sortable: false },
        { text: "Учреждение", value: "agency", sortable: false },
        { text: "Действия", value: "actions", sortable: false },
      ],
      page: 1,
      totalPages: 10,
      pageSize: 10,
      pageSizes: [3, 6, 9],
      searchTitle: "",
    };
  },
  async mounted() {
    await this.retrieveTutorials();
  },
  methods: {
    getRequestParams(searchTitle, page, pageSize) {
      let params = {};
      if (searchTitle) {
        params["title"] = searchTitle;
      }
      if (page) {
        params["page"] = page - 1;
      }
      if (pageSize) {
        params["size"] = pageSize;
      }
      return params;
    },
    async retrieveTutorials() {
      const params = {
        searchTitle: this.searchTitle.toLowerCase(),
        page: this.page,
        pageSize: this.pageSize,
      };
      const { curentUsers, totalPages } = await this.imitationApi(params);
      this.users = curentUsers;
      this.totalPages = totalPages;
    },
    handlePageChange(value) {
      this.page = value;
      this.retrieveTutorials();
    },
    handlePageSizeChange(size) {
      this.pageSize = size;
      this.page = 1;
      this.retrieveTutorials();
    },
    getDisplayTutorial(tutorial) {
      console.log(tutorial);
      return {
        id: tutorial.id,
        title: tutorial.title.substr(0, 20) + "...",
        description: tutorial.description.substr(0, 20) + "...",
        status: tutorial.published ? "Published" : "Pending",
      };
    },
    async imitationApi(params) {
      try {
        this.fakeAllUsers = await getUser();

        if (params.searchTitle) {
          this.fakeAllUsers = this.fakeAllUsers.filter((user) => {
            return (
              user.name.toLowerCase().includes(params.searchTitle) ||
              user.login.toLowerCase().includes(params.searchTitle) ||
              user.agency.shortName
                .toLowerCase()
                .includes(params.searchTitle) ||
              user.phone.toLowerCase().includes(params.searchTitle) ||
              user.email.toLowerCase().includes(params.searchTitle)
            );
          });
        }
        let totalPages = Math.floor(this.fakeAllUsers.length / params.pageSize);
        if (!totalPages) totalPages = 1;
        const curentUsers = this.fakeAllUsers.slice(
          (params.page - 1) * params.pageSize,
          params.page * params.pageSize
        );
        return {
          totalPages,
          curentUsers,
        };
      } catch (error) {
        console.log(error);
      }
    },
    deleteTutorial(id) {
      console.log(id);
    },
    editUser(user) {
      console.log(user);
    },
  },
};
</script>

<template>
  <v-row v-if="fakeAllUsers" align="center" class="list px-3 mx-auto">
    <v-col cols="12" sm="8">
      <v-text-field
        v-model="searchTitle"
        label="Поиск"
        @input="retrieveTutorials"
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="4">
      <v-btn
        class="white--text ma-5"
        :color="'cyan'"
        @click="
          page = 1;
          retrieveTutorials();
        "
      >
        Поиск
      </v-btn>
    </v-col>
    <v-col cols="12" sm="12">
      <v-row>
        <v-col cols="4" sm="3">
          <v-select
            v-model="pageSize"
            :items="pageSizes"
            label="Пользователей на странице"
            @change="handlePageSizeChange"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="9">
          <v-pagination
            v-model="page"
            :length="totalPages"
            total-visible="5"
            next-icon="mdi-menu-right"
            prev-icon="mdi-menu-left"
            @input="handlePageChange"
          ></v-pagination>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Tutorials</v-card-title>
        <v-data-table
          :headers="headers"
          :items="users"
          disable-pagination
          :hide-default-footer="true"
        >
          <template v-slot:[`item.isActive`]="{ item }">
            {{ item.isActive ? "активен" : "не активен" }}
          </template>
          <template v-slot:[`item.agency`]="{ item }">
            {{ item.agency.shortName }}
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editUser(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteTutorial(item.id)"> mdi-delete </v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>
