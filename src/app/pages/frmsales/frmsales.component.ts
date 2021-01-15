import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-frmsales',
  templateUrl: './frmsales.component.html',
  styleUrls: ['./frmsales.component.scss']
})
export class FrmsalesComponent implements OnInit {

  constructor(private title: Title) {
    this.title.setTitle('受注伝票(MwjSystem)');
   }

  ngOnInit(): void {
  }

}
