import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private _http:HttpClient) { }
  getTasks(){
    return this._http.get<Task[]>(environment.host+"/tasks");
  }
  postTasks(task:Task){
    console.log(task)
    return this._http.post<Task>(environment.host+"/tasks",task)
  }
  deleteTask(id:number){
     return this._http.delete(environment.host+"/tasks/"+id)
  }
  betTaskById(id:number){
    return this._http.get<Task>(environment.host+"/tasks/"+id);
  }
  updateTask(Task:Task){
    return this._http.put(`${environment.host}/${"tasks"}/${Task.id}`,Task);
  }
  completed(id:any,comple:any){
    console.log(comple);
    return this._http.patch(`${environment.host}/${"tasks"}/${id}`,{completed:!comple});

  }
}
