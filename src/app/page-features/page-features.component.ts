import { Component, OnInit, Input, Inject } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import { FormControl } from '@angular/forms';
import { TasksService } from '../tasks.service';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './confiramtionPopup.html'
})
export class DialogOverviewExampleDialog {
 IsConfirmed:boolean=true;
 show: boolean = true;
seats:number;

  constructor(private tasksService:TasksService,
    // prsivate pageFeature: PageFeaturesComponent,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
   Confirm(ride:any ){
 this.IsConfirmed=false;
 console.log(ride);
 this.updateSeatCount(ride);
  }

  updateSeatCount(ride:any){
   ride.free_seats = ride.free_seats-this.seats
    console.log(ride);
    this.tasksService.updateSeatsCount(ride).subscribe(
           data => {
           console.log('ride updated');
          //  this.pageFeature.getRides();
           },
         error => {
             console.error("Error saving ride!");
             return Observable.throw(error);
           }
         );
  }

}


@Component({
  selector: 'app-page-features',
  templateUrl: './page-features.component.html',
  styleUrls: ['./page-features.component.css'],
  providers:[]
})
export class PageFeaturesComponent implements OnInit {
  tasks: any=[];
  fromCities = [];
  originalFromCities = [];
  toCities = [];
  originalToCities = [];
  showRides = [];
  formValue: string;
  toValue:string;
  display: boolean = false;
  Pools = [
    'From Office',
    'To Office',
    'None'
  ];
  fromDisable:boolean=false;
  toDisable:boolean=false;
  SelectedPool: string;

OnRadioChange(){
  if(this.SelectedPool=='From Office'){
    this.formValue="RMZ";
    this.toValue="";
   this.fromDisable=true;
   this.toDisable=false;
   this.SearchRides();
  }
 else if(this.SelectedPool=='To Office'){
    this.toValue="RMZ";
    this.formValue="";
    this. fromDisable=false;
    this.toDisable=true;
    this.SearchRides();
  }
  else{
    this.toValue="";
    this.formValue="";
    this. fromDisable=false;
    this.toDisable=false;
    this.getRides();
  }
}

getRides(){
  this.tasksService.getRides()
    .subscribe(tasks => {
      tasks.map(task => {
        this.fromCities.push(task.from.street);
        this.toCities.push(task.to.street);
      });
      this.toCities = Array.from(new Set(this.toCities));
      this.fromCities = Array.from(new Set(this.fromCities));
      this.originalFromCities = JSON.parse(JSON.stringify(this.fromCities));
      this.originalToCities = JSON.parse(JSON.stringify(this.toCities));
      this.tasks= tasks;
      this.showRides=JSON.parse(JSON.stringify(this.tasks));
      this.showRides.map(task => {
       // task.start_time= new Date(task.start_time);
      });
    });
}
  ngOnInit() {
    this.getRides();  }

  constructor(private tasksService:TasksService, public dialog: MatDialog) {
  }
  openDialog(item): void {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     // this.animal = result;
    this.ngOnInit();
    });
  }

  filterStates(source) {
    if (source === 'from') {
      this.fromCities = this.originalFromCities.filter(city => city.toLowerCase().includes(this.formValue.toLowerCase()));
    } else if (source === 'to') {
      this.toCities = this.originalToCities.filter(city => city.toLowerCase().includes(this.toValue.toLowerCase()));
    }
  }
  SearchRides(){
    if(this.formValue==null &&this.toValue==null ){
      this.showRides=JSON.parse(JSON.stringify(this.tasks));
    }
    else if(this.formValue==null){
      this.showRides=this.tasks.filter(RideItem => RideItem.to.street.toLowerCase().includes(this.toValue.toLowerCase()) ||RideItem.to.building.toLowerCase().includes(this.toValue.toLowerCase())  );
    }
    else if(this.toValue==null){
      this.showRides=this.tasks.filter(RideItem => RideItem.from.street.toLowerCase().includes(this.formValue.toLowerCase())||RideItem.from.building.toLowerCase().includes(this.formValue.toLowerCase()) );
    }else{
      this.showRides=this.tasks.filter(RideItem => (RideItem.from.street.toLowerCase().includes(this.formValue.toLowerCase()) ||RideItem.from.building.toLowerCase().includes(this.formValue.toLowerCase())  )&& (RideItem.to.street.toLowerCase().includes(this.toValue.toLowerCase())||RideItem.to.building.toLowerCase().includes(this.toValue.toLowerCase())) );
    }
  }
getUser(){
  this.tasksService.getUsers()
  .subscribe(task => {
    //  this.tasks= task;

      console.log(task);
  });
}



}






