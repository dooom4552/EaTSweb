export class TodoItem {
  Id: number;
  TaskDescription: string;
  IsComplete: boolean;
  constructor(todoItemType: TodoItemType) {
    this.Id = todoItemType.Id;
    this.TaskDescription = todoItemType.TaskDescription;
    this.IsComplete = todoItemType.IsComplete;
  }
}

export type TodoItemType = {
  Id: number;
  TaskDescription: string;
  IsComplete: boolean;
};
