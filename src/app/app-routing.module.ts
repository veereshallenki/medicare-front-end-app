import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MedicinesComponent } from './medicines/medicines.component';
import { RegisterComponent } from './register/register.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
{path:"signin", component:LoginComponent},
//{path:"userssod",component:UsersComponent},
{path:"userssod", component:UsersComponent, 
children: [
  {
    path:"medicines", component:MedicinesComponent
  }
] 
}, 
{path:"register", component:RegisterComponent},
{path:"medicines", component:MedicinesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // forRoot static function
  exports: [RouterModule]
})
export class AppRoutingModule { }
