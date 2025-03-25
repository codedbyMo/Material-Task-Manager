import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { TaskListComponent } from './components/task-list/task-list.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'tasks', pathMatch: 'full' },
      { path: 'tasks', component: TaskListComponent },
    ],
  },
  { path: '**', redirectTo: 'tasks' },
];
