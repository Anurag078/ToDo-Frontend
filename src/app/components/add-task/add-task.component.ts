import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { take } from 'rxjs';


@Component({
  selector: 'app-add-task',
  standalone:false,
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  
})
export class AddTaskComponent {
  title: string = '';
  description: string = '';
 complete:string='incomplete';
isEdit:boolean=false;

taskId:any;
  constructor(private taskService: TaskService, private router: Router,private activatroute:ActivatedRoute) {
    this.activatroute.queryParams.subscribe((param:any)=>{
      console.log("$$$$$$Pram$$$$$",param);
      if(param?.id){
        this.isEdit=true;//update
        this.taskId=param?.id;
        this.getTaskById(this.taskId);
      }
      else{
        this.isEdit=false;//Add
      }
    })
  }

getTaskById(id:any){
  this.taskService.getTasksById(id).pipe(take(1)).subscribe((res:any)=>{
    console.log("%%%%%%",res);
    if(res && res?.id){
      this.title=res?.title;
      this.description=res?.description;
      this.complete=res?.completed===true?'complete':'incomplete';

    }
  })
}
  addTask() {
    const task = {
      title: this.title,
      description: this.description,
      completed:this.complete==='complete',
      user: { id: localStorage.getItem('id') }, // Replace with logged-in user ID
    };
    console.log("TTTTTTASK :",task);
    if(this.isEdit){
      this.taskService.updateTask(task,this.taskId).subscribe((res:any)=>{
        if(res && res?.id){
          alert("Task updated sucessfully");
          this.router.navigate(['dashboard']);
        }
        console.log("****************",res);
      },(err:any)=>{
        console.log("****err************",err);
      })


    }
    else{
      this.taskService.addTask(task).subscribe({
        next: () => {
          alert('Task added successfully');
          this.router.navigate(['/dashboard']);
        },
        error: () => alert('Error adding task'),
      });
    }


  }
  getStatusValue(ev:any){
    console.log("&&&&&&",ev.target.value);
    this.complete=ev.target.value;

  }
}
