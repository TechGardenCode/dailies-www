import { Component, HostListener, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  _groupId!: number;
  taskList: any[] = [];
  taskListSub!: Subscription;
  addTaskModalVisible = true;

  constructor(private readonly taskService: TaskService) {}

  initTaskList() {
    this.taskListSub = this.taskService.getTask(this.groupId).subscribe({
      next: (data) => {
        this.taskList = data;
      },
    });
  }

  @Input()
  set groupId(groupId: number) {
    if (this._groupId !== groupId) {
      this.taskListSub?.unsubscribe();
      this.taskList = [];
    }
    this._groupId = groupId;
    this.initTaskList();
  }

  get groupId() {
    return this._groupId;
  }

  openAddTaskModal() {
    this.addTaskModalVisible = true;
  }
}
