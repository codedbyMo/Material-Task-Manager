import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Task } from './task-interfaces/task-list.interface';
import { MatTableDataSource } from '@angular/material/table';
import { TASK_DATA } from './task-data/task.data';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MaterialModule } from '../../shared/material.module';
import { DatePipe } from '@angular/common';
import { TaskFormComponent} from '../task-form/task-form.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-task-list',
  imports: [MaterialModule, DatePipe],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'title', 'priority', 'deadline'];
  dataSource = new MatTableDataSource<Task>(TASK_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog) {}

  openTaskDialog(task?: Task) {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      data: task? {...task} : null,
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (task) {
          Object.assign(task, result);
        } else {
          const newTask: Task = {
            id: this.dataSource.data.length + 1,
            ...result
          };
          this.dataSource.data = [...this.dataSource.data, newTask];
        }
        this.dataSource._updateChangeSubscription();
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
