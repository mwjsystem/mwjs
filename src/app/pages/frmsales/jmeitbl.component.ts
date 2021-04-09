import { Component, OnInit, Input, ViewChild ,AfterViewChecked, ChangeDetectorRef } from '@angular/core';
// import { AbstractControl, FormGroupDirective, FormGroup, FormBuilder, FormControl, Validators, FormArray, ControlContainer } from '@angular/forms';
import {  FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from './../../common/srvs/user.service';
import { GcdinputDirective } from './../../common/direcs/gcdinput.directive';
import { JyumeiService } from './jyumei.service';
import { Apollo } from 'apollo-angular';
import * as Query from './queries.frms';

@Component({
  selector: 'app-jmeitbl',
  templateUrl: './jmeitbl.component.html',
  styleUrls: ['./jmeitbl.component.scss']
})
export class JmeitblComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(GcdinputDirective, {static: false}) directive;
  dataSource = new MatTableDataSource();
  
  // dataSource = new BehaviorSubject<AbstractControl[]>([]);
  displayedColumns = ['line',
                      'gcode',
                      'gtext',
                      'suu',
                      'teika',
                      'tanka',
                      'money',
                      'taxkbn',
                      'taxmoney',
                      // 'tintanka',
                      // 'touttanka',
                      'tinmoney',
                      // 'toutmoney',
                      'spec',
                      'mbikou',
                      'genka',
                      'souko',
                      'taxrate'];
  
  // form: FormGroup = this.fb.group({ 'jmeitbl': this.rows });
  constructor(private cdRef:ChangeDetectorRef,
              private fb:     FormBuilder,
              private apollo: Apollo,
              public usrsrv: UserService,
              // private parent: FormGroupDirective,
              public jmisrv:  JyumeiService) {
    // this.dataSource= new MatTableDataSource<mwI.Jyumei>(this.jmisrv.jyumei);
   }

  ngOnInit(): void {
    // const form = this.parent.form;
    // form.addControl('jmeicomp', new FormGroup({ }));
    // this.form =  new FormGroup({
    //   jmeitbl: this.fb.array([])
    // });
    this.add_rows(1);
    this.refresh();
    // this.dataSource.paginator = this.paginator;
    // this.jmisrv.subject.subscribe(() => this.refresh());
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  add_rows(rows:number){
    for (let i=0;i<rows;i++){
      this.frmArr.push(this.createRow(i+1));
    }
  }

  updateRow(i:number,jyumei:mwI.Jyumei){
    return this.fb.group({
      line:[{value:i,disabled:true}],
      day:[jyumei.day],
      sday:[jyumei.sday],
      souko:[jyumei.souko],
      gcode:[jyumei.gcode],
      gtext:[jyumei.gtext],
      suu:[jyumei.suu],
      teika:[{value:jyumei.teika,disabled:true}],
      tanka:[jyumei.tanka],
      money:[{value:jyumei.money,disabled:true}],
      taxkbn:[jyumei.taxkbn],
      mbikou:[jyumei.mbikou],
      genka:[jyumei.genka],
      spec:[jyumei.spec],
      tintanka:[jyumei.tintanka],
      touttanka:[jyumei.touttanka],
      taxtanka:[jyumei.taxtanka],
      tinmoney:[{value:jyumei.tinmoney,disabled:true}],
      toutmoney:[jyumei.toutmoney],
      taxmoney:[jyumei.taxmoney],
      taxrate:[jyumei.taxrate]
    })
  }

  createRow(i:number){
    return this.fb.group({
      line:[{value:i,disabled:true}],
      day:[''],
      sday:[''],
      souko:[''],
      gcode:[''],
      gtext:[''],
      suu:[''],
      teika:[{value:'',disabled:true}],
      tanka:[''],
      money:[{value:'',disabled:true}],
      taxkbn:[''],
      mbikou:[''],
      genka:[''],
      spec:[''],
      tintanka:[''],
      touttanka:[''],
      taxtanka:[''],
      tinmoney:[{value:'',disabled:true}],
      toutmoney:[''],
      taxmoney:[''],
      taxrate:['']
    })
  }

  updVal(i: number, fld: string,val: any){
    // this.jmisrv.jyumei[i][property] = value;
    this.frmArr.controls[i].get(fld).setValue(val);
    // console.log(this.frmVal(i,'r_teika'),this.frmVal(i,'genka'));
    // this.refresh();
  }

  updGds(i: number,value: string):void {
    let val:string =this.directive.getValue(value);
    this.apollo.watchQuery<any>({
      query: Query.GetMast9, 
        variables: { 
          id : this.usrsrv.compid,           
          gds: val,
          day: this.parentForm.value.day
        },
      })
      .valueChanges
      .subscribe(({ data }) => {
        let msgds = data.msgoods_by_pk;
        console.log(val,data);
        this.frmArr.controls[i].get('gtext').setValue(msgds.subname);
      },(error) => {
        console.log('error query get_good', error);
      });
  }  

  updateList(i: number, fld: string){
    // this.jmisrv.jyumei[i][property] = value;
    // this.frmArr.at(i)['controls'][fld].setvalue();
    // console.log(this.frmArr.at(i)['controls'][fld]);
    // this.refresh();
  }

  get frmArr():FormArray {    
    return this.parentForm.get('mtbl') as FormArray;
  }  
  
  frmVal(i:number,fld:string):string {
    return this.frmArr.getRawValue()[i][fld];
  }

  refresh(): void {
    //tableのデータソース更新
    this.dataSource.paginator = this.paginator;
    this.dataSource.data =  this.frmArr.controls;
    // this.dataSource= new MatTableDataSource<mwI.Jyumei>(this.jmisrv.jyumei);
    // this.dataSource.next(this.rows.controls);
    // console.log(this.form.get('jmeitbl'));
  }

  set_jyumei(){
    this.frmArr.clear();
    let i:number=0;
    this.jmisrv.jyumei.forEach(e => {
      this.frmArr.push(this.updateRow(i+1,e));
      i+=1;
    });
    // console.log(this.frmArr.getRawValue());
    // console.log(i);
    for(let j=19-i;j<21;j++){
      this.frmArr.push(this.createRow(j));
    }
    this.refresh();
  }

}
