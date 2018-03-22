import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { TasksService } from '../tasks.service';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  private title: string = "Start Bootstrap"
  constructor(private tasksService:TasksService) { }

  ngOnInit() {
  }

  putRide(){
    var rideTxt = '{' +
        '"id" : 12345,' +
        '"rider_id" : 101,' +
        '"free_seats" : 3,' +
        '"start_time" : "20/02/2018 17:30:00",' +
        '"from" :{' +
            '"building": "3B",' +
            '"street": "Electronic City",' +
            '"zipcode": "104233"' +
        '},' +
        '"to" : {' +
            '"building": "1007",'+
            '"street": "WhiteField",'+
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
