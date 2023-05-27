import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  serachString: string=''
  @Output() serachQuery = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}
  searchUsers() {
    this.serachQuery.emit(this.serachString);
  }
}
