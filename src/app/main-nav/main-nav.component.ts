import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { TasksService } from '../tasks.service';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { Router, ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { CreatePoolComponent } from "../create-pool/create-pool.component";

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
  name: string;
  private title: string = "Start Bootstrap";
  constructor(private tasksService:TasksService,
    private route: ActivatedRoute,
    private router: Router,public dialog: MatDialog
    ) { }

  ngOnInit() {
    // console.log('logged in as '+ localStorage.getItem('currentUser'));
    this.name = localStorage.getItem('currentUserFN');
    console.log(this.name);
  }
  openDialog(): void {
    let dialogRef = this.dialog.open(CreatePoolComponent, {
      width: '500px',
      //data: item
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     // this.animal = result;
    // this.ngOnInit();
    });
  }
  logoff(){
    localStorage.removeItem('currentUserFN');
    localStorage.removeItem('userId');
    this.router.navigate(['login']);
  }


  putRide(){
    var rideTxt = '{' +
        '"id" : 12345,' +
        '"rider_id" : 101,' +
        '"free_seats" : 3,' +
        '"start_time" : "20/02/2018 17:30:00",' +
        '"from" :{' +
            '"building": "3B",' +
            '"street": "RMZ",' +
            '"zipcode": "104233"' +
        '},' +
        '"to" : {' +
            '"building": "1007",'+
            '"street": "RMZ",'+
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
