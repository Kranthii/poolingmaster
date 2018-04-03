import { Injectable } from '@angular/core';
// import {Http, Headers} from '@angular/http';
// import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable()
export class TasksService {

  constructor(private http: HttpClient) {
    console.log('Task Service Initialized...');
   }

getUsers(){
    return this.http.get(environment.serviceContext + '/api/users');
}

getUser(userID){
  return this.http.get('http://localhost:3000/api/user/'+userID);
}

getUserEmp(empID){
  return this.http.get('http://localhost:3000/api/useremp/'+empID);
}

putUser(user){
  return this.http.post('http://localhost:3000/api/user', user);
}

updateUser(user){
  return this.http.put('http://localhost:3000/api/userUpdate/'+user.login.login_id, user);
}

getRides(){
  return this.http.get<any[]>(environment.serviceContext + '/api/rides');
}

putRide(ride){
   return this.http.post('http://localhost:3000/api/ride', ride);
}

updateSeatsCount(ride){
  // console.log(ride);
  return this.http.put('http://localhost:3000/api/countUpdate/'+ride.id, ride);
}

}
