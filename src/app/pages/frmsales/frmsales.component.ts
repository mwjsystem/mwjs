import { Component, OnInit, AfterViewInit, ElementRef, ViewEncapsulation, HostListener, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';

import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, ParamMap  } from '@angular/router';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Apollo } from 'apollo-angular';
import * as Query from './queries.frms';
import * as Querym from './../../common/graph-ql/queries.mstm';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../common/srvs/user.service';
import { EdaService } from './../../dialog/adreda/eda.service';
import { McdService } from './../../dialog/mcdhelp/mcd.service';
import { JyumeiService } from './jyumei.service';
import { McdhelpComponent } from './../../dialog/mcdhelp/mcdhelp.component';
import { AdredaComponent } from './../../dialog/adreda/adreda.component';
import { JmeitblComponent } from './jmeitbl.component';

@Component({
  selector: 'app-frmsales',
  templateUrl: './frmsales.component.html',
  styleUrls: ['./frmsales.component.scss']
})
export class FrmsalesComponent implements OnInit, AfterViewInit {
  @ViewChild(JmeitblComponent ) jmeitbl:JmeitblComponent;
  form: FormGroup;
  denno:number|string;
  mode: number=3;
  bunsho: mwI.Bunsho[]=[];
  hokuri: mwI.Hokuri[]=[];
  haisou: mwI.Haisou[]=[];
  hktime: mwI.Hktime[]=[];
  hktval: mwI.Sval[]=[];
  membs:  mwI.Mcode[]=[];
  mcdtxt:string;
  scdtxt:string;
  ncdtxt:string;
  tcds: mwI.Sval[]=[];
  pay:  mwI.Sval[]=[];
  nkin: mwI.Sval[]=[];
  skbn: mwI.Sval[]=[];
  jucd: mwI.Sval[]=[];
  goods: mwI.SalGds[]=[];
  rows: FormArray = this.fb.array([]);

  constructor(private fb: FormBuilder,
              private title: Title,
              private route: ActivatedRoute,
              private elementRef: ElementRef,
              private dialog: MatDialog,
              private mcdsrv: McdService,
              private edasrv: EdaService,
              public usrsrv: UserService,
              public jmisrv:JyumeiService,
              private apollo: Apollo,
              private toastr: ToastrService) {
    this.title.setTitle('受注伝票(MwjSystem)');
   }

  ngOnInit(): void {
    this.form = this.fb.group({
      mcode: new FormControl(''),
      scode: new FormControl(''),
      ncode: new FormControl(''),
      nsaki: new FormControl(''),
      nadr: new FormControl(''),
      day: new FormControl(''),
      yday: new FormControl(''),
      sday: new FormControl(''),
      uday: new FormControl(''),
      nday: new FormControl(''),
      hday: new FormControl(''),
      htime: new FormControl(''),
      hcode: new FormControl(''),
      okurisuu: new FormControl(''),
      okurino: new FormControl(''),
      souko: new FormControl(''),
      tcode: new FormControl(''),
      jcode: new FormControl('', Validators.required),
      pcode: new FormControl('', Validators.required),
      skbn: new FormControl('', Validators.required),
      mtbl: this.rows 
    });

    this.get_members();
    this.get_bunsho();
    this.get_haisou();
    this.get_hokuri();
    this.get_hktime();
    this.get_staff();
    this.get_souko();
    this.get_bunrui(); 
    this.route.paramMap.subscribe((params: ParamMap)=>{
      if (params.get('denno') !== null){
        this.denno = +params.get('denno');
        this.get_jyuden(this.denno);
      }
      if (params.get('mode') === null){
        this.mode = 3;
      }else{
        this.mode = +params.get('mode');
      } 
    }); 
    
  }

  ngAfterViewInit(): void{
    setTimeout(() => {
      this.refresh();
    });
  }

  onEnter(): void {
    this.elementRef.nativeElement.querySelector('button').focus();
  }

  selected(value:number){
    const i:number = this.hokuri.findIndex(obj => obj.code == value);
    if(i > -1 ){
      this.hktval = [];
      for(let j=0;j<this.hktime.length;j++){
        if(this.hktime[j].hscode==this.hokuri[i].hscode){
          let sval:mwI.Sval ={value:this.hktime[j].code,viewval:this.hktime[j].name};
          this.hktval.push(sval);
        }
      } 
    } else {
      this.hktval = [];  
    }
  }

