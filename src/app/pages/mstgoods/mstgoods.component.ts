import { Component, OnInit, AfterViewInit, ElementRef, ViewEncapsulation, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, ParamMap  } from '@angular/router';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Apollo } from 'apollo-angular';
import * as Query from './../../common/graph-ql/queries.mstg';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../common/srvs/user.service';
import { GoodsService } from './goods.service';

interface Ggrp {
  code:string;
  name:string;
  kana:string;
} 

@Component({
  selector: 'app-mstgoods',
  templateUrl: './mstgoods.component.html',
  styleUrls: ['./../../app.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class MstgoodsComponent implements OnInit, AfterViewInit {

  form: FormGroup;
  ggrps: Ggrp[]=[];
  grpcd:string;
  mode:number=3;
  
  constructor(private fb: FormBuilder,
              private title: Title,
              private route: ActivatedRoute,
              private elementRef: ElementRef,
              private dialog: MatDialog,
              public usrsrv: UserService,
              private gdssrv: GoodsService,
              private apollo: Apollo,
              private toastr: ToastrService) {
    this.title.setTitle('商品マスタ');
  }

  ngOnInit(): void {
    this.form = this.fb.group({});
    this.form.addControl('base', new FormGroup({
      kana: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      gkbn: new FormControl('', Validators.required),
      bikou: new FormControl(''),
      sozai: new FormControl(''),
      siire: new FormControl(''),
           
    }));
    this.route.paramMap.subscribe((params: ParamMap)=>{
      if (params.get('grpcd') === null){
        this.grpcd = '読込中です！';
      }else{
        //１件分だけ先に読込
        this.grpcd = params.get('grpcd');
        this.get_ggroup(this.grpcd);
      }
      if (params.get('mode') === null){
        this.mode = 3;
      }else{
        this.mode = +params.get('mode');
      } 
    });
    this.get_ggroups();
  }

  ngAfterViewInit(): void{
    setTimeout(() => {
      this.refresh();
    });
  }

  onEnter(): void {
    this.elementRef.nativeElement.querySelector('button').focus();
  }

  grpcdHelp(): void {
    
  }  

  setNext(){
      let i:number = this.ggrps.findIndex(obj => obj.code == this.grpcd);
      if(i > -1 && i < this.ggrps.length){
        this.grpcd = this.ggrps[i+1].code;
      } else {
        this.grpcd = this.ggrps[0].code;  
      }
    this.refresh();
  }

  setPrev(){
    let i:number = this.ggrps.findIndex(obj => obj.code == this.grpcd);
    if(i > 0 ){
      this.grpcd = this.ggrps[i-1].code;
    } else {
      this.grpcd = this.ggrps[0].code;  
    }
    this.refresh();
  }
  get_ggroup(grpcd:string){
    this.grpcd += '　読込中';
    this.apollo.watchQuery<any>({
      query: Query.GetMast1, 
        variables: { 
          id : this.usrsrv.compid,
          grpcd: grpcd
        },
    })
    .valueChanges
    .subscribe(({ data }) => {      
      this.form.reset();
      if (data.msggroup_by_pk == null){
        this.grpcd = grpcd + '　未登録';
        history.replaceState('','','./mstgoods');
      } else {
        let ggroup:mwI.Ggroup=data.msggroup_by_pk;
        this.form.get('base').patchValue(ggroup);
        this.usrsrv.setTmstmp(ggroup);
        this.gdssrv.goods=[];
        this.gdssrv.gtnks=[];
　　　　 for(let i=0;i<ggroup.msgoods.length;i++){
          // console.log('get_ggroup '+i,ggroup.msgoods[i]);
          const {msgtankas,...good}=ggroup.msgoods[i];// ggroup.msgoods[i]からmsgtankasを除外して、goodに代入         
          this.gdssrv.goods.push(good);
          for(let j=0;j<ggroup.msgoods[i].msgtankas.length;j++){         
            this.gdssrv.gtnks.push(Object.assign({gcode:ggroup.msgoods[i].gcode},ggroup.msgoods[i].msgtankas[j]));
          }
          // console.log('get_ggroup',this.gdssrv.goods);
        }
        this.gdssrv.subGds.next();
        this.gdssrv.subTnk.next(); 
      }
      this.grpcd = grpcd;
      history.replaceState('','','./mstgoods/' + this.mode + '/' + this.grpcd);
    },(error) => {
      this.grpcd = grpcd + '　読込エラー';
      this.form.reset();
      history.replaceState('','','./mstgoods');
    }); 
  }  
  get_ggroups():void {
    if (this.ggrps.length == 0) {
      this.apollo.watchQuery<any>({
        query: Query.GetMast0, 
          variables: { 
            id : this.usrsrv.compid
          },
        })
        .valueChanges
        .subscribe(({ data }) => {
            if(this.grpcd=='読込中です！'){
              this.grpcd="";
            }
            this.ggrps=data.msggroup;
        },(error) => {
          console.log('error query get_ggroups', error);
        });
    }  
  }

  refresh():void {
    if( this.checkMcode(this.grpcd) ){
      this.get_ggroup(this.grpcd);
    }
    if(this.mode==3){
      this.form.disable();
    }else{
      this.form.enable();
    }
  }

  checkMcode(grpcd:string):boolean {
    // console.log(typeof mcode,mcode);
    let flg:boolean; 
    let i:number = this.ggrps.findIndex(obj => obj.code == grpcd);
    if( i > -1 ){
      flg = true;
    } else {
      if( grpcd.indexOf('未登録') == -1 && grpcd.indexOf('読込') == -1 && grpcd !== '' ){
        this.grpcd = grpcd + '　未登録';
      }
      this.form.reset();
      history.replaceState('','','./mstgoods'); 
      flg = false;       
    }
    return flg;
  }
  
  test(value){
    this.toastr.info('機能作成中');
  }

  modeToCre():void {
    this.mode=1;
    this.form.reset();
    this.form.enable();
    this.grpcd="新規登録"; 
  }

  modeToUpd():void {
    this.mode=2;
    this.form.enable();
    history.replaceState('','','./mstgoods/' + this.mode + '/' + this.grpcd);
  }

  save():void {
    // let member:any={
    //   id: this.usrsrv.compid,
    //   mcode: this.mcd,
    //   sei: this.usrsrv.editFrmval(this.form.get('base'),'sei'),
    //   mei: this.usrsrv.editFrmval(this.form.get('base'),'mei'),
    //   kana: this.usrsrv.editFrmval(this.form.get('base'),'kana'),
    //   tankakbn: this.usrsrv.editFrmval(this.form.get('base'),'tankakbn'),
    //   mail: this.usrsrv.editFrmval(this.form.get('mail'),'mail'),
    //   mail2: this.usrsrv.editFrmval(this.form.get('mail'),'mail2'),
    //   mail3: this.usrsrv.editFrmval(this.form.get('mail'),'mail3'),
    //   mail4: this.usrsrv.editFrmval(this.form.get('mail'),'mail4'),
    //   mail5: this.usrsrv.editFrmval(this.form.get('mail'),'mail5'),
    //   torikbn: this.usrsrv.editFrmval(this.form.get('kake'),'torikbn'),
    //   sime: this.usrsrv.editFrmval(this.form.get('kake'),'sime'),
    //   site: this.usrsrv.editFrmval(this.form.get('kake'),'site'),
    //   inday: this.usrsrv.editFrmval(this.form.get('kake'),'inday'),
    //   icode: this.usrsrv.editFrmval(this.form.get('kake'),'icode'),
    //   bikou: this.usrsrv.editFrmval(this.form.get('base'),'bikou'),
    //   inbikou: this.usrsrv.editFrmval(this.form.get('base'),'inbikou'),
    //   pay: this.usrsrv.editFrmval(this.form.get('base'),'pay'),
    //   okuri: this.usrsrv.editFrmval(this.form.get('base'),'okuri'),
    //   mtax: this.usrsrv.editFrmval(this.form.get('base'),'mtax'),
    //   sscode: this.usrsrv.editFrmval(this.form.get('base'),'sscode'),
    //   tcode1: this.usrsrv.editFrmval(this.form.get('base'),'tcode1'),
    //   tcode2: this.usrsrv.editFrmval(this.form.get('base'),'tcode2'),
    //   del: this.usrsrv.editFrmval(this.form.get('base'),'del'),
    //   sptnkbn: this.usrsrv.editFrmval(this.form.get('base'),'sptnkbn'),
    //   updated_at:new Date(),
    //   updated_by:this.usrsrv.userInfo.nickname
    // }
    // if(this.mode==2){      
    //   this.apollo.mutate<any>({
    //     mutation: Query.UpdateMast1,
    //     variables: {
    //       id: this.usrsrv.compid,
    //       mcode: this.mcd,
    //       "_set": member
    //     },
    //   }).subscribe(({ data }) => {
    //     console.log('update_msmember', data);
    //     this.children.toArray()[0].saveMadr(this.mcd,0,this.mode);
    //     if (this.form.get('addr1').get('zip') !== null) {
    //       this.children.toArray()[1].saveMadr(this.mcd,1,this.flgadr1);
    //     }
    //     this.toastr.success('顧客コード' + this.mcd + 'の変更を保存しました');
    //     this.mode=3;
    //     this.form.disable();
    //     this.form.markAsPristine();
    //   },(error) => {
    //     this.toastr.error('データベースエラー','顧客コード' + this.mcd + 'の変更保存ができませんでした',
    //                       {closeButton: true,disableTimeOut: true,tapToDismiss: false});
    //     console.log('error update_msmember', error);
    //   });
    // }else{
    //   let membs:any[]=[];
    //   this.apollo.watchQuery<any>({
    //     query: Query.GetMast5, 
    //       variables: { 
    //         id : this.usrsrv.compid,
    //         maxmcd : +this.usrsrv.system.maxmcd
    //       },
    //     })
    //     .valueChanges
    //     .subscribe(({ data }) => {
    //       this.mcd=data.msmember_aggregate.aggregate.max.mcode + 1;
    //       member.mcode = this.mcd;
    //       member.created_at = new Date();
    //       member.created_by = this.usrsrv.userInfo.nickname;
    //       membs.push(member);
    //       this.apollo.mutate<any>({
    //         mutation: Query.InsertMast1,
    //         variables: {
    //           "object": membs
    //         },
    //       }).subscribe(({ data }) => {
    //         console.log('Insert_msmember', data);
    //         this.children.toArray()[0].saveMadr(this.mcd,0,this.mode);
    //         if (this.form.get('addr1').get('zip') !== null) {
    //           this.children.toArray()[1].saveMadr(this.mcd,1,this.flgadr1);
    //         }
    //         this.mode=3;
    //         this.form.disable();
    //         this.form.markAsPristine();
    //         history.replaceState('','','./mstmember/' + this.mode + '/' + this.mcd);
    //       },(error) => {
    //         this.toastr.error('データベースエラー','顧客コード' + this.mcd + 'の新規登録ができませんでした',
    //                           {closeButton: true,disableTimeOut: true,tapToDismiss: false});
    //         console.log('error Insert_msmember', error);
    //       }); 
    //     },(error) => {
    //       this.toastr.error('データベースエラー','顧客コードの新規採番ができませんでした',
    //                         {closeButton: true,disableTimeOut: true,tapToDismiss: false});
    //       console.log('error query get_maxmcode', error);
    //     });          
    // }
  }

  cancel():void {
    this.mode=3;
    this.form.disable();
    this.form.markAsPristine();
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
