import { Component, OnInit, Input } from '@angular/core';
import { FormGroupDirective, FormGroup, FormControl, Validators, ControlContainer } from '@angular/forms';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ]
})
export class AddressComponent implements OnInit {
  @Input() formName: string;
  constructor(private parent: FormGroupDirective) { }

  ngOnInit(): void {
    const form = this.parent.form;
    form.addControl(this.formName, new FormGroup({
      zip: new FormControl('', Validators.required),
      region: new FormControl('', Validators.required),
      local: new FormControl('', Validators.required),
      street: new FormControl(''),
      extend: new FormControl(''),
      extend2: new FormControl(''),
      adrname: new FormControl('', Validators.required),
      tel: new FormControl('', Validators.required),
      fax: new FormControl(''),
      tel2: new FormControl(''),
    }))
   
  }
  test() {


  }
}