  selBetsu(value:string){
    if(value=="2"){
      this.form.get('nadr').setValue('');
    } else {
      this.form.get('nadr').setValue(+value); 
    }
  }

  test(value){
    this.toastr.info(this.form.value.yday);
  }

  refresh():void {
    if (this.denno > 0){
      this.get_jyuden(this.denno);
    }
    // console.log(this.jmisrv.jyumei);
  }

  get frmArr():FormArray {    
    return this.form.get('mtbl') as FormArray;
  }  

  disable_Jmeitbl() {
    (<FormArray>this.form.get('mtbl'))
      .controls
      .forEach(control => {
        control.disable();
      })

  }
  enable_Jmeitbl() {
    (<FormArray>this.form.get('mtbl'))
      .controls
      .forEach(control => {
        // console.log(control);
        control.enable();
        // Object.keys(control['controls']).forEach(key => {
        //   // console.log(key);
        //   if(key.slice( 0, 2 ) =='r_'){
        //     control.get(key).disable();
        //   }

        // });
      })
  }
  get_jyuden(denno:number|string):void{
    this.denno += '　読込中';
    this.apollo.watchQuery<any>({
      query: Query.GetJyuden, 
        variables: { 
          id : this.usrsrv.compid,
          dno: denno
        },
    })
    .valueChanges
    .subscribe(({ data }) => {
      this.form.reset();
      if (data.trjyuden_by_pk == null){
        this.denno = denno + '　未登録';
        history.replaceState('','','./frmsales');
      } else {
        let jyuden:mwI.Jyuden=data.trjyuden_by_pk;
        // console.log(this.form.value);
        this.form.patchValue(jyuden);
        // console.log(this.form.value);
        if(jyuden.nadr>1){
          this.form.get('nsaki').setValue("2");
        } else { 
          this.form.get('nsaki').setValue(jyuden.nadr.toString());  
        }
        this.jmisrv.jyumei=data.trjyuden_by_pk.trjyumeis;
        // console.log(this.jmisrv.jyumei,data.trjyuden_by_pk);
        // this.jmisrv.subject.next();
        this.jmeitbl.set_jyumei();
        this.usrsrv.setTmstmp(jyuden);
        this.denno=denno;
        this.setMcdtxt();
        this.setScdtxt();
        this.setNcdtxt();

        if(this.mode==3){
          this.form.disable();
          // console.log('refresh disable');
          this.disable_Jmeitbl();
        }else{
          this.form.enable();
          // console.log('refresh enable');
          this.enable_Jmeitbl();
        }
        history.replaceState('','','./frmsales/' + this.mode + '/' + this.denno);
      }
    },(error) => {
      console.log('error query GetJyuden', error);
      this.denno = denno + '　未登録';
      this.form.reset();
      history.replaceState('','','./frmsales');
    });
  }

  get_bunsho():void {
    this.apollo.watchQuery<any>({
      query: Query.GetMast1, 
        variables: { 
          id : this.usrsrv.compid
        },
      })
      .valueChanges
      .subscribe(({ data }) => {
        this.bunsho=data.msbunsho;
      },(error) => {
        console.log('error query get_bunsho', error);
      });
  }
  get_hokuri():void {
    this.apollo.watchQuery<any>({
      query: Query.GetMast2, 
        variables: { 
          id : this.usrsrv.compid
        },
      })
      .valueChanges
      .subscribe(({ data }) => {
        this.hokuri=data.mshokuri;
      },(error) => {
        console.log('error query get_hokuri', error);
      });
  }

  get_haisou():void {
    this.apollo.watchQuery<any>({
      query: Query.GetMast3, 
        variables: { 
          id : this.usrsrv.compid
        },
      })
      .valueChanges
      .subscribe(({ data }) => {
        this.haisou=data.mshaisou;
      },(error) => {
        console.log('error query get_haisou', error);
      });
  } 

  get_hktime():void {
    this.apollo.watchQuery<any>({
      query: Query.GetMast4, 
        variables: { 
          id : this.usrsrv.compid
        },
      })
      .valueChanges
      .subscribe(({ data }) => {
        this.hktime=data.mshktime;
      },(error) => {
        console.log('error query get_hktime', error);
      });
  }  

