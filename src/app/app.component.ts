import { Component, OnInit } from '@angular/core';
import { USERS } from './models/users.model';
import { User } from 'src/types/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Users-CRUD';
  jobModes: string[] = ['Onsite', 'Remote', 'All'];
  jobTypes: string[] = ['Full-time', 'Part-time', 'Contractual'];
  filteredList!: User[];
  selectedFilterType: string = '';
  selectedFilterMode: string = '';

  designations!: string[];

  filteredJobMode: string = '';
  filteredJobType: string = '';

  jobType = 'Job Type';
  jobMode = 'Job Mode';

  usersList: User[] = USERS;

  ngOnInit() {
    // Initialize the filteredList with the usersList
    this.filteredList = this.usersList;

    // Extract the list of all available designations from the usersList
    this.designations = this.extractValidData(this.usersList);
  }

  /**
   * Event handler for filter selection.
   * @param filter The selected filter value
   * @param type The type of filter (jobMode or jobType)
   */
  onFilterSelected(filter: string, type: string) {
    // Update the filteredJobMode or filteredJobType based on the type
    if (type === 'jobMode') {
      this.filteredJobMode === filter
        ? (this.filteredJobMode = this.selectedFilterMode = '')
        : (this.filteredJobMode = this.selectedFilterMode = filter);
    } else {
      this.filteredJobType === filter
        ? (this.filteredJobType = this.selectedFilterType = '')
        : (this.filteredJobType = this.selectedFilterType = filter);
    }

    // Apply filters to the usersList
    this.filteredList = this.usersList
      .filter((user: User) => {
        // Filter by jobMode
        if (this.filteredJobMode === 'All' || this.filteredJobMode === '') {
          return user;
        } else {
          return user.jobMode === this.filteredJobMode;
        }
      })
      .filter((user: User) => {
        // Filter by jobType
        if (this.filteredJobType === '') {
          return user;
        } else {
          return user.jobType === this.filteredJobType;
        }
      });
  }

  /**
   * Update the user in the usersList.
   * @param updatedUser The updated user object
   */
  submitEditUser(updatedUser: User) {
    // Find the index of the user to be updated
    const userId = this.findUserId(this.usersList, updatedUser);

    // Replace the user at the found index with the updated user
    this.usersList.splice(userId, 1, updatedUser);
  }

  /**
   * Delete the user from the usersList.
   * @param deletedUser The user object to be deleted
   */
  submitDeleteUser(deletedUser: User) {
    // Find the index of the user to be deleted
    const userId = this.findUserId(this.usersList, deletedUser);

    // Remove the user from the usersList
    this.usersList.splice(userId, 1);
  }

  /**
   * Extracts the list of all available designations from the given users list.
   * @param usersList The list of users
   * @returns An array containing unique designations
   */
  extractValidData(usersList: User[]): string[] {
    return Array.from(new Set(usersList.map((user) => user.designation)));
  }

  /**
   * Find the index of the user in the given users list.
   * @param users The list of users
   * @param updatedUser The user object to be found
   * @returns The index of the user in the users list
   */
  findUserId(users: User[], updatedUser: User): number {
    return users.findIndex((findUser: User) => {
      return findUser.id === updatedUser.id;
    });
  }
}
