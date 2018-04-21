import { Component, OnInit, Inject } from '@angular/core';
import { TasksService } from "../tasks.service";
import { MatDialogRef } from "@angular/material/dialog";
import {Observable} from 'rxjs/Observable';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { Router, ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-create-pool',
  templateUrl: './create-pool.component.html',
  styleUrls: ['./create-pool.component.css']
})

export class CreatePoolComponent {
Pools = [
  'From Office',
  'To Office',
];
fromDisable:boolean=false;
toDisable:boolean=false;
from_city: string;
to_city:string;
free_seats:Number;
SelectedPool: string;
  constructor(private tasksService:TasksService,
    // prsivate pageFeature: PageFeaturesComponent,
    public dialogRef: MatDialogRef<CreatePoolComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
   Confirm(ride:any ){
 console.log(ride);
  }

  OnRadioChange(){
    if(this.SelectedPool=='From Office'){
     
     this.fromDisable=true;
     this.toDisable=false;
     
    }
    if(this.SelectedPool=='To Office'){
      
      this. fromDisable=false;
      this.toDisable=true;
     
    }
  }
  OnSubmit(){
    console.log(this.from_city);
    console.log(this.to_city);
    console.log(this.free_seats);
    console.log(localStorage.getItem('userId'));
  }

  putRide(){
    var rideTxt = '{' +
        '"rider_id" :"'+ localStorage.getItem('empId')+ '",' +
        '"first_name" :"'+ localStorage.getItem('currentUserFN')+ '",' +
        '"last_name" :"'+ localStorage.getItem('currentUserLN')+ '",' +
        '"free_seats" :'+this.free_seats+',' +
        '"start_time" : "17/04/2018 17:30:00",' +
        '"from" :{' +
            '"building": "3B",' +
            '"street":"'+this.from_city+'",' +
            '"zipcode": "104233"' +
        '},' +
        '"to" : {' +
            '"building": "1007",'+
            '"street":"'+this.to_city+'",'+
            '"zipcode": "10462"'+
        '},'+
        '"preferences" : {'+
            '"pref_id" : 7698,'+
            '"isSmokingAllowed" : false,'+
            '"isPetAllowed" : false,'+
            '"sameGenderFlag" : false'+
        '},'+
        '"list_of_co_riders" : [203],'+
        '"cost_per_person" : 100,'+
        '"timestamp" : "20/02/2018 17:00:00"'+
    '}'
    console.log(rideTxt);
    var ride = JSON.parse(rideTxt);
    // console.log(ride);
    this.tasksService.putRide(ride).subscribe(
           data => {
           console.log('ride added')
           },
         error => {
             console.error("Error saving ride!");
             return Observable.throw(error);
           }
         );
  }
}


