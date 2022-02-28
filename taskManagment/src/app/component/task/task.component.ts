import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/service/task.service';
import { UpdateTaskComponent } from '../update-task/update-task.component';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit/*AfterViewInit*/ {

  constructor(private _servTasks:TaskService,private _toastr:ToastrService) { }

  tasks:Task[] = [];
  tasksResult:Task[] = [];
  successAdd:boolean = false;
  displayTask:boolean = false;
  searchText:string = '';
  myTask:Task = {
    label:'',
    completed:false
  }
  ngOnInit(): void {
    this.getAllTasks();
    
  }
  allTask(){
    this.displayTask = !this.displayTask;
  }
  addTask(){
     this._servTasks.postTasks(this.myTask).subscribe((taskAdded)=>{
      this.tasksResult = this.tasks = [taskAdded,...this.tasks];
      this.reseatTask();
      this.displayTask = false;
      this.successAdd = true;
      this._toastr.success(taskAdded.label+" Bien Ajouter","Ok")


    });
  }

  getAllTasks(){
    this._servTasks.getTasks().subscribe(
      data=>{
        this.tasksResult =  this.tasks  =  data
      },
      err=>console.log("Error Http")
    )
  }

  deleteTask(id:any){
     this._servTasks.deleteTask(id).subscribe(()=>{
      this.tasksResult= this.tasks= this.tasks.filter(t=>t.id !=id);
      this._toastr.warning("Bien Supprimer","Suppression")
    }
    );
  }

  editTask(task:Task){
    this.myTask = task;
  }
  updateTask(cuurentTask:Task){
    this._servTasks.updateTask(cuurentTask).subscribe(()=>{
      this.reseatTask();
      
    });
  }
  reseatTask(){
    this.myTask = {
      label:'',
      completed:false
    }
  }
  completed(task:Task){
    this._servTasks.completed(task.id,task.completed).subscribe(()=>{
      task.completed = !task.completed
    });
  }
  search(){
   
    this.tasksResult = this.tasks.filter((t)=>t.label.toLowerCase().includes(this.searchText.toLowerCase()))

  }

  //pratique components interaction cours
  // available:boolean = true

  //1) ngModelChange and split data binding
  //2) Getters and Setters
  // username:string = 'name';
  // private customerNam:string = '';

  
  // public get customerName() : string {
  //   return this.customerNam
  // }
  
  // public set customerName(customer : string) {

  //   this.customerNam =customer ;
  //   this.username = this.customerNam ;
  //   if(this.username == 'ali'){
     
  //     alert("hey")
  //   }

/*View Child form dom interaction
          @ViewChild("focusInput") myInput!:ElementRef;
          @ViewChild("childClick") childInput!:ElementRef;


          ngAfterViewInit() {
              this.myInput.nativeElement.focus();
              this.childInput.nativeElement.click(this.event());
          }
          event(){
            alert("hey")
          }
  */
 /*
          Input Decorator
          CHILD WILL RECEPT THE VALUE FROM PARENT COMPONENT

          isLogging!:boolean;
          login(){
            return this.isLogging = true
          }
          logout(){
            return this.isLogging = false
          }
 */
  /* 
          Component Interaction -  - ngOnChanges just using in child component
   */
          // loggedIn!:boolean
          // send(){
          //   this.loggedIn = true;
          // }
          /*Using viewChild to access to element or function existed in child */
            //   ngAfterViewInit() {
            //     this.childComponentRef.message = "hello from parent";
            // }
            //   @ViewChild(UpdateTaskComponent, { static: false })
            //   childComponentRef!: UpdateTaskComponent;
          
     
  }
  
  
