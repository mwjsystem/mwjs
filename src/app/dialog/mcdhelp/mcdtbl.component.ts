import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Mcd, McdService } from './mcd.service';

@Component({
  selector: 'app-mcdtbl',
  templateUrl: './mcdtbl.component.html',
  styleUrls: ['./mcdtbl.component.scss']
})
export class McdtblComponent implements OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @Output() setmcd = new EventEmitter();
  public filters: any = [{id:'mcode',value:''},
                         {id:'sei',value:''},
                         {id:'kana',value:''},
                         {id:'mail',value:''},
                         {id:'tel',value:''}];
  dataSource:MatTableDataSource<Mcd>;
  displayedColumns = ['mcode','sei','kana','tcode1','tcode2','mail','eda','zip','region','local','street','extend','extend2','adrname','tel']; 
  constructor(public mcdsrv:McdService) {
    this.dataSource= new MatTableDataSource<Mcd>(this.mcdsrv.mcds);
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;    
    this.mcdsrv.observe.subscribe();
    this.dataSource.filterPredicate = (data: Mcd, filtersJson: string) => {
      const matchFilter = [];
      const filters = JSON.parse(filtersJson);
      filters.forEach(filter => {
        const val = data[filter.id] === null ? '' : data[filter.id];
        matchFilter.push(val.toLowerCase().includes(filter.value.toLowerCase()));
      });
      return matchFilter.every(Boolean);
    };
    this.updateFilter('mcode',this.mcdsrv.filtx);
  }

  setMcd(row){
    this.mcdsrv.selro = row;
    // console.log("setMcd",this.mcdsrv.selro);
    this.setmcd.emit(this.mcdsrv.selro);
  }

  applyFilter():void {
    this.dataSource.filter = JSON.stringify(this.filters);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  updateFilter(fldid: string, filval: string) :void{
    let i:number = this.filters.findIndex(obj => obj.id == fldid);
    this.filters[i].value = filval;
    this.applyFilter();
  }

  updateData(): void {
    //tableのデータソース更新
    this.dataSource= new MatTableDataSource<Mcd>(this.mcdsrv.mcds);
    this.dataSource.paginator = this.paginator;
  }

}
