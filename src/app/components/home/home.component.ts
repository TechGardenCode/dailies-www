import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
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
}
