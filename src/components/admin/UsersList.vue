<script>
import TutorialDataService from "../../service/TutorialDataService";
import { getUser } from "../../API/API";

export default {
  name: "tutorials-list",
  data() {
    return {
      users: [],
      tutorials: [],
      searchTitle: "",
      headers: [
        { text: "Title", align: "start", sortable: false, value: "title" },
        { text: "Description", value: "description", sortable: false },
        { text: "Status", value: "status", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
      page: 1,
      totalPages: 10,
      pageSize: 3,
      pageSizes: [3, 6, 9],
    };
  },
  async mounted() {
    this.retrieveTutorials();
    this.users = getUser(1);
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
    retrieveTutorials() {
      const params = this.getRequestParams(
        this.searchTitle,
        this.page,
        this.pageSize
      );
      TutorialDataService.getAll(params)
        .then((response) => {
          console.log(response);
          const { tutorials, totalPages } = response.data;
          this.tutorials = tutorials;
          this.totalPages = totalPages;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
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
  },
};
</script>

<template>
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" sm="8">
      <v-text-field
        v-model="searchTitle"
        label="Search by Title"
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="4">
      <v-btn
        small
        @click="
          page = 1;
          retrieveTutorials();
        "
      >
        Search
      </v-btn>
    </v-col>
    <v-col cols="12" sm="12">
      <v-row>
        <v-col cols="4" sm="3">
          <v-select
            v-model="pageSize"
            :items="pageSizes"
            label="Items per Page"
            @change="handlePageSizeChange"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="9">
          <v-pagination
            v-model="page"
            :length="totalPages"
            total-visible="3"
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
          :items="tutorials"
          disable-pagination
          :hide-default-footer="true"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editTutorial(item.id)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteTutorial(item.id)"> mdi-delete </v-icon>
          </template>
        </v-data-table>
        ...
      </v-card>
    </v-col>
  </v-row>
</template>
