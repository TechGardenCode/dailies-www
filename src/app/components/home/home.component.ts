import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  groups = [
    {
      id: 0,
      view: 'active',
      displayName: '!',
    },
    {
      id: 1,
      view: 'day',
      displayName: 'D',
    },
    {
      id: 2,
      view: 'week',
      displayName: 'W',
    },
    {
      id: 3,
      view: 'month',
      displayName: 'M',
    },
    {
      id: 4,
      view: 'seasonal',
      displayName: 'S',
    },
    {
      id: 5,
      view: 'year',
      displayName: 'Y',
    },
  ];

  selectedGroupId = 0;

  constructor(private readonly taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTaskList(
      this.groups.find((g) => g.id === this.selectedGroupId)?.view
    );
  }

  selectGroup(group: any) {
    this.selectedGroupId = group.id;
    this.taskService.getTaskList(group.view);
  }
}
