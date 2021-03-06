import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { GoodsService } from './goods.service';
// import { Apollo } from 'apollo-angular';
// import * as Query from './../../common/graph-ql/queries.mst';
// import { UserService } from './../../common/srvs/user.service';

@Component({
  selector: 'app-gdstbl',
  templateUrl: './gdstbl.component.html',
  styleUrls: ['./gdstbl.component.scss']
})
export class GdstblComponent implements OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  dataSource:MatTableDataSource<mwI.Goods>;
  displayedColumns =['gcode','subname','size','color','irisu','iriunit','skbn','jan','weight','tkbn','zkbn','max','send','order','koguchi'];
 
  constructor(public gdssrv:GoodsService
              // public usrsrv: UserService,
              // private apollo: Apollo
              ) {
                this.dataSource= new MatTableDataSource<mwI.Goods>(this.gdssrv.goods);
               }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;    
    this.gdssrv.obserGds.subscribe(() => this.refresh());
  }
  refresh(): void {
    //tableのデータソース更新
    this.dataSource= new MatTableDataSource<mwI.Goods>(this.gdssrv.goods);
    this.dataSource.paginator = this.paginator;
  }
}
