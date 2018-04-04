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
    error = false;
    errMsg: string;
    success= false;
    sucMsg: string;

    constructor(
        private tasksService:TasksService,
        private alertService: AlertService,
        private route: ActivatedRoute,
        private router: Router) { }

    register() {
        this.loading = true;
        this.error = false;
        this.success = false;
        var userDetailsTxt = '{' +
        '"user_id":'+this.model.empID+','+
        '"first_name":"'+this.model.firstName+'",'+
        '"last_name":"'+this.model.lastName+'",'+
        '"login":{'+
        '"login_id":"'+this.model.username+'",'+
        '"password":"'+this.model.password+'"'+
        '}'+
        '}'
        var userDetails = JSON.parse(userDetailsTxt);
        this.tasksService.getUser(this.model.username).subscribe(user => {
            // console.log(Object.keys(user).length);
            if(Object.keys(user).length != 0){
                this.loading = false;
                this.error = true;
                this.errMsg = "username already exists :( enter a unique username!";
                console.log('username already exists :( enter a unique username!');
            }
            else{ 
                this.tasksService.getUserEmp(this.model.empID).subscribe(user => {
                    // console.log(Object.keys(user).length);
                    if(Object.keys(user).length != 0){
                        this.loading = false;
                        this.error = true;
                        this.errMsg = "Already registered";
                        console.log('Already registered');
                    }
                    else{          
                    this.tasksService.putUser(userDetails).subscribe(
                    data => {
                    this.success=true;
                    this.sucMsg="User registered!";
                    console.log('user registered');
                    },
                    error => {
                    this.error = true;
                    this.errMsg = "Error registering user!";
                      console.error("Error registering user!");
                      return Observable.throw(error);
                    }
                  );
                  
                  this.loading = false;
                  setTimeout(()=>{    
                    this.router.navigate(['login']);
               },2000);
                  
            }
    });
}
        });
    }
}
