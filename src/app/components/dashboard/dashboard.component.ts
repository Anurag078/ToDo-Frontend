import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';
import { debounceTime, Subject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  tasks: any[] = [];
  userId: any;
  searchSubject = new Subject();
  sText: string = '';
  backup: any[] = [];

  constructor(
    private taskService: TaskService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.userId = localStorage.getItem('id');
    }

    this.taskService.getAllTasks().subscribe((data: any) => {
      this.tasks = data;
      this.backup = data;
    });

    this.searchSubject.pipe(debounceTime(500)).subscribe((res: any) => {
      console.log("***res****", res);
      this.tasks = this.backup.filter((item: any) => item?.title.includes(res));
    });
  }

  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe(() => {
      alert('Task deleted successfully');
      this.tasks = this.tasks.filter((task) => task.id !== taskId);
    });
  }

  updateTask(taskId: any) {
    console.log("TaskId:::   ", taskId);
    this.router.navigate(['add-task'], { queryParams: { id: taskId } });
  }

  logout() {
    alert('Logged out successfully');
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
    this.router.navigate(['/login']);
  }

  searchText(ev: any): void {
    console.log("*search**", ev.target.value);
    this.sText = ev.target.value;
    this.searchSubject.next(this.sText);
  }
}
