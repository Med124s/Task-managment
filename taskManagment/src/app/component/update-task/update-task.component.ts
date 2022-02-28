import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnChanges {

  //Interaction between child and parent using Template Reference Variables 
  name:string = "Mohammed";
  message?:string;
  getName(){
    alert(this.name);
  }
   
    
  //interaction parent child using getter and setter
  // public get logging() : boolean {
  //   return this.logged;
  // }
  // @Input()
  // public set logging(logged:boolean) {
  //    this.logged = logged;
  // }
    @Input('logging') loggedIn!:boolean;

  constructor(private _routeActve:ActivatedRoute) { }
  //Detect every change in input of component
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes) //{previousValue: undefined, currentValue: true, firstChange: true}
    if(changes['loggedIn'].currentValue === true){
      alert("hey from children")
    }
  }



}
