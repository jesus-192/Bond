import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
const { GoogleSpreadsheet } = require('google-spreadsheet');
const  creds  = require('../assets/sheets/credentials.json');
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Bond';
  contactForm: FormGroup;
  states:any[]=[];
 zip:any[]=[];

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
      OwnerZip: new FormControl(null,[Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    });
    }

    ngOnInit(): void {
      this.states =[
        {
            name: "Alabama",
            abbreviation: "AL"
        },
        {
            name: "Alaska",
            abbreviation: "AK"
        },
        {
            name: "American Samoa",
            abbreviation: "AS"
        },
        {
            name: "Arizona",
            abbreviation: "AZ"
        },
        {
            name: "Arkansas",
            abbreviation: "AR"
        },
        {
            name: "California",
            abbreviation: "CA"
        },
        {
            name: "Colorado",
            abbreviation: "CO"
        },
        {
            name: "Connecticut",
            abbreviation: "CT"
        },
        {
            name: "Delaware",
            abbreviation: "DE"
        },
        {
            name: "District Of Columbia",
            abbreviation: "DC"
        },
        {
            name: "Federated States Of Micronesia",
            abbreviation: "FM"
        },
        {
            name: "Florida",
            abbreviation: "FL"
        },
        {
            name: "Georgia",
            abbreviation: "GA"
        },
        {
            name: "Guam",
            abbreviation: "GU"
        },
        {
            name: "Hawaii",
            abbreviation: "HI"
        },
        {
            name: "Idaho",
            abbreviation: "ID"
        },
        {
            name: "Illinois",
            abbreviation: "IL"
        },
        {
            name: "Indiana",
            abbreviation: "IN"
        },
        {
            name: "Iowa",
            abbreviation: "IA"
        },
        {
            name: "Kansas",
            abbreviation: "KS"
        },
        {
            name: "Kentucky",
            abbreviation: "KY"
        },
        {
            name: "Louisiana",
            abbreviation: "LA"
        },
        {
            name: "Maine",
            abbreviation: "ME"
        },
        {
            name: "Marshall Islands",
            abbreviation: "MH"
        },
        {
            name: "Maryland",
            abbreviation: "MD"
        },
        {
            name: "Massachusetts",
            abbreviation: "MA"
        },
        {
            name: "Michigan",
            abbreviation: "MI"
        },
        {
            name: "Minnesota",
            abbreviation: "MN"
        },
        {
            name: "Mississippi",
            abbreviation: "MS"
        },
        {
            name: "Missouri",
            abbreviation: "MO"
        },
        {
            name: "Montana",
            abbreviation: "MT"
        },
        {
            name: "Nebraska",
            abbreviation: "NE"
        },
        {
            name: "Nevada",
            abbreviation: "NV"
        },
        {
            name: "New Hampshire",
            abbreviation: "NH"
        },
        {
            name: "New Jersey",
            abbreviation: "NJ"
        },
        {
            name: "New Mexico",
            abbreviation: "NM"
        },
        {
            name: "New York",
            abbreviation: "NY"
        },
        {
            name: "North Carolina",
            abbreviation: "NC"
        },
        {
            name: "North Dakota",
            abbreviation: "ND"
        },
        {
            name: "Northern Mariana Islands",
            abbreviation: "MP"
        },
        {
            name: "Ohio",
            abbreviation: "OH"
        },
        {
            name: "Oklahoma",
            abbreviation: "OK"
        },
        {
            name: "Oregon",
            abbreviation: "OR"
        },
        {
            name: "Palau",
            abbreviation: "PW"
        },
        {
            name: "Pennsylvania",
            abbreviation: "PA"
        },
        {
            name: "Puerto Rico",
            abbreviation: "PR"
        },
        {
            name: "Rhode Island",
            abbreviation: "RI"
        },
        {
            name: "South Carolina",
            abbreviation: "SC"
        },
        {
            name: "South Dakota",
            abbreviation: "SD"
        },
        {
            name: "Tennessee",
            abbreviation: "TN"
        },
        {
            name: "Texas",
            abbreviation: "TX"
        },
        {
            name: "Utah",
            abbreviation: "UT"
        },
        {
            name: "Vermont",
            abbreviation: "VT"
        },
        {
            name: "Virgin Islands",
            abbreviation: "VI"
        },
        {
            name: "Virginia",
            abbreviation: "VA"
        },
        {
            name: "Washington",
            abbreviation: "WA"
        },
        {
            name: "West Virginia",
            abbreviation: "WV"
        },
        {
            name: "Wisconsin",
            abbreviation: "WI"
        },
        {
            name: "Wyoming",
            abbreviation: "WY"
        }
    ]
    
    this.http.get<any>('https://raw.githubusercontent.com/millbj92/US-Zip-Codes-JSON/master/USCities.json').subscribe(data => {
        this.zip = data;
    })    

    }

    onlyNumberKey(event:any) {
        var number = event.target.value;
        var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
    }

    GetStateAndCity(zip:any){
        var value = Number.parseInt(zip.target.value);
        var item = this.zip.filter(x => x.zip_code === value)
        if(item.length > 0){
            this.contactForm.patchValue({
                OwnerCity : item[0].city,
                OwnerState:item[0].state
        });
        }
    }

    GetBusinessStateAndCity(zip:any){
        var value = Number.parseInt(zip.target.value);
        var item = this.zip.filter(x => x.zip_code === value)
        if(item.length > 0){
            this.contactForm.patchValue({
                BusinessCity : item[0].city,
                BusinessState:item[0].state
        });
        }
    }

  async onSubmit() {
    const jsonObject = this.contactForm.value;
    // console.log('Your form data : ', this.contactForm.value);
    const doc = new GoogleSpreadsheet('1KkdxPOdxxc4qi05LxDdSBR-foHo3q7KDr68oGhUVHpk');
    await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];
  const larryRow = await sheet.addRow(jsonObject);
    this.contactForm.reset();
    }

}
