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
  jobModes: string[] = ['Onsite', 'Remote', 'All'];
  jobTypes: string[] = ['Full-time', 'Part-time', 'Contractual'];
  filteredList!: User[];

  designations!: string[];

  filteredJobMode: string = '';
  filteredJobType: string = '';

  jobType = 'Job Type';
  jobMode = 'Job Mode';

  usersList: User[] = USERS;

  ngOnInit() {
    this.filteredList = this.usersList;
    this.designations = this.extractValidData(this.usersList);
  }

  onFilterSelected(filter: string, type: string) {
    type === 'jobMode'
      ? (this.filteredJobMode = filter)
      : (this.filteredJobType = filter);
    this.filteredList = this.usersList
      .filter((user: User) => {
        if (this.filteredJobMode === 'All' || this.filteredJobMode === '')
          return user;
        else {
          return user.jobMode === this.filteredJobMode;
        }
      })
      .filter((user: User) => {
        if (this.filteredJobType === '') return user;
        else {
          return user.jobType === this.filteredJobType;
        }
      });
  }

  extractValidData(usersList: User[]) {
    return Array.from(new Set(usersList.map((user) => user.designation)));
  }
}
