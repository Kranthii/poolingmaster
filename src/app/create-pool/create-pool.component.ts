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
from_address:string;
from_landmark:string;
from_Pincode:Number;
to_address:string;
to_landmark:string;
to_pincode:Number;
free_seats:Number;
dateTime:any;
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
     this.from_address="RMZ";
     this.from_landmark="WhiteField";
     this.from_Pincode=560066;
      this.to_address="";
      this.to_landmark="";
      this.to_pincode=null;
    }
    if(this.SelectedPool=='To Office'){

      this. fromDisable=false;
      this.toDisable=true;
      this.to_address="RMZ";
      this.to_landmark="WhiteField";
      this.to_pincode=560066;
       this.from_address="";
       this.from_landmark="";
       this.from_Pincode=null;
    }
  }
  OnSubmit(){
   this.onNoClick();
   this.putRide();
    console.log(this.free_seats);
    console.log(localStorage.getItem('userId'));
  }

  putRide(){
    var rideTxt = '{' +
        '"rider_id" :"'+ localStorage.getItem('empId')+ '",' +
        '"first_name" :"'+ localStorage.getItem('currentUserFN')+ '",' +
        '"last_name" :"'+ localStorage.getItem('currentUserLN')+ '",' +
        '"free_seats" :"'+this.free_seats+'",' +
        '"start_time" : "'+ new Date()+'",' +
        '"from" :{' +
            '"building": "'+this.from_address+'",' +
            '"street":"'+this.from_landmark+'",' +
            '"zipcode": "'+this.from_Pincode+'"' +
        '},' +
        '"to" : {' +
            '"building": "'+this.to_address+'",'+
            '"street":"'+this.to_landmark+'",'+
            '"zipcode": "'+this.to_pincode+'"'+
        '},'+
        '"preferences" : {'+
            '"pref_id" : 7698,'+
            '"isSmokingAllowed" : false,'+
            '"isPetAllowed" : false,'+
            '"sameGenderFlag" : false'+
        '},'+
        '"list_of_co_riders" : [203],'+
        '"cost_per_person" : 100,'+
        '"timestamp" : "'+ new Date()+'"'+
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


