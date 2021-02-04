import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../Core/models/task.model';
import { TodoService } from '../Core/Services/todo.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {
  @Input() taskData: Task;
  @Input() id: number;

  isEditMode: boolean = false;
  titleEdit: string;

  constructor(private todo: TodoService) { }

  ngOnInit(): void {
    this.titleEdit = this.taskData.title;
  }
  deleteTask() {
    this.todo.deleteTask(this.id);
  }
  toggleEdit() {
    this.isEditMode = !this.isEditMode;
  }
  saveEdit() {
    this.todo.editTaskItem(this.titleEdit, this.id);
    // this.titleEdit = '';
    this.titleEdit = this.taskData.title;
    this.toggleEdit();
  }
  setBadgeColor() {

    switch (this.taskData.category) {
      case "priority":
        return "badge-danger";
      case "moderate":
        return "badge-warning";
      case "notes":
        return "badge-success";
      case "events":
        return "badge-info";
      case "general":
        return "badge-secondary";
      default:
        break;
    }

  }
}
