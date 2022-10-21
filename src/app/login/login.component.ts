import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  msg: String = "";
  //it provide method to navigate with Programatically
  constructor(public router: Router,
    public us: UsersService) { } //DI for router and user service

  emailid: string = "";
  usname:  string=""; 

  ngOnInit(): void {

    let obj = sessionStorage.getItem("user"); //sessio.getAttribute servlet

    if (obj != null) {
      this.emailid = obj;
    }
  }

  checkUser(loginRef: NgForm) {
    let login = loginRef.value;
    

    /* below is with out DB 
    if (login.emailid == "raj@gmail.com" && login.password == "123") {
      this.msg = "successfully login";
      sessionStorage.setItem("user", login.emailid); //similar to servler session.setattribute
      this.router.navigate(["dashboard"], { skipLocationChange: true }); // [skipLocaionChange]= true wwont show the url in address bar
    } else {
      this.msg = "Failure try once again";
    }  */

    this.us.checkUser(login.emailid, login.password).subscribe(
      result => {
        if (result == "Sign-in success!!") {
          this.msg = "Login Succuess";
          sessionStorage.setItem("usname", login.emailid); 

          //only Admin have rights to add users, delete and update users 
          if (login.emailid == "admin@medicare.com") {
            this.router.navigate(["userssod"], { skipLocationChange: true });
            //this.router.navigate(["medicines"], { skipLocationChange: true });
          } else {
            //next step is naviagate to searh medicines
            // add to card etc it should happen
          }

        } else if (result="e-mail not registered and please sign up")  {
          //navigate to the page for registration
          this.router.navigate(["register"], { skipLocationChange: true });

          
        }
        
        
        else {
          this.msg = result; // "Failure try once again";
        }
      }, error => console.log(error),
      () => console.log("done")
    )

    /* below code used to get the detail from DB
    this.ls.checkUser(login).subscribe(result=> {
       
       if(result=="success"){
        this.msg = "successfully login";
        this.router.navigate(["dashboard"],{skipLocationChange:true});
    }else {
        this.msg = "Failure try once again";
    }
    },error=>console.log(error),()=>console.log("completed"))
    */
  }

  logout() {
    sessionStorage.removeItem("usname");
    this.router.navigate(["signin"]);
  }


}
