import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Bond';
  contactForm: FormGroup;
  GoogleSpreadsheet = require('google-spreadsheet');
  creds = require('../../assets/sheet-api/credentials.json');


  constructor(private formBuilder: FormBuilder, private http: HttpClient, ) {
    this.contactForm = new FormGroup({
    fullName: new FormControl(),
    email: new FormControl(),
    message: new FormControl()
    });
    }

  

  onSubmit() {
    const jsonObject = this.contactForm.value;
    console.log('Your form data : ', this.contactForm.value);
    const doc = new this.GoogleSpreadsheet('1KkdxPOdxxc4qi05LxDdSBR-foHo3q7KDr68oGhUVHpk');
    doc.useServiceAccountAuth(this.creds, function(err:any) {
    doc.addRow(1, jsonObject, function (err:any) {
    if (err) {
    console.log(err);
    }
    });
    });
    }

}
