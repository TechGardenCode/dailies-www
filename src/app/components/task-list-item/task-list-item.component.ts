import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task-list-item',
  templateUrl: './task-list-item.component.html',
  styleUrls: ['./task-list-item.component.scss'],
})
export class TaskListItemComponent {
  @Input()
  task!: {
    title: string;
    description: string;
    status: string;
  };


}
