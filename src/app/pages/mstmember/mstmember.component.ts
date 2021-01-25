import { Component, OnInit, AfterViewInit, ViewEncapsulation, ElementRef, ViewChildren, QueryList, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, ParamMap  } from '@angular/router';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Apollo } from 'apollo-angular';
import * as Query from './../../common/graph-ql/queries.mst';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../common/srvs/user.service';
import { McdService } from './../../dialog/mcdhelp/mcd.service';
import { McdhelpComponent } from './../../dialog/mcdhelp/mcdhelp.component';
import { EdaService } from './../../dialog/adreda/eda.service';
import { AdredaComponent } from './../../dialog/adreda/adreda.component';
import { AddressComponent } from './../../common/address/address.component';
// import { TabService } from './../../common/tabidx/tab.service';

interface Mcode {
  mcode:number;
  sei:string;
  mei:string;
  del:boolean;
} 

@Component({
  selector: 'app-mstmember',
  templateUrl: './mstmember.component.html',
  // providers: [TabService],
  styleUrls: ['./../../app.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class MstmemberComponent implements OnInit, AfterViewInit {
  @ViewChildren( AddressComponent)
    private children: QueryList<AddressComponent>;
  form: FormGroup;
  membs:Mcode[]=[];
  tcds: mwI.Sval[]=[];
  daib: mwI.Sval[]=[];
  bmon: mwI.Sval[]=[];
  mtax: mwI.Sval[]=[];
  tanka:mwI.Sval[]=[];
  sptnk:mwI.Sval[]=[];
  pay:  mwI.Sval[]=[];
  nkin: mwI.Sval[]=[];
  site: mwI.Sval[]=[];
  mcd:  number | string;
  mode: number=3;
  keyword = 'sei';
  flgadr1:number=1; //その他住所フラグ 1：未登録、2：登録済

  constructor(public usrsrv: UserService,
              private fb: FormBuilder,
              private title: Title,
              private route: ActivatedRoute,
              private elementRef: ElementRef,
              private dialog: MatDialog,
              private mcdsrv: McdService,
              private edasrv: EdaService,
              private apollo: Apollo,
              private toastr: ToastrService) {
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
      daibunrui: new FormControl(''),
      bumon: new FormControl(''),
      shobunrui: new FormControl(''),
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
        this.mcd = '読込中です！';
      }else{
        //１件分だけ先に読込
        this.mcd = params.get('mcd');
        this.get_member(+this.mcd);
      }
      if (params.get('mode') === null){
        this.mode = 3;
      }else{
        this.mode = +params.get('mode');
      } 
    });
    this.get_members();
    this.get_bunrui();
    this.get_staff();
  }

  ngAfterViewInit(): void{
    setTimeout(() => {
      this.refresh();
    });
  }

  diaBetsu():void {
    if( this.checkMcode(this.mcd) ){
      let dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.data = {
        mcode: this.mcd +'(' + this.form.get('base').get('sei').value + ')',
        mode: this.mode
      };
      let dialogRef = this.dialog.open(AdredaComponent, dialogConfig);
    }
  }
  mcdHelp(): void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width  = '100vw';
    dialogConfig.height = '98%';
    dialogConfig.panelClass= 'full-screen-modal';
    let dialogRef = this.dialog.open(McdhelpComponent, dialogConfig);
    
    dialogRef.afterClosed().subscribe(
      data=>{
          if(typeof data != 'undefined'){
            this.mcd = data.mcode;
          }
          this.refresh();
      }
    );
  }

  onEnter(): void {
    // 顧客コードでEnter押下時、カーソルを外し、blurイベントを発火
    this.elementRef.nativeElement.querySelector('button').focus();
  }

  setNext(){
    if( this.checkMcode(this.mcd) ){
      let i:number = this.membs.findIndex(obj => obj.mcode == this.mcd);
      if(i > -1 && i < this.membs.length){
        this.mcd = this.membs[i+1].mcode;
      } else {
        this.mcd = this.membs[0].mcode;  
      }
      this.refresh();
    }
  }

  setPrev(){
    if( this.checkMcode(this.mcd) ){
      let i:number = this.membs.findIndex(obj => obj.mcode == this.mcd);
      if(i > 0 ){
        this.mcd = this.membs[i-1].mcode;
      } else {
        this.mcd = this.membs[0].mcode;  
      }
      this.refresh();
    }
  }

  refresh():void {
    if( this.checkMcode(this.mcd) ){
      this.get_member(+this.mcd);
    }
    if(this.mode==3){
      this.form.disable();
    }else{
      this.form.enable();
    }
  }

  checkMcode(mcode:number|string):boolean {
    // console.log(typeof mcode,mcode);
    let flg:boolean; 
    let i:number = this.membs.findIndex(obj => obj.mcode == mcode);
    if( i > -1 ){
      flg = true;
    } else {
      if( mcode.toString().indexOf('未登録') == -1 && mcode.toString().indexOf('読込') == -1 && mcode !== '' ){
        this.mcd = mcode + '　未登録';
      }
      this.form.reset();
      history.replaceState('','','./mstmember'); 
      flg = false;       
    }
    return flg;
  }

  get_member(mcode:number){
    this.mcd += '　読込中';
    this.apollo.watchQuery<any>({
      query: Query.GetMast1, 
        variables: { 
          id : this.usrsrv.compid,
          mcode: mcode
        },
    })
    .valueChanges
    .subscribe(({ data }) => {
      if (data.msmember.length == 0){
        this.mcd = mcode + '　未登録';
        this.form.reset();
        history.replaceState('','','./mstmember');
      } else {
        let member:mwI.Member=data.msmember[0];
        this.form.get('base').patchValue(member);
        this.form.get('kake').patchValue(member);
        this.form.get('mail').patchValue(member);
        this.usrsrv.setTmstmp(member); 
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
        this.form.get('addr0').patchValue(member.msmadrs[0]);
        //その他住所があれば、
        let j:number = member.msmadrs.findIndex(obj => obj.eda == 1);
        if(j > -1 ){
          this.form.get('addr1').patchValue(member.msmadrs[j]);
          this.flgadr1=2;
        }else{
          this.form.get('addr1').reset();
          this.flgadr1=1;
        }
        this.mcd=mcode;
        history.replaceState('','','./mstmember/' + this.mode + '/' + this.mcd);
      }
    },(error) => {
      this.mcd = mcode + '　未登録';
      this.form.reset();
      history.replaceState('','','./mstmember');
    });
  }

  get_members():void {
    if (this.membs.length==0) {
      this.apollo.watchQuery<any>({
        query: Query.GetMast0, 
          variables: { 
            id : this.usrsrv.compid
          },
        })
        .valueChanges
        .subscribe(({ data }) => {
          if(this.mcd=='読込中です！'){
            this.mcd="";
          }
          this.membs=data.msmember;
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
          this[data.msbunrui[i].kubun].push(sval);
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
        },(error) => {
          console.log('error query get_staff', error);
        });
  }  
 
  test(value){
    this.toastr.info('機能作成中');
    console.log(this.mcd,typeof this.mcd);
  }

  modeToCre():void {
    this.mode=1;
    this.form.reset();
    this.form.enable();
    this.mcd="新規登録"; 
  }

  modeToUpd():void {
    if( this.checkMcode(this.mcd) ){
      this.mode=2;
      this.form.enable();
      history.replaceState('','','./mstmember/' + this.mode + '/' + this.mcd);
    }  
  }

  cancel():void {
    if(this.mode==1){
      this.mcd='';
    }
    this.mode=3;
    this.form.disable();
    this.form.markAsPristine();
  }

  save():void {
    let member:any={
      id: this.usrsrv.compid,
      mcode: this.mcd,
      sei: this.usrsrv.editFrmval(this.form.get('base'),'sei'),
      mei: this.usrsrv.editFrmval(this.form.get('base'),'mei'),
      kana: this.usrsrv.editFrmval(this.form.get('base'),'kana'),
      tankakbn: this.usrsrv.editFrmval(this.form.get('base'),'tankakbn'),
      mail: this.usrsrv.editFrmval(this.form.get('mail'),'mail'),
      mail2: this.usrsrv.editFrmval(this.form.get('mail'),'mail2'),
      mail3: this.usrsrv.editFrmval(this.form.get('mail'),'mail3'),
      mail4: this.usrsrv.editFrmval(this.form.get('mail'),'mail4'),
      mail5: this.usrsrv.editFrmval(this.form.get('mail'),'mail5'),
      torikbn: this.usrsrv.editFrmval(this.form.get('kake'),'torikbn'),
      sime: this.usrsrv.editFrmval(this.form.get('kake'),'sime'),
      site: this.usrsrv.editFrmval(this.form.get('kake'),'site'),
      inday: this.usrsrv.editFrmval(this.form.get('kake'),'inday'),
      icode: this.usrsrv.editFrmval(this.form.get('kake'),'icode'),
      bikou: this.usrsrv.editFrmval(this.form.get('base'),'bikou'),
      inbikou: this.usrsrv.editFrmval(this.form.get('base'),'inbikou'),
      pay: this.usrsrv.editFrmval(this.form.get('base'),'pay'),
      okuri: this.usrsrv.editFrmval(this.form.get('base'),'okuri'),
      mtax: this.usrsrv.editFrmval(this.form.get('base'),'mtax'),
      sscode: this.usrsrv.editFrmval(this.form.get('base'),'sscode'),
      daibunrui: this.usrsrv.editFrmval(this.form.get('base'),'daibunrui'),
      bumon: this.usrsrv.editFrmval(this.form.get('base'),'bumon'),
      shobunrui: this.usrsrv.editFrmval(this.form.get('base'),'shobunrui'),
      tcode1: this.usrsrv.editFrmval(this.form.get('base'),'tcode1'),
      tcode2: this.usrsrv.editFrmval(this.form.get('base'),'tcode2'),
      del: this.usrsrv.editFrmval(this.form.get('base'),'del'),
      sptnkbn: this.usrsrv.editFrmval(this.form.get('base'),'sptnkbn'),
      updated_at:new Date(),
      updated_by:this.usrsrv.userInfo.nickname,
      fkana: this.usrsrv.editFkana(this.form.get('base'),'kana'),
    }
    if(this.mode==2){      
      this.apollo.mutate<any>({
        mutation: Query.UpdateMast1,
        variables: {
          id: this.usrsrv.compid,
          mcode: this.mcd,
          "_set": member
        },
      }).subscribe(({ data }) => {
        console.log('update_msmember', data);
        this.children.toArray()[0].saveMadr(this.mcd,0,this.mode);
        if (this.form.get('addr1').get('zip') !== null) {
          this.children.toArray()[1].saveMadr(this.mcd,1,this.flgadr1);
        }
        this.toastr.success('顧客コード' + this.mcd + 'の変更を保存しました');
        this.mode=3;
        this.form.disable();
        this.form.markAsPristine();
      },(error) => {
        this.toastr.error('データベースエラー','顧客コード' + this.mcd + 'の変更保存ができませんでした',
                          {closeButton: true,disableTimeOut: true,tapToDismiss: false});
        console.log('error update_msmember', error);
      });
    }else{
      let membs:any[]=[];
      this.apollo.watchQuery<any>({
        query: Query.GetMast5, 
          variables: { 
            id : this.usrsrv.compid,
            maxmcd : +this.usrsrv.system.maxmcd
          },
        })
        .valueChanges
        .subscribe(({ data }) => {
          this.mcd=data.msmember_aggregate.aggregate.max.mcode + 1;
          member.mcode = this.mcd;
          member.created_at = new Date();
          member.created_by = this.usrsrv.userInfo.nickname;
          membs.push(member);
          this.apollo.mutate<any>({
            mutation: Query.InsertMast1,
            variables: {
              "object": membs
            },
          }).subscribe(({ data }) => {
            console.log('Insert_msmember', data);
            this.children.toArray()[0].saveMadr(this.mcd,0,this.mode);
            if (this.form.get('addr1').get('zip') !== null) {
              this.children.toArray()[1].saveMadr(this.mcd,1,this.flgadr1);
            }
            this.toastr.success('顧客コード' + this.mcd + 'を新規登録しました');
            this.mode=3;
            this.form.disable();
            this.form.markAsPristine();
            history.replaceState('','','./mstmember/' + this.mode + '/' + this.mcd);
          },(error) => {
            this.toastr.error('データベースエラー','顧客コード' + this.mcd + 'の新規登録ができませんでした',
                              {closeButton: true,disableTimeOut: true,tapToDismiss: false});
            console.log('error Insert_msmember', error);
          }); 
        },(error) => {
          this.toastr.error('データベースエラー','顧客コードの新規採番ができませんでした',
                            {closeButton: true,disableTimeOut: true,tapToDismiss: false});
          console.log('error query get_maxmcode', error);
        });          
    }
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
