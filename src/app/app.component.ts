import { Component } from '@angular/core';
import { USERS } from './models/users.model';
import { User } from 'src/types/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Users-CRUD';
  statuses: string[] = ['All', 'Active', 'Completed'];
  categories: string[] = ['Development', 'Workplace', 'Hardware'];
  filteredList!: User[];

  filteredStatus: string = '';
  filteredCategories: string = '';

  status = 'status';
  category = 'category';

  usersList: User[] = USERS

  ngOnInit() {
    this.filteredList = this.usersList;
  }

  onFilterSelected(filter: string, type: string) {
    // type === 'status'
    //   ? (this.filteredStatus = filter)
    //   : (this.filteredCategories = filter);

    // this.filteredList = this.surveyList
    //   .filter((survey: User) => {
    //     if (this.filteredStatus === 'All' || this.filteredStatus === '')
    //       return survey;
    //     else {
    //       return survey.status === this.filteredStatus;
    //     }
    //   })
    //   .filter((survey: User) => {
    //     if (this.filteredCategories === '') return survey;
    //     else {
    //       return survey.category === this.filteredCategories;
    //     }
    //   });
  }
}
