import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medicines } from './medicines';

import { EmailValidator } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MedicinesService {

  constructor(public http: HttpClient) { }

  /*
  loadMedicines()
  {
    this.http.get("http://localhost:9797/medicine/getAllMedicines").subscribe(data => console.log(data),
      error => console.log(error), () => console.log("completed"));
  }*/


  // bean object
  loadMedicines():Observable<Medicines[]> {
    return  this.http.get<Medicines[]> ("http://localhost:9797/medicine/getAllMedicines");
  }

  //add medicine 
  addMedcine(medicine:any):Observable<string>{
    return this.http.post("http://localhost:9797/medicine/configureMedicine",medicine,{responseType:"text"}); 
  }

  delMedicine(id:number):Observable<string> {
    return  this.http.delete("http://localhost:9797/medicine/deleteMedicine/"+id, {responseType:"text"}); 
  }

  // to update the medicine by invoking back end API
  updMedicine(medicine:any):Observable<string>
  {
    return this.http.put("http://localhost:9797/medicine/updateMedicine/", medicine,{responseType:"text"} )
  } 

}
