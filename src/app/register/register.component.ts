import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService } from '../alert.service';
import { TasksService } from '../tasks.service';
import {Observable} from 'rxjs/Observable';

@Component({
    selector : 'register',
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    model: any = {};
    loading = false;

    constructor(
        private tasksService:TasksService,
        private alertService: AlertService,
        private route: ActivatedRoute,
        private router: Router) { }

    register() {
        this.loading = true;
        console.log(this.model.firstName);
        console.log('register');
        var userDetailsTxt = '{' +
        // '"user_id": "getNextSequenceValue("userid")",'+
        '"first_name":"'+this.model.firstName+'",'+
        '"last_name":"'+this.model.lastName+'",'+
        '"login":{'+
        '"login_id":"'+this.model.username+'",'+
        '"password":"'+this.model.password+'"'+
        '}'+
        '}'
        var userDetails = JSON.parse(userDetailsTxt);
        // userDetails.user_id='getNextSequenceValue("userid")';
        console.log(userDetails);
        this.tasksService.getUser(this.model.username).subscribe(user => {
            console.log(Object.keys(user).length);
            if(Object.keys(user).length != 0){
                this.loading = false;
                console.log('username already exists :( enter a unique username!');
            }
            else{               
                this.tasksService.putUser(userDetails).subscribe(
                    data => {
                    console.log('user registered')
                    },
                  error => {
                      console.error("Error registering user!");
                      return Observable.throw(error);
                    }
                  );
                  this.loading = false;
                  this.router.navigate(['login']);
            }
        });

        // this.alertService.success('Registration successful', true);
        // this.userService.create(this.model)
        //     .subscribe(
        //         data => {
        //             this.alertService.success('Registration successful', true);
        //             this.router.navigate(['login']);
        //         },
        //         error => {
        //             this.alertService.error(error);
        //             this.loading = false;
        //         });
    }
}
