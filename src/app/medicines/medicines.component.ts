import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Medicines } from '../medicines';
import { MedicinesService } from '../medicines.service';

@Component({
  selector: 'app-medicines',
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.css']
})
export class MedicinesComponent implements OnInit {

  constructor(public ms: MedicinesService, public router: Router) { } // DI 
  //below is created to store user details through View
  MedRef = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    price: new FormControl(),
    category: new FormControl(),
    enableFlag: new FormControl(),
    url: new FormControl()
  })

  m1: Array<Medicines> = []; // medicines array
  storeMsg: string = "";
  buttonName: string = "Add Medicine";

  ngOnInit(): void {
    //just to validte BE data is fetching and shown on Console
    // this.ms.loadMedicines(); 
    this.loadMedicines();
  }

  loadMedicines() {
    this.ms.loadMedicines().subscribe(data => this.m1 = data,
      error => console.log(error), () => console.log("done")
    );
  }

  addMedcine() {
    let m2 = this.MedRef.value;
    console.log(m2);  // verify it is considering throuh console or not

    if (this.buttonName == "Add Medicine") {
      this.ms.addMedcine(m2).subscribe(result => this.storeMsg = result,
        error => console.log(error), () => { (this.loadMedicines()) }
      );

    } else {
      //this is for update operation
      this.ms.updMedicine(m2).subscribe(result => this.storeMsg = result,
        error => console.log(error), () => { (this.loadMedicines()) }
      );
      this.buttonName = "Add Medicine";
    }
  }

  //to delete the medicine
  deleteMedicine(id: number) {
    console.log(id);
    this.ms.delMedicine(id).subscribe(restult => console.log(restult),
      error => console.log(error),
      () => { (this.loadMedicines()) }         //console.log("done")
    );

  }

  // to update medicine
  updateMedicine(medicines: any) {
    this.MedRef.get("id")?.setValue(medicines.id);
    this.MedRef.get("name")?.setValue(medicines.name);
    this.MedRef.get("price")?.setValue(medicines.price);
    this.MedRef.get("category")?.setValue(medicines.category);
    this.MedRef.get("enableFlag")?.setValue(medicines.enableFlag);
    this.MedRef.get("url")?.setValue(medicines.url);
    this.buttonName = "Update Medicine";
    console.log(medicines);
  }

}
