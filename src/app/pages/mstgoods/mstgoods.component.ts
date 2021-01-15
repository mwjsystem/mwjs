import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-mstgoods',
  templateUrl: './mstgoods.component.html',
  styleUrls: ['./mstgoods.component.scss']
})
export class MstgoodsComponent implements OnInit {

  constructor(private title: Title) {
    this.title.setTitle('商品マスタ(MwjSystem)');
  }

  ngOnInit(): void {
  }

}
