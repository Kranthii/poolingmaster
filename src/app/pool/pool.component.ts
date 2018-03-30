import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'pool',
  moduleId: module.id,
  //template:`<h1> Kranthi Kumar Reddy</h1>`,
  templateUrl: 'pool.component.html',
  // styles: [`h1{ font-weight: bold; color:blue; }`],
  // styleUrls: ['./app.component.css'],
})

export class PoolComponent {
 // private title: string = 'Start Bootstrap';
 returnUrl: string;
 constructor(
  private route: ActivatedRoute,
  private router: Router) { }

//  ngOnInit() {
//   // reset login status
//   // this.authenticationService.logout();

//   // get return url from route parameters or default to '/'
//   this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
// }


}
