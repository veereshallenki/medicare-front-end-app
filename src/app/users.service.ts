import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from './users';
import { EmailValidator } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(public http: HttpClient) { } //DI for HttpClient help to invoke rest API

  // the below shows on the console.log and not on the browser 
 /*
  loadUserData() {
    this.http.get("http://localhost:9797/user/findAllUsers").subscribe(data => console.log(data),
      error => console.log(error), () => console.log("completed"));
  }
  */

 // bean object
  loadUserData():Observable<Users[]> {
    return  this.http.get<Users[]> ("http://localhost:9797/user/findAllUsers");
  }

  //store user 
  //post method takes 2 parameters 1st one url and 2nd parameter object in json format
  // by default retun is jSON data type, assume resective API is not providing the data type is json
  // third parameter is optional can be used 
  storeUser(user:any):Observable<string>{
    return this.http.post("http://localhost:9797/user/storeUsers",user,{responseType:"text"}); 
  }

  delUser(id:number):Observable<string> {
    return  this.http.delete("http://localhost:9797/user/deleteUser/"+id, {responseType:"text"}); 
  }

  updUser(user:any):Observable<string>
  {
    return this.http.put("http://localhost:9797/user/updateUser/", user,{responseType:"text"} )
  } 

  //validate the user
  checkUser(email:string, pwd:string)
  {
   //?email=vvallenki@gmail.com&pwd=admin
    return this.http.get("http://localhost:9797/user/signin?email="+email +"&pwd=" +pwd, {responseType:"text"} )
  }

}
