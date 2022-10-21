import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from '../users';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //below is created to store user details through View
  userRef = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    country: new FormControl()
  })
  buttonName: string = "Add User";
  storeMsg: string = "";

  constructor(public us: UsersService,
    public router: Router) { } //DI for user service  

  ngOnInit(): void {
  }

  addUser() {
    let users = this.userRef.value;
    console.log(users);  // verify it is considering throuh console or not

    if (this.buttonName == "Add User") {

      /* this.us.storeUser(users).subscribe(result => this.storeMsg = result,
         error => console.log(error), () =>  console.log("done")
       );*/
      this.us.storeUser(users).subscribe(
        result => {
          //based on the Bank end response the below will trigger
          if (result.search("added") != -1) {
            this.storeMsg = result;  // this is for SUC case
            //navigate to the sign in page as temporary
            // it has to navigate to search medicines page  
            this.router.navigate(["signin"], { skipLocationChange: true} ); 
          } else {
            this.storeMsg = result; // this if for ERR case
          }
        }, error => console.log(error),
        () => console.log("done")
      );

    } else {

    }

  }

}