  get_members():void {
    this.apollo.watchQuery<any>({
      query: Querym.GetMast0, 
        variables: { 
          id : this.usrsrv.compid
        },
      })
      .valueChanges
      .subscribe(({ data }) => {
        this.membs=data.msmember;
        this.setMcdtxt();
        this.setScdtxt();
        this.setNcdtxt();
      },(error) => {
        console.log('error query get_members', error);
      });
  }

  get_staff():void {
    this.apollo.watchQuery<any>({
      query: Querym.GetMast3, 
        variables: { 
          id : this.usrsrv.compid
        },
      })
      .valueChanges
      .subscribe(({ data }) => {
        for (let i=0;i<data.msstaff.length;i++){
            this.tcds.push({value:data.msstaff[i].code,viewval:data.msstaff[i].name});
        }
      },(error) => {
        console.log('error query get_staff', error);
      }); 
  }  
  get_souko():void {
    this.apollo.watchQuery<any>({
      query: Query
      .GetMast7, 
        variables: { 
          id : this.usrsrv.compid
        },
      })
      .valueChanges
      .subscribe(({ data }) => {
        for (let i=0;i<data.mssouko.length;i++){
            this.jmisrv.scds.push({value:data.mssouko[i].code,viewval:data.mssouko[i].subname});
        }
      },(error) => {
        console.log('error query get_staff', error);
      });
  }

  get_bunrui():void {
    this.apollo.watchQuery<any>({
      query: Querym.GetMast2, 
        variables: { 
          id : this.usrsrv.compid
        },
      })
      .valueChanges
      .subscribe(({ data }) => {
        for (let i=0;i<data.msbunrui.length;i++){
          if(data.msbunrui[i].kubun in this){
            let sval:mwI.Sval = {value:data.msbunrui[i].code,viewval:data.msbunrui[i].name};
            this[data.msbunrui[i].kubun].push(sval);
          }else if(data.msbunrui[i].kubun in this.jmisrv){
            let sval:mwI.Sval = {value:data.msbunrui[i].code,viewval:data.msbunrui[i].name};
            this.jmisrv[data.msbunrui[i].kubun].push(sval);
          }
        }
      },(error) => {
        console.log('error query get_bunrui', error);
      });
  }

  get_Goods(day:string):void {
    this.goods=[];
    this.apollo.watchQuery<any>({
      query: Query.GetMast8, 
        variables: { 
          id : this.usrsrv.compid,
          day :day
        },
      })
      .valueChanges
      .subscribe(({ data }) => {
        data.msgoods.forEach(e => {
          const good:mwI.SalGds={
            gcode : e.gcode,
            subname : e.subname,
            irisu : e.irisu,
            iriunit : e.iriunit,
            koguchi : e.koguchi,
            max   : e.max,
            order   : e.order,
            send  : e.send,
            skbn  : e.skbn,
            zkbn  : e.zkbn,
            gkbn  : e.msggroup.gkbn,
            siire : e.msggroup.siire,
            day   : e.msgtankas_aggregate.aggregate.max.day
          };
        this.goods.push(good);
        });
        console.log(this.goods);
        // for (let i=0;i<data.msbunrui.length;i++){
        //   if(data.msbunrui[i].kubun in this){
        //     let sval:mwI.Sval = {value:data.msbunrui[i].code,viewval:data.msbunrui[i].name};
        //     this[data.msbunrui[i].kubun].push(sval);
        //   }       
        // }
      },(error) => {
        console.log('error query get_Goods', error);
      });
  }

  mcdHelp(fldnm:string): void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width  = '100vw';
    dialogConfig.height = '98%';
    dialogConfig.panelClass= 'full-screen-modal';
    let dialogRef = this.dialog.open(McdhelpComponent, dialogConfig);
    
