import { Component, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss'],
})
export class ModalDialogComponent implements OnInit {
  @Input() modalForm!: FormGroup; // Input property to receive the form group from the parent component
  @Input() action!: 'add' | 'edit' | 'delete' | 'view'; // Input property to receive the action type from the parent component
  @Input() designations: string[] = []; // Input property to receive the list of designations from the parent component
  @Input() jobTypes: string[] = []; // Input property to receive the list of job types from the parent component
  @Input() jobModes: string[] = []; // Input property to receive the list of job modes from the parent component
  form!: FormGroup; // Local form group to handle the form in the modal

  get formInstance() {
    return this.form?.controls;
  }

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    this.form = this.modalForm; // Assign the modalForm to the local form group
    this.action !== 'edit' ? this.form.disable() : this.form.enable(); // Disable the form for actions other than 'edit'
  }

  updateUser() {
    this.activeModal.close({ data: this.form, action: this.action }); // Close the modal and emit the form data and action to the parent component
  }

  deleteUser() {
    this.activeModal.close({ data: this.form, action: this.action }); // Close the modal and emit the form data and action to the parent component
  }
}