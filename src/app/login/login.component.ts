import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import { FormControl } from '@angular/forms';
import { TasksService } from '../tasks.service';
import {Http, Headers} from '@angular/http';

// import { AlertService, AuthenticationService } from '../_services/index';

@Component({
    selector: 'login-nav',
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    userPasswd: string;
    returnUrl: string;
    error = false;
    errMsg: string;

    constructor(
        private tasksService:TasksService,
        private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit() {
        // reset login status
        // this.authenticationService.logout();
      if  (localStorage.getItem('currentUserFN'))  {
        this.router.navigate(['pool']);
      }
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.error = false;
        console.log("Loggin in", this.model.username + ", passs:" + this.model.password);
        this.tasksService.getUser(this.model.username).subscribe(user => {
            console.log(Object.keys(user).length);
            // console.log(user[0].login.password);
            if(Object.keys(user).length != 0){
            this.userPasswd = user[0].login.password;
            if(this.userPasswd == this.model.password){
                console.log('login succcessful');
                localStorage.setItem('currentUserFN', user[0].first_name);
                localStorage.setItem('currentUserLN', user[0].last_name);
                localStorage.setItem('userId',this.model.username);
                localStorage.setItem('imageUrl',user[0].imageUrl);
                localStorage.setItem('empId',user[0].user_id);
                this.router.navigate(['pool']);
            }
            else{
                this.loading = false;
                this.error = true;
                this.errMsg = "Invalid username or password";
                console.log('invalid username or password');
                this.router.navigate(['login']);
            }
        } else{
            this.loading = false;
            this.error = true;
            this.errMsg = "User doesn't exist. Click register for sign up";
            console.log("User doesn't exist. Click register for sign up");
        }
        });

        // console.log(this.userDetails);
        // this.router.navigate('travels');
        // this.Task.login(this.model.username, this.model.password)
        //     .subscribe(
        //         data => {
        //             this.router.navigate([this.returnUrl]);
        //         },
        //         error => {
        //             this.alertService.error(error);
        //             this.loading = false;
        //         });
    }
}