    dialogRef.afterClosed().subscribe(
      data=>{
          if(typeof data != 'undefined'){
            this.form.get(fldnm).setValue(data.mcode);
          }
      }
    );
  }

  dennoHelp(){

  }

  changeMcd(){
    let mcd:number=this.form.value.mcode;
    this.setMcdtxt();
    this.form.get('scode').setValue(mcd);
    this.form.get('ncode').setValue(mcd);
    this.form.get('nadr').setValue(0);
    this.setScdtxt();
    this.setNcdtxt();
  }
  setMcdtxt(){
    let mcd:number=this.form.getRawValue().mcode;
    // console.log(this.form.getRawValue().mcode,this.membs);
    const i:number = this.membs.findIndex(obj => obj.mcode == mcd);
    // console.log(i);
    if(i > -1 ){
      this.mcdtxt = this.membs[i].mei ?? "";
      this.mcdtxt = this.membs[i].sei + this.mcdtxt;
    } else {
      this.mcdtxt="";  
    }
  }  
  setScdtxt(){
    let scd:number=this.form.getRawValue().scode;
    const i:number = this.membs.findIndex(obj => obj.mcode == scd);
    if(i > -1 ){
      // this.scdtxt = this.membs[i].mei ?? "";
      this.scdtxt = this.membs[i].sei + (this.membs[i].mei ?? "");
    } else {
      this.scdtxt="";  
    }
  } 

  setNcdtxt(){
    this.form.get('nadr').setValue(0);
    let ncd:number=this.form.getRawValue().ncode;
    const i:number = this.membs.findIndex(obj => obj.mcode == ncd);
    // console.log(i);
    if(i > -1 ){
      this.ncdtxt = this.membs[i].mei ?? "";
      this.ncdtxt = this.membs[i].sei + this.ncdtxt;
      this.get_member(ncd);
    } else {
      this.ncdtxt="";  
    }
  }

  get_member(mcode:number){
    this.apollo.watchQuery<any>({
      query: Querym.GetMast1, 
        variables: { 
          id : this.usrsrv.compid,
          mcode: mcode
        },
    })
    .valueChanges
    .subscribe(({ data }) => {
      if (data.msmember_by_pk == null){

      } else {
        let member:mwI.Member=data.msmember_by_pk;
        this.edasrv.mcode = mcode ;
        this.edasrv.edas=[];
        this.edasrv.adrs=[];
        for (let j=0;j<member.msmadrs.length;j++){
          if (member.msmadrs[j].eda > 1){
            this.edasrv.adrs.push(member.msmadrs[j]);
            this.edasrv.edas.push({
              eda:member.msmadrs[j].eda,
              zip:member.msmadrs[j].zip,
              region:member.msmadrs[j].region,
              local:member.msmadrs[j].local,
              street:member.msmadrs[j].street,
              extend:member.msmadrs[j].extend,
              extend2:member.msmadrs[j].extend2,
              adrname:member.msmadrs[j].adrname,
              tel:this.mcdsrv.set_tel(member.msmadrs[j].tel,member.msmadrs[j].tel2,member.msmadrs[j].tel3,member.msmadrs[j].fax)
            });
          }
        }
      }
    },(error) => {
      console.log('error query get_msmember', error);
    });
  }

  diaBetsu():void {
    let ncd:number=this.form.value.ncode;
    if( this.checkMcode(ncd) ){
      let dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.data = {
        mcode: ncd +'(' + this.ncdtxt + ')',
        mode: this.mode,
        eda: this.form.value.nadr
      };
      let dialogRef = this.dialog.open(AdredaComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(
        data=>{
            if(typeof data != 'undefined'){
              this.form.get('nadr').setValue(data.eda);
            }
        }
      );
    }
  }

  checkMcode(mcode:number|string):boolean {
    let flg:boolean; 
    let i:number = this.membs.findIndex(obj => obj.mcode == mcode);
    if( i > -1 ){
      flg = true;
    } else {
      // if( mcode.toString().indexOf('未登録') == -1 && mcode.toString().indexOf('読込') == -1 && mcode !== '' ){
      //   this.mcd = mcode + '　未登録';
      // }
      this.form.reset();
      history.replaceState('','','./frmsales'); 
      flg = false;       
    }
    return flg;
  }

  modeToCre():void {
    this.mode=1;
    this.form.reset();
    this.refresh();
    this.denno="新規登録"; 
    this.form.get('day').setValue(new Date());
    this.get_Goods(moment(this.form.value.day).format("YYYY-MM-DD"));
  }

  modeToUpd():void {
    this.mode=2;
    this.refresh();
    history.replaceState('','','./frmsales/' + this.mode + '/' + this.denno);
  }

  cancel():void {
    this.mode=3;
    this.refresh();
    this.form.markAsPristine();
    history.replaceState('','','./frmsales/' + this.mode + '/' + this.denno);
  }

  save():void {
    
  }  
  
  shouldConfirmOnBeforeunload():boolean {
    return this.form.dirty;
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnload(e: Event) {
    if (this.shouldConfirmOnBeforeunload()) {
      e.returnValue = true;
    }
  }

}
