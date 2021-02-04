import { Component, OnInit, ViewChild } from '@angular/core';
import { appConsts } from './Constants/appConstants';
import { Task } from './Core/models/task.model';
import { TodoService } from './Core/Services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'To-Do-App';
  taskListData: Array<Task> = [];
  catogories = [];
  defaultCategory = "priority";
  filterTask = '';
  filterCategory = 'All';

  @ViewChild("f") form: any;


  constructor(private todo: TodoService) {
    this.catogories = appConsts.todoCatogories;
  }
  ngOnInit() {
    this.taskListData = this.todo.getTaskList();
    this.todo.tasksEmitter.subscribe((data) => {
      this.taskListData = data;
      console.log("data", data);
    });
  }


  onSubmit() {
    if (this.form.valid) {
      let data: Task;
      console.log("item added!");
      console.log(this.form, "Form");
      data = {
        title: this.form.value.task,
        category: this.form.value.category,
        desc: this.form.value.description
      };
      let isDuplicate = this.taskListData.map(obj => obj.title).findIndex(itm => itm === data.title);
      console.log(isDuplicate, "Is duplicate?")
      if (isDuplicate === -1) {
        this.todo.addTaskItem(data);

      } else {
        alert("That Task Already Exists!!");
      }
      this.form.reset({ category: this.defaultCategory }); // to fix the bug in select field on form reset

    }
  }
  deleteTask(i: number) {
    this.todo.deleteTask(i);
  }
  clearAllTask() {
    if (confirm("You Sure ?"))
      this.todo.clearAllTasks();
  }

}
