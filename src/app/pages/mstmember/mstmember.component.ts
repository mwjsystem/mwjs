import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

export class Addr {
  zip:string;
  region:string;
  local:string;
  street:string;
  extend:string;
  extend2:string;
  adrname:string;
  constructor(init?:Partial<Addr>) {
      Object.assign(this, init);
  }
}

@Component({
  selector: 'app-mstmember',
  templateUrl: './mstmember.component.html',
  styleUrls: ['./../../app.component.scss']
})
export class MstmemberComponent implements OnInit {

  form: FormGroup;

  // get_addr(formname:string): Addr {
  //   return {
  //     zip: this.form.get(formname).get('zip').value,
  //     region: this.form.get(formname).get('region').value,
  //     local: this.form.get(formname).get('local').value,
  //     street: this.form.get(formname).get('street').value,
  //     extend: this.form.get(formname).get('extend').value,
  //     extend2: this.form.get(formname).get('extend2').value,
  //     adrname: this.form.get(formname).get('adrname').value,
  //   };
  // }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({});
  }

  test(){
    console.log(this.form.get('addr0'),this.form.get('addr1'));
  }

}
