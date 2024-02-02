import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, of } from 'rxjs';
import { Task } from '../types/task.type';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  taskLists: { [key: string]: Task[] } = {
    active: [
      {
        id: crypto.randomUUID(),
        title: 'Bird Home',
        description: 'Find 5 sticks and bring them back to the bird',
        status: 'IN_PROGRESS',
      },
      {
        id: crypto.randomUUID(),
        title: "Bee's Little Helper",
        description: 'Water the plants you planted in the ground',
        status: 'IN_PROGRESS',
      },
      {
        id: crypto.randomUUID(),
        title: 'Lost Children',
        description: "Find the Lady Duck's children lost in the forest",
        status: 'NEW',
      },
      {
        id: crypto.randomUUID(),
        title: 'Nuts found',
        description: 'Find 8 nuts and bring them back to the squirrel',
        status: 'COMPLETE',
      },
    ],
    day: [],
    week: [],
    month: [],
    seasonal: [],
    year: [],
  };

  _taskList: Task[] = [];
  taskListSubject = new BehaviorSubject<Task[] | undefined>(undefined);

  constructor() {}

  set taskList(taskList: Task[]) {
    this._taskList = taskList;
    this.taskListChange();
  }

  get taskList() {
    return this._taskList;
  }

  taskListChange() {
    of(this._taskList)
      .pipe(delay(500 * Math.random()))
      .subscribe({ next: (taskList) => this.taskListSubject.next(taskList) });
  }

  updateTask(task: Task) {
    if (!task.id) {
      alert('need id to update task');
    }
    const taskIndex = this.taskList.findIndex((t) => t.id === task.id);
    if (taskIndex >= 0) {
      this.taskList[taskIndex] = task;
    }
    this.taskListChange();
  }

  addTask(task: Task) {
    task.id = crypto.randomUUID();
    this.taskList.push(task);
    this.taskListChange();
  }

  getTaskList(view?: string) {
    if (!view) {
      return;
    }
    this.taskListSubject.next(undefined);
    this.taskList = this.taskLists[view];
  }

  completeTask(task: Task) {
    task.status = 'COMPLETE';
  }
}
