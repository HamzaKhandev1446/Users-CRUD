import { Component, OnInit, Input } from '@angular/core';
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
  @Input() usersList!: User[];
  closeResult = '';
  action!: 'add' | 'edit' | 'delete' | 'view';
  userFormGroup!: FormGroup;
  @Input() designations: string[] = [];
  @Input() jobTypes: string[] = [];
  @Input() jobModes: string[] = [];

  constructor(private modalService: NgbModal) {}
  ngOnInit() {
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

  upateData(user: User, operation: 'add' | 'edit' | 'delete' | 'view') {
    this.patchUserForm(user);
    console.log(this.userFormGroup);
    const modalRef = this.modalService.open(ModalDialogComponent, {
      size: 'xl',
    });
    modalRef.componentInstance.modalForm = this.userFormGroup;
    modalRef.componentInstance.action = operation;
    modalRef.componentInstance.designations = this.designations;
    modalRef.componentInstance.jobTypes = this.jobTypes;
    modalRef.componentInstance.jobModes = this.jobModes;
  }

  patchUserForm(user: User) {
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
}
