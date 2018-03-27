import { Component, OnInit, Input, Inject } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import { FormControl } from '@angular/forms';
import { TasksService } from '../tasks.service';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './confiramtionPopup.html'
})
export class DialogOverviewExampleDialog {
 IsConfirmed:boolean=true;
 show: boolean = true;


  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
   Confirm(){
 this.IsConfirmed=false;
  }

}


@Component({
  selector: 'app-page-features',
  templateUrl: './page-features.component.html',
  styleUrls: ['./page-features.component.css'],
  providers:[ConfirmationService]
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
    'From Pool',
    'To Pool',
  ];
  fromDisable:boolean=false;
  toDisable:boolean=false;
  SelectedPool: string;
OnRadioChange(){
  if(this.SelectedPool=='From Pool'){
    this.formValue="RMZ";
    this.toValue="";
   this.fromDisable=true;
   this.toDisable=false;
   this.SearchRides();
  }
  if(this.SelectedPool=='To Pool'){
    this.toValue="RMZ";
    this.formValue="";
    this. fromDisable=false;
    this.toDisable=true;
    this.SearchRides();
  }
}
  ngOnInit() {
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
    });
  }

  constructor(private tasksService:TasksService, public dialog: MatDialog,private confirmationService: ConfirmationService) {
  }
  openDialog(): void {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      //data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     // this.animal = result;
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
      this.showRides=this.tasks.filter(RideItem => RideItem.to.street.toLowerCase().includes(this.toValue.toLowerCase()) );
    }
    else if(this.toValue==null){
      this.showRides=this.tasks.filter(RideItem => RideItem.from.street.toLowerCase().includes(this.formValue.toLowerCase()) );
    }else{
      this.showRides=this.tasks.filter(RideItem => RideItem.from.street.toLowerCase().includes(this.formValue.toLowerCase()) && RideItem.to.street.toLowerCase().includes(this.toValue.toLowerCase()) );
    }
  }
getUser(){
  this.tasksService.getUsers()
  .subscribe(task => {
    //  this.tasks= task;

      console.log(task);
  });
}

updateSeatCount(){
  var rideTxt = '{' +
      '"id" : 12345,' +
      '"rider_id" : 101,' +
      '"free_seats" : 3,' +
      '"start_time" : "20/02/2018 17:30:00",' +
      '"from" :{' +
          '"building": "3B",' +
          '"street": "Eco Space",' +
          '"zipcode": "104233"' +
      '},' +
      '"to" : {' +
          '"building": "1007",'+
          '"street": "Morris Park Ave",'+
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
  var ride = JSON.parse(rideTxt);
  // console.log(ride);
  this.tasksService.updateSeatsCount(ride).subscribe(
         data => {
         console.log('ride updated')
         },
       error => {
           console.error("Error saving ride!");
           return Observable.throw(error);
         }
       );
}

}






