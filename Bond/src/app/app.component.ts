import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
const { GoogleSpreadsheet } = require('google-spreadsheet');
const  creds  = require('../assets/sheets/credentials.json');
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Bond';
  contactForm: FormGroup;
 //GoogleSpreadsheet = require('google-spreadsheet');
  //creds = require('../assets/sheets/credentials.json');


  constructor(private formBuilder: FormBuilder, private http: HttpClient, ) {
    this.contactForm = new FormGroup({
      BondType: new FormControl(),
      LicenseNumber: new FormControl(),
      BusinessName: new FormControl(),
      BusinessAddress: new FormControl(),
      BusinessCity: new FormControl(),
      BusinessState: new FormControl(),
      BusinessZip: new FormControl(),
      PhoneNumber: new FormControl(),
      EmailAddress: new FormControl(),
      OwnerFirstName: new FormControl(),
      OwnerLastName: new FormControl(),
      OwnerSSN: new FormControl(),
      OwnerAddress: new FormControl(),
      OwnerCity: new FormControl(),
      OwnerState: new FormControl(),
      OwnerZip: new FormControl(),
    });
    }

  

  async onSubmit() {
    const jsonObject = this.contactForm.value;
    console.log('Your form data : ', this.contactForm.value);
    const doc = new GoogleSpreadsheet('1KkdxPOdxxc4qi05LxDdSBR-foHo3q7KDr68oGhUVHpk');
    await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];
  const larryRow = await sheet.addRow(jsonObject);
    
    }

}
