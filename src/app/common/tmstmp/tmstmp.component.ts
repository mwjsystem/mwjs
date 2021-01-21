import { Component, OnInit } from '@angular/core';
import { UserService } from './../../common/srvs/user.service';

@Component({
  selector: 'app-tmstmp',
  templateUrl: './tmstmp.component.html',
  styleUrls: ['./tmstmp.component.scss']
})
export class TmstmpComponent implements OnInit {
  constructor(public usrsrv: UserService) { }

  ngOnInit(): void {
  }

}
