import { Component, OnInit, AfterViewInit, ElementRef, ViewEncapsulation, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, ParamMap  } from '@angular/router';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Apollo } from 'apollo-angular';
import * as Query from './../../common/graph-ql/queries.mst';
import { UserService } from './../../common/srvs/user.service';
import { McdService } from './../../dialog/mcdhelp/mcd.service';
import { McdhelpComponent } from './../../dialog/mcdhelp/mcdhelp.component';
import { EdaService } from './../../dialog/adreda/eda.service';
import { AdredaComponent } from './../../dialog/adreda/adreda.component';

@Component({
  selector: 'app-mstmember',
  templateUrl: './mstmember.component.html',
  styleUrls: ['./../../app.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class MstmemberComponent implements OnInit, AfterViewInit {

  form: FormGroup;
  membs: mwI.Member[]=[];
  tcds: mwI.Sval[]=[];
  daib: mwI.Sval[]=[];
  bmon: mwI.Sval[]=[];
  mtax: mwI.Sval[]=[];
  tanka:mwI.Sval[]=[];
  sptnk:mwI.Sval[]=[];
  pay:  mwI.Sval[]=[];
  nkin: mwI.Sval[]=[];
  site: mwI.Sval[]=[];
  mcd:string;
  mode:number=3;

  constructor(private fb: FormBuilder,
              private title: Title,
              private route: ActivatedRoute,
              private elementRef: ElementRef,
              private dialog: MatDialog,
              private usrsrv: UserService,
              private mcdsrv: McdService,
              private edasrv: EdaService,
              private apollo: Apollo) {
    this.title.setTitle('顧客マスタ(MwjSystem)');
  }

  ngOnInit(): void {
    this.form = this.fb.group({});
    this.form.addControl('base', new FormGroup({
      sei: new FormControl('', Validators.required),
      mei: new FormControl(''),
      kana: new FormControl('', Validators.required),
      tankakbn: new FormControl('', Validators.required),
      pay: new FormControl(''),
      okuri: new FormControl(''),
      mtax: new FormControl('', Validators.required),
      daib: new FormControl(''),
      bmon: new FormControl(''),
      tcode1: new FormControl('', Validators.required),
      tcode2: new FormControl('', Validators.required),
      del: new FormControl(''),
      sptnkbn: new FormControl(''),
      bikou: new FormControl(''),
      inbikou: new FormControl(''),      
    }));
    this.form.addControl('kake', new FormGroup({
      torikbn: new FormControl(''),
      sime: new FormControl(''),
      site: new FormControl(''),
      inday: new FormControl(''),
      icode: new FormControl(''),  
      sscode: new FormControl('', Validators.required),    
    }));
    this.form.addControl('mail', new FormGroup({
      mail: new FormControl(''),
      mail2: new FormControl(''),
      mail3: new FormControl(''),
      mail4: new FormControl(''),
      mail5: new FormControl(''), 
    }));
    this.route.paramMap.subscribe((params: ParamMap)=>{
      if (params.get('mcd') === null){
        this.mcd = '';
      }else{
        this.mcd = params.get('mcd');
      }
      if (params.get('mode') === null){
        this.mode = 3;
      }else{
        this.mode = +params.get('mode');
      } 
    });
    this.get_bunrui();
    this.get_staff();
    this.refresh();
  }

  ngAfterViewInit(): void{
    this.get_members();

  }

  contxtMenu(){
    this.mcdHelp();
    return false;
  }

  onEnter(): void {
    this.elementRef.nativeElement.querySelector('button').focus();
    this.refresh();
  }

  diaBetsu():void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      mcode: this.mcd,
      mode: this.mode
    };
    let dialogRef = this.dialog.open(AdredaComponent, dialogConfig);

  }
  mcdHelp(): void {
    let dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // dialogConfig.height = "3000px";
    // dialogConfig.width = "900vw";
    dialogConfig.data = {
        filter: this.mcd
    };
    let dialogRef = this.dialog.open(McdhelpComponent, dialogConfig);
    
    dialogRef.afterClosed().subscribe(
      // data=>this.gcode=data);
      data=>{
          // console.log(data);
          if(typeof data != 'undefined'){
            this.mcd = data.mcode;
          }
          this.refresh();
      }
    );
  }

  setNext(){
    let i:number = this.membs.findIndex(obj => obj.mcode == this.mcd);
    if(i > -1 && i < this.membs.length){
      this.mcd = this.membs[i+1].mcode;
    }
    this.refresh();
  }

  setPrev(){
    let i:number = this.membs.findIndex(obj => obj.mcode == this.mcd);
    if(i > 0 ){
      this.mcd = this.membs[i-1].mcode;
    }
    this.refresh();
  }

  get_members():void {
    if (this.membs.length == 0) {
      this.apollo.watchQuery<any>({
        query: Query.GetMast1, 
          variables: { 
            id : this.usrsrv.compid
          },
        })
        .valueChanges
        .subscribe(({ data }) => {
          this.membs = data.msmember;
          delete this.membs['__typename'];
          // console.log(data.msmember,this.membs);
          if (this.mcdsrv.mcds.length==0){
            for(let i=0;i<this.membs.length;i++){
              for(let j=0;j<this.membs[i].msmadrs.length;j++){
                this.mcdsrv.mcds.push({  
                  mcode:this.membs[i].mcode,
                  sei:this.membs[i].sei,
                  mei:this.membs[i].mei,
                  kana:this.membs[i].kana,
                  mail:this.mcdsrv.set_mail(this.membs[i].mail ,this.membs[i].mail2,this.membs[i].mail3,this.membs[i].mail4,this.membs[i].mail5),
                  tcode1:this.membs[i].tcode1,
                  tcode2:this.membs[i].tcode2,
                  eda:this.membs[i].msmadrs[j].eda,
                  zip:this.membs[i].msmadrs[j].zip,
                  region:this.membs[i].msmadrs[j].region,
                  local:this.membs[i].msmadrs[j].local,
                  street:this.membs[i].msmadrs[j].street,
                  extend:this.membs[i].msmadrs[j].extend,
                  extend2:this.membs[i].msmadrs[j].extend2,
                  adrname:this.membs[i].msmadrs[j].adrname,
                  tel:this.mcdsrv.set_tel(this.membs[i].msmadrs[j].tel,this.membs[i].msmadrs[j].tel2,this.membs[i].msmadrs[j].tel3,this.membs[i].msmadrs[j].fax)
                });
              }
            }
          } 
        },(error) => {
          console.log('error query get_members', error);
        });
    }  
  }

  get_bunrui():void {
    this.apollo.watchQuery<any>({
      query: Query.GetMast2, 
        variables: { 
          id : this.usrsrv.compid
        },
      })
      .valueChanges
      .subscribe(({ data }) => {
        for (let i=0;i<data.msbunrui.length;i++){
          let sval:mwI.Sval = {value:data.msbunrui[i].code,viewval:data.msbunrui[i].name};
          // console.log(this.svals[data.msbunrui[i].kubun],data.msbunrui[i].kubun);
          this[data.msbunrui[i].kubun].push(sval);
          // switch (data.msbunrui[i].kubun) {
          //   case 'daib':
          //     this.daib.push(sval);
          //     break;
          // }
        }
        
      },(error) => {
        console.log('error query get_bunrui', error);
      });
  }

  get_staff():void {
      this.apollo.watchQuery<any>({
        query: Query.GetMast3, 
          variables: { 
            id : this.usrsrv.compid
          },
        })
        .valueChanges
        .subscribe(({ data }) => {
          for (let i=0;i<data.msstaff.length;i++){
              this.tcds.push({value:data.msstaff[i].code,viewval:data.msstaff[i].name});
          }
          // console.log(data.msmember,this.membs);
          
        },(error) => {
          console.log('error query get_staff', error);
        });
  }  

  refresh():void {
    this.get_members();
    let i:number = this.membs.findIndex(obj => obj.mcode == this.mcd);
    // console.log(this.membs,i);
    if(i > -1 ){
      let member:mwI.Member=this.membs[i];
      this.form.get('base').patchValue(member);
      delete member.msmadrs['__typename'];
      this.edasrv.adrs=[];
      for (let j=0;j<member.msmadrs.length;j++){
        if (member.msmadrs[j].eda > 1){
          this.edasrv.adrs.push(member.msmadrs[j]);
        }
      }
      
      this.form.get('addr0').patchValue(member.msmadrs[0]);
      let j:number = member.msmadrs.findIndex(obj => obj.eda == 1);
      if(j > -1 ){
        this.form.get('addr1').patchValue(member.msmadrs[j]);
      }else{
        this.form.get('addr1').reset();
      }
      history.replaceState('','','./mstmember/' + this.mode + '/' + this.mcd); 
    }
    if(this.mode==3){
      this.form.disable();
    }else{
      this.form.enable();
    } 
  }
  
  test(value){
    this.mode=value;
    // console.log(this.mode);
    this.form.disable();
    // console.log(this['tcds'],this.form.get('base').get('tcode1'));
  }

  modeToCre():void {
    this.mode=1;
    this.form.reset();
    this.form.enable();
    this.mcd="新規登録";
    history.replaceState('','','./mstmember/' + this.mode + '/' + this.mcd); 
  }

  modeToUpd():void {
    this.mode=2;
    this.form.enable();
    history.replaceState('','','./mstmember/' + this.mode + '/' + this.mcd);
  }

  save():void {





    this.mode=3;
    this.form.disable();
  }

  shouldConfirmOnBeforeunload():boolean {
    return this.form.dirty || this.form.touched;
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnload(e: Event) {
    if (this.shouldConfirmOnBeforeunload()) {
      e.returnValue = true;
    }
  }  

}
