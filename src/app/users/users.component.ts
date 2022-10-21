import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Users } from '../users';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  //below is created to store user details through View
  userRef = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    country: new FormControl()
  })

  users: Array<Users> = []; // users array declaration  
  u1: Array<Users> = [];
  storeMsg: string = "";
  buttonName: string = "Add User";

  constructor(public us: UsersService) { } //DI for user service  

  // component life cycle method, automatically calls after compoent gets loaded
  //it will call only once after constructor 
  ngOnInit(): void {
    this.loadAllUsers();
  }

  // data gets loaded under usrs array variable
  loadAllUsers() {

      this.us.loadUserData().subscribe(data => this.u1 = data,
      error => console.log(error), () => console.log("done")
    );
  }


  addUser() {
    let users = this.userRef.value;
    console.log(users);  // verify it is considering throuh console or not

    if (this.buttonName == "Add User") {

      this.us.storeUser(users).subscribe(result => this.storeMsg = result,
        error => console.log(error), () => { (this.loadAllUsers()) }
      );

    } else {

      //this is for update operation
      this.us.updUser(users).subscribe(result => this.storeMsg = result,
        error => console.log(error), () => { (this.loadAllUsers()) }
      );

      this.buttonName = "Add user";
    }


    /* moved this code above if blcok 
   this.us.storeUser(users).subscribe( result=>this.storeMsg=result, 
     error=> console.log(error), ()=>  {(this.loadAllUsers())}
     );    
*/

    //console.log(this.storeMsg); // to validate it is coming on console  
    this.userRef.reset;
  }

  deleteUser(id: number) {
    console.log(id);
    this.us.delUser(id).subscribe(restult => console.log(restult),
      error => console.log(error),
      () => { (this.loadAllUsers()) }         //console.log("done")
    );
  }

  updateUser(users: any) {
    this.userRef.get("id")?.setValue(users.id);
    this.userRef.get("name")?.setValue(users.name);
    this.userRef.get("email")?.setValue(users.email);
    this.userRef.get("country")?.setValue(users.country);
    this.buttonName = "Update User";
    console.log(users);

  }

}
