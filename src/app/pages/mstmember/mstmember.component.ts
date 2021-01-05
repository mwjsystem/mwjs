import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, ParamMap  } from '@angular/router';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Apollo } from 'apollo-angular';
import * as Query from './../../common/graph-ql/queries.mst';
import { UserService } from './../../common/srvs/user.service';
import { McdService } from './../../dialog/mcdhelp/mcd.service';
import { McdhelpComponent } from './../../dialog/mcdhelp/mcdhelp.component';

@Component({
  selector: 'app-mstmember',
  templateUrl: './mstmember.component.html',
  styleUrls: ['./../../app.component.scss']
})
export class MstmemberComponent implements OnInit, AfterViewInit {

  form: FormGroup;
  membs: mwI.Member[]=[];
  mcd:string;
  mode:number=0;
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

  constructor(private fb: FormBuilder,
              private title: Title,
              private route: ActivatedRoute,
              private elementRef: ElementRef,
              private dialog: MatDialog,
              private usrsrv: UserService,
              private mcdsrv: McdService,
              private apollo: Apollo) {
    this.title.setTitle('顧客マスタ(Mwjsystem)');
  }

  ngOnInit(): void {
    this.form = this.fb.group({});
    this.route.paramMap.subscribe((params: ParamMap)=>{
      if (params.get('mcd') === null){
        this.mcd = '';
      }else{
        this.mcd = params.get('mcd');
        this.refresh();
      }
      if (params.get('mode') === null){
        this.mode = 0;
      }else{
        this.mode = +params.get('mode');
        this.refresh();
      } 
    });
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

  }

  mcdHelp(): void {
    let dialogConfig = new MatDialogConfig();
    this.get_members();
    if (this.mcdsrv.mcds.length==0){
      // console.log(this.membs.length);
      for(let i=0;i<this.membs.length;i++){
        // console.log(i,this.membs[i].msmadrs.length);
        for(let j=0;j<this.membs[i].msmadrs.length;j++){
          // console.log(i,j);
          this.mcdsrv.mcds.push({  
            mcode:this.membs[i].mcode,
            sei:this.membs[i].sei,
            mei:this.membs[i].mei,
            kana:this.membs[i].kana,
            mail:this.membs[i].mail,
            mail2:this.membs[i].mail2,
            mail3:this.membs[i].mail3,
            mail4:this.membs[i].mail4,
            mail5:this.membs[i].mail5,
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
            tel:(this.membs[i].msmadrs[j].tel || "").replace(/-/g,""),
            fax:(this.membs[i].msmadrs[j].fax || "").replace(/-/g,""),
            tel2:(this.membs[i].msmadrs[j].tel2 || "").replace(/-/g,""),
            tel3:(this.membs[i].msmadrs[j].tel3 || "").replace(/-/g,"")
          });
        }
      }
    }
    // dialogConfig.disableClose = true;
    // console.log(this.mcdsrv.mcds);
    dialogConfig.autoFocus = true;
    dialogConfig.height = "3000px";
    dialogConfig.width = "4000px";
    dialogConfig.data = {
        filter: this.mcd
    };
    let dialogRef = this.dialog.open(McdhelpComponent, dialogConfig);
    
    dialogRef.afterClosed().subscribe(
      // data=>this.gcode=data);
      data=>{
          // console.log(data);
          if(typeof data != 'undefined'){
            this.mcd = data.mcd;
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
        },(error) => {
          console.log('error query get_members', error);
        });
    }  
  }


  refresh():void {
    this.get_members();
    let i:number = this.membs.findIndex(obj => obj.mcode == this.mcd);
    // console.log(this.membs,i);
    if(i > -1 ){
      let member:mwI.Member=this.membs[i];
      // console.log(member.msmadrs[0]);
      delete member.msmadrs['__typename'];
      // console.log(member.msmadrs[0],this.form.get('addr0'));
      // console.log(this.form.get('addr0'),this.form.get('addr1'));
      this.form.get('addr0').patchValue(member.msmadrs[0]);
      let j:number = member.msmadrs.findIndex(obj => obj.eda == 1);
      if(j > -1 ){
        this.form.get('addr1').patchValue(member.msmadrs[j]);
      }else{
        this.form.get('addr1').reset();
      }
      // console.log(this.form.get('addr0'),this.form.get('addr1'));
      history.replaceState('','','./mstmember/0/' + this.mcd); 
    } 
  }
  
  test(){
    console.log(this.form.get('addr0'),this.form.get('addr1'));
  }


  
}
