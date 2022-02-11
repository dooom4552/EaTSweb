<script lang="ts">
import { TodoItem } from "@/models/TodoItem";
import router from "@/router";
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import { getLogin, getList, addItem, changeItem, deleteItem } from "../API/API";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";

@Component({})
export default class Main extends Vue {
  @Prop({ default: "Input Property" })
  exampleProperty!: string;
  login: string = "";
  list: TodoItem[] = [];
  nameTodo: string = "";
  connection: HubConnection = new HubConnectionBuilder()
    .withUrl("https://localhost:44330/chat")
    .build();
  myWatchedProperty: string = "Watched Property";
  get myComputedProp() {
    return Math.random();
  }
  @Watch("myWatchedProperty")
  onPropertyChanged(value: string, oldValue: string) {
    console.log(value);
    console.log(oldValue);
    this.myWatchedProperty = "Watched Property Changed";
  }
  async mounted() {
    this.login = await getLogin();
    this.list = await getList();

    this.connection.start().then(() => this.connection.invoke("send", "Hello"));
    this.connection.on("send", (data) => {
      console.log(data);
      this.update();
    });
  }
  async update() {
    this.list = await getList();
    console.log("object");
  }
  async submit(nameTodo: string): Promise<void> {
    const todoItem: TodoItem | undefined = await addItem(nameTodo);
    this.nameTodo = "";
    if (!todoItem) return;
    this.list.push(todoItem);
    this.connection.invoke("send", "Hello");
  }
  async changeItem(item: TodoItem) {
    const citem = await changeItem(item);
    this.connection.invoke("send", "Hello");
    console.log(citem);
  }
  async deleteItem(item: TodoItem) {
    const result = await deleteItem(item);
    if (!result) return;
    this.list = this.list.filter((todoItem) => todoItem !== item);
    this.connection.invoke("send", "Hello");
    console.log(result);
  }
  logout(): void {
    window.localStorage.removeItem("token");
    router.push("register");
  }
}
</script>
<template>
  <div>
    <v-app-bar color="blue" elevation="4">
      <v-toolbar-title>{{ login }}</v-toolbar-title>
      <v-spacer />

      <v-btn @click="logout">logout</v-btn>
    </v-app-bar>
    <v-container class="m-5">
      <v-list>
        <v-subheader>Список</v-subheader>

        <v-form @submit.prevent="submit(nameTodo)">
          <v-text-field
            v-model="nameTodo"
            label="TaskDescription"
            required
          ></v-text-field>
          <v-btn type="submit" :disabled="!nameTodo">add</v-btn>
        </v-form>
        <v-list-item-group color="primary">
          <v-list-item v-for="(item, i) in list" :key="i">
            <template>
              <v-list-item-action>
                <v-checkbox
                  @change="changeItem(item)"
                  v-model="item.IsComplete"
                  color="primary"
                ></v-checkbox>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Задача</v-list-item-title>
                <v-list-item-subtitle>{{
                  item.TaskDescription
                }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-btn depressed color="error" @click="deleteItem(item)"
                >delete</v-btn
              >
            </template>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-container>
  </div>
</template>
<style></style>
