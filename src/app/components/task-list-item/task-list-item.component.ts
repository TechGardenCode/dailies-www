import { Component, Input } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/types/task.type';

@Component({
  selector: 'app-task-list-item',
  templateUrl: './task-list-item.component.html',
  styleUrls: ['./task-list-item.component.scss'],
})
export class TaskListItemComponent {
  @Input()
  task!: Task;

  constructor(private readonly taskService: TaskService) {}

  toggleTaskStatus(task: Task) {
    task.status = task.status === 'COMPLETE' ? 'IN_PROGRESS' : 'COMPLETE';
    this.taskService.updateTask(task);
  }
}
