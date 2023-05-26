import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss'],
})

export class ModalDialogComponent implements OnInit {
  @Input() modalForm!: FormGroup;
  @Input() action!: 'add'|'edit' | 'delete' | 'view';
  @Input() designations: string[] = [];
  @Input() jobTypes: string[] = [];
  @Input() jobModes: string[] = [];
  form!: FormGroup;


  get formInstance() {
    return this.form?.controls;
  }

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    this.form = this.modalForm;
    this.action !== 'edit' ? this.form.disable() : this.form.enable();
    this.designations = this.removeCurrentEntry(
      this.designations,
      this.formInstance.designation.value
    );

    this.jobTypes = this.removeCurrentEntry(
      this.jobTypes,
      this.formInstance.jobType.value
    );

    this.jobModes = this.removeCurrentEntry(
      this.jobModes,
      this.formInstance.jobMode.value
    );
  }

  removeCurrentEntry(array: string[], currentValue: string) {
    return array.filter((value: string) => {
      return currentValue !== value;
    });

  }
}
