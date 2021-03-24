import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroupDirective, FormGroup, FormControl, Validators, ControlContainer } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { JyumeiService } from '../jyumei.service';

@Component({
  selector: 'app-jmeitblbk',
  templateUrl: './jmeitblbk.component.html',
  styleUrls: ['./jmeitblbk.component.scss']
})
export class JmeitblbkComponent implements OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  dataSource:MatTableDataSource<mwI.Jyumei>;
  displayedColumns =['line','gcode','gtext','suu','teika','tanka','money','taxkbn','mbikou','genka','spec','taxmoney','souko','taxrate'];

  constructor(private parent: FormGroupDirective,
              public jmisrv:JyumeiService) {
    this.dataSource= new MatTableDataSource<mwI.Jyumei>(this.jmisrv.jyumei);
   }

  ngOnInit(): void {
    const form = this.parent.form;
    this.dataSource.paginator = this.paginator;
    this.jmisrv.subject.subscribe(() => this.refresh());
  }

  updateList(i: number, property: string, value:any){
    this.jmisrv.jyumei[i][property] = value;
    this.refresh();
  }

  refresh(): void {
    //tableのデータソース更新
    this.dataSource= new MatTableDataSource<mwI.Jyumei>(this.jmisrv.jyumei);
    this.dataSource.paginator = this.paginator;
  }

}
