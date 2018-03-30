import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// import { AlertService, UserService } from '../_services/index';

@Component({
    selector : 'register',
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    model: any = {};
    loading = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router) { }

    register() {
        this.loading = true;
        console.log('register');
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
