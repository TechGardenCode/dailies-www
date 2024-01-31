import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor() {}

  getTask(groupId: number): Observable<
    {
      title: string;
      description: string;
      status: string;
    }[]
  > {
    return of([
      {
        title: 'Bird Home',
        description: 'Find 5 sticks and bring them back to the bird',
        status: 'IN_PROGRESS',
      },
      {
        title: "Bee's Little Helper",
        description: 'Water the plants you planted in the ground',
        status: 'IN_PROGRESS',
      },
      {
        title: 'Lost Children',
        description: "Find the Lady Duck's children lost in the forest",
        status: 'NEW',
      },
      {
        title: 'Nuts found',
        description: 'Find 8 nuts and bring them back to the squirrel',
        status: 'COMPLETE',
      },
    ]).pipe(delay(500));
  }
}
