import { Component, OnInit, Input } from '@angular/core';
import { User } from "../../types/User";

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})

export class UserList implements OnInit {
  @Input() usersList!: User[];

  ngOnInit() {
  }

}
