import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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
 emailPattern:any = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(private formBuilder: FormBuilder, private http: HttpClient,private toastr: ToastrService ) {
    
    this.contactForm = new FormGroup({
      BondType: new FormControl(null,[Validators.required]),
      LicenseNumber: new FormControl(null,[Validators.required]),
      BusinessName: new FormControl(null,[Validators.required]),
      BusinessAddress: new FormControl(null,[Validators.required]),
      BusinessCity: new FormControl(null,[Validators.required]),
      BusinessState: new FormControl(null,[Validators.required]),
      BusinessZip: new FormControl(null,[Validators.required]),
      PhoneNumber: new FormControl(null,[Validators.required]),
      EmailAddress: new FormControl(null,[Validators.required]),
      OwnerFirstName: new FormControl(null,[Validators.required]),
      OwnerLastName: new FormControl(null,[Validators.required]),
      OwnerSSN: new FormControl(null,[Validators.required]),
      OwnerAddress: new FormControl(null,[Validators.required]),
      OwnerCity: new FormControl(null,[Validators.required]),
      OwnerState: new FormControl(null,[Validators.required]),
      OwnerZip: new FormControl(null,[Validators.required]),
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
    ];
    
    this.http.get<any>('https://raw.githubusercontent.com/millbj92/US-Zip-Codes-JSON/master/USCities.json').subscribe(data => {
        this.zip = data;
    });    
    
    // this.toastr.warning('Toastr fun!',"",{positionClass:"toast-bottom-right"});

    }

    onlyNumberKey(event:any) {
        var number = event.target.value;
        var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      this.toastr.warning('only numbers are allowed',"",{positionClass:"toast-bottom-right"});
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
        else{
            this.toastr.warning('Zip code not found, try a different one',"",{positionClass:"toast-bottom-right"});
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
        else{
            this.toastr.warning('Zip code not found, try a different one',"",{positionClass:"toast-bottom-right"});
        }
    }

  async onSubmit() {
    console.log("DATA:",this.contactForm)
    if(!this.contactForm.valid){
        // if(this.contactForm.controls["BondType"].status === "INVALID"){
        //     var haveErrors = this.contactForm.controls["BondType"].errors;
        //     if(haveErrors && this.contactForm.controls["BondType"].errors){
        //         this.toastr.error('All fields are required',"",{positionClass:"toast-bottom-right"}); 
        //     }
        // return;
        // }
        // this.toastr.error('All fields are required',"",{positionClass:"toast-bottom-right"}); 
        // return;
    }
    const jsonObject = this.contactForm.value;
    // console.log('Your form data : ', this.contactForm.value);
    if(!jsonObject.BondType){
        this.toastr.error('Bond Type is required',"",{positionClass:"toast-bottom-right"}); 
        return;
    }
    if(!jsonObject.LicenseNumber){
        this.toastr.error('License Number is required',"",{positionClass:"toast-bottom-right"});
        return;
    }
    if(!jsonObject.BusinessName){
        this.toastr.error(' Business Name is required',"",{positionClass:"toast-bottom-right"});
        return;
    }
    if(!jsonObject.BusinessAddress){
        this.toastr.error(' Business Address is required',"",{positionClass:"toast-bottom-right"});
        return;
    }
    if(!jsonObject.BusinessZip){
        this.toastr.error(' Business Zip is required',"",{positionClass:"toast-bottom-right"});
        return;
    }
    if(!jsonObject.BusinessCity){
        this.toastr.error(' Business City is required',"",{positionClass:"toast-bottom-right"});
        return;
    }
    if(!jsonObject.BusinessState){
        this.toastr.error(' Business State is required',"",{positionClass:"toast-bottom-right"});
        return;
    }
    if(!jsonObject.PhoneNumber){
        this.toastr.error('Phone Number is required',"",{positionClass:"toast-bottom-right"});
        return;
    }
    if(!jsonObject.EmailAddress){
        this.toastr.error(' Email Address is required',"",{positionClass:"toast-bottom-right"});
        return;
    }
    // if(jsonObject.EmailAddress){
    //  if(!this.emailPattern.test(jsonObject.EmailAddress)) 
    //  {
    //     this.toastr.error(' Email Address is not a valid email',"",{positionClass:"toast-bottom-right"});
    //     return;
    //  }  
    // }
    // if(!jsonObject.OwnerFirstName){
    //     this.toastr.error(' Owner First Name is required',"",{positionClass:"toast-bottom-right"});
    //     return;
    // }
    // if(!jsonObject.OwnerLastName){
    //     this.toastr.error(' Owner Last Name is required',"",{positionClass:"toast-bottom-right"});
    //     return;
    // }
    // if(!jsonObject.OwnerSSN){
    //     this.toastr.error(' Owner SSN is required',"",{positionClass:"toast-bottom-right"});
    //     return;
    // }
    // if(!jsonObject.OwnerAddress){
    //     this.toastr.error(' Owner Address is required',"",{positionClass:"toast-bottom-right"});
    //     return;
    // }

    const doc = new GoogleSpreadsheet('1KkdxPOdxxc4qi05LxDdSBR-foHo3q7KDr68oGhUVHpk');
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const larryRow = await sheet.addRow(jsonObject);
    this.contactForm.reset();
    }

}
