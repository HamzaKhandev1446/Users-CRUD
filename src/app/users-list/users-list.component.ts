import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../types/User';
import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UserList implements OnInit {
  @Input() usersList!: User[]; // Input property to receive the list of users from the parent component
  closeResult = '';
  action!: 'add' | 'edit' | 'delete' | 'view';
  userFormGroup!: FormGroup; // Form group to handle the user form

  @Input() designations: string[] = []; // Input property to receive the list of designations from the parent component
  @Input() jobTypes: string[] = []; // Input property to receive the list of job types from the parent component
  @Input() jobModes: string[] = []; // Input property to receive the list of job modes from the parent component

  @Output() submitAddUser = new EventEmitter<User>(); // Output property to emit the add user data to the parent component
  @Output() submitEditUser = new EventEmitter<User>(); // Output property to emit the edited user data to the parent component
  @Output() submitDeleteUser = new EventEmitter<User>(); // Output property to emit the deleted user data to the parent component

  constructor(private modalService: NgbModal) {}

  ngOnInit() {
    // Initialize the user form group with form controls and validators
    this.userFormGroup = new FormGroup({
      id: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      address: new FormGroup({
        street: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required]),
        state: new FormControl('', [Validators.required]),
        zip: new FormControl('', [Validators.required]),
      }),
      designation: new FormControl('', [Validators.required]),
      managerId: new FormControl('', [Validators.required]),
      jobType: new FormControl('', [Validators.required]),
      jobMode: new FormControl('', [Validators.required]),
    });
  }

  updateData(user: User, operation: 'edit' | 'delete' | 'view') {
    // Patch the user form with the data of the selected user
    this.patchUserForm(user);

    // Open the modal dialog for user interaction
    const modalRef = this.modalService.open(ModalDialogComponent, {
      size: 'xl',
    });

    // Pass necessary data to the modal dialog component
    modalRef.componentInstance.modalForm = this.userFormGroup;
    modalRef.componentInstance.action = operation;
    modalRef.componentInstance.designations = this.designations;
    modalRef.componentInstance.jobTypes = this.jobTypes;
    modalRef.componentInstance.jobModes = this.jobModes;

    // Subscribe to the closed event of the modal dialog
    modalRef.closed.subscribe((res: any) => {
      switch (res?.action) {
        case 'edit':
          // Emit the edited user data to the parent component
          this.editUser(res?.data);
          break;
        case 'delete':
          // Emit the deleted user data to the parent component
          this.deleteUser(res?.data);
          break;

        default:
          return;
      }
    });
  }

  patchUserForm(user: User) {
    // Patch the user form group with the data of the selected user
    this.userFormGroup.patchValue({
      id: user.id,
      name: user.name,
      email: user.email,
      age: user.age,
      address: {
        street: user.address.street,
        state: user.address.state,
        city: user.address.city,
        zip: user.address.zip,
      },
      designation: user.designation,
      managerId: user.managerId,
      jobType: user.jobType,
      jobMode: user.jobMode,
    });
  }

  editUser(form: FormGroup) {
    // Extract the user data from the form and emit it to the parent component for editing
    this.submitEditUser.emit(this.extractUserData(form));
  }

  deleteUser(form: FormGroup) {
    // Extract the user data from the form and emit it to the parent component for deletion
    this.submitDeleteUser.emit(this.extractUserData(form));
  }

  extractUserData(form: FormGroup): User {
    // Extract the form data and create a new User object
    const user: User = {
      id: form.controls.id.value,
      name: form.controls.name.value,
      email: form.controls.email.value,
      age: form.controls.age.value,
      designation: form.controls.designation.value,
      managerId: form.controls.managerId.value,
      address: {
        street: form.controls.address.value.street,
        city: form.controls.address.value.city,
        state: form.controls.address.value.state,
        zip: form.controls.address.value.zip,
      },
      jobType: form.controls.jobType.value,
      jobMode: form.controls.jobMode.value,
    };

    return user;
  }

  addNewUser(operation: string) {
    // Open the modal dialog for user interaction
    const modalRef = this.modalService.open(ModalDialogComponent, {
      size: 'xl',
    });

    // Pass necessary data to the modal dialog component
    modalRef.componentInstance.modalForm = this.userFormGroup;
    modalRef.componentInstance.action = operation;
    modalRef.componentInstance.designations = this.designations;
    modalRef.componentInstance.jobTypes = this.jobTypes;
    modalRef.componentInstance.jobModes = this.jobModes;

    // Subscribe to the closed event of the modal dialog
    modalRef.closed.subscribe((res: any) => {
      this.submitAddUser.emit(this.extractUserData(res?.data));
    });
  }
}
