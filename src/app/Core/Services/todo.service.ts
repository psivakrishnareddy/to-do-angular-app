import { EventEmitter, Injectable, Output } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  @Output() tasksEmitter = new EventEmitter();
  taskList: Array<Task> = this.getTasksFromLocalStorage();

  constructor() {
    console.log("To do service..");
    console.log(this.taskList);
  }
  getTaskList() {
    return this.taskList.slice();
  }
  addTaskItem(task: Task) {
    this.taskList.push(task);
    this.updateLocalStorage();
    this.tasksEmitter.emit(this.taskList.slice());
  }
  editTaskItem(newTitle: string, id: number) {
    this.taskList[id].title = newTitle;
    this.tasksEmitter.emit(this.taskList.slice());
    this.updateLocalStorage();

  }
  deleteTask(index) {
    this.taskList.splice(index, 1);
    this.tasksEmitter.emit(this.taskList.slice());
    this.updateLocalStorage();
  }
  clearAllTasks() {
    this.taskList = [];
    this.updateLocalStorage();
    this.tasksEmitter.emit(this.taskList.slice());
  }
  //Local Storage funcs
  getTasksFromLocalStorage() {
    let items: any;
    if (localStorage.getItem("task-store") !== null) {
      items = JSON.parse(localStorage.getItem("task-store"));
      // console.log(items, "LS");
    } else {
      items = [];
    }
    return items;
  }

  updateLocalStorage() {
    localStorage.setItem("task-store", JSON.stringify(this.taskList));

  }

}
