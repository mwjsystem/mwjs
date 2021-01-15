import { Component, OnInit, Inject  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { EdaService } from './eda.service';

@Component({
  selector: 'app-adreda',
  templateUrl: './adreda.component.html',
  styleUrls: ['./adreda.component.scss']
})
export class AdredaComponent implements OnInit {
  mcode: String="";
  mode:number=3;
  form: FormGroup;
  eda:number|string;
  constructor(private fb: FormBuilder,
              public edasrv: EdaService,
              private dialogRef: MatDialogRef<AdredaComponent>,
              @Inject(MAT_DIALOG_DATA) data) { 
                this.mcode=data.mcode;
                this.mode =data.mode;
              }

  ngOnInit(): void {
    this.form = this.fb.group({});
    if(this.edasrv.adrs.length>0){
      // console.log(this.edasrv);
      this.eda=this.edasrv.adrs[0].eda;
    } else {
      this.mode=1;
      this.form.reset();
      this.form.enable();
      this.eda="新規登録";
    } 
    this.refresh();  
  }

  close() {
    this.dialogRef.close();
  }

  modeToCre():void {
    this.mode=1;
    this.form.reset();
    this.form.enable();
    this.eda="新規登録";
  }

  modeToUpd():void {
    this.mode=2;
    this.form.enable();
  }

  save():void {





    // this.mode=3;
    this.form.disable();
  } 
  setNext(){
    let i:number = this.edasrv.adrs.findIndex(obj => obj.eda == this.eda);
    if(i > -1 && i < this.edasrv.adrs.length){
      this.eda = this.edasrv.adrs[i+1].eda;
    }
    this.refresh();
  }

  setPrev(){
    let i:number = this.edasrv.adrs.findIndex(obj => obj.eda == this.eda);
    if(i > 0 ){
      this.eda = this.edasrv.adrs[i-1].eda;
    }
    this.refresh();
  }

  refresh():void {
    let i:number = this.edasrv.adrs.findIndex(obj => obj.eda == this.eda);
    if(i > -1 ){
      let adrs:mwI.Adrs=this.edasrv.adrs[i];
      this.form.get('addr0').patchValue(adrs);
    }
  }

  edaHelp(): void {

  }
  contxtMenu(){
    this.edaHelp();
    return false;
  }
  onEnter(): void {
    // this.elementRef.nativeElement.querySelector('button').focus();
    this.refresh();
  }
}
