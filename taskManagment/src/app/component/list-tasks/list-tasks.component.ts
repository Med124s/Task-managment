import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.css']
})
export class ListTasksComponent implements OnInit {

  @Input('myTask') myTask:any
  @Input('tasks') tasks:Task[] = []
  @Input('tasksResult') tasksResult:Task[] = []


  constructor(private _servTasks:TaskService,private _toastr:ToastrService ) { }

  ngOnInit(): void {
    this._servTasks.getTasks().subscribe(
      data=>{
        this.tasksResult =  this.tasks  =  data
      },
      err=>console.log("Error Http")
    )
 
  }
  deleteTask(id:any){
    this._servTasks.deleteTask(id).subscribe(()=>{
    this.tasksResult = this.tasks= this.tasks.filter(t=>t.id !=id);
    this._toastr.warning("Bien Supprimer","Suppression")
   }
   );
 }
 completed(task:Task){
  this._servTasks.completed(task.id,task.completed).subscribe(()=>{
    task.completed = !task.completed
  });
}
  editTask(task:Task){
    this.myTask = task;
  }

}
