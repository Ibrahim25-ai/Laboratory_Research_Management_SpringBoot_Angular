import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'fr-GB' }],
})
export class TeacherComponent implements OnInit {
  onAddTeacher = new EventEmitter();
  onEditCatefory = new EventEmitter();
  teacherForm: any = FormGroup;
  dialogAction: any = 'Add';
  action: any = 'Add';
  hide = true;
  responseMessage: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBulider: FormBuilder,
    protected teacherService: TeacherService,
    public dialogRef: MatDialogRef<TeacherComponent>,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.teacherForm = this.formBulider.group({
      cin: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.numberRegex)],
      ],
      nom: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.nameRegex)],
      ],
      prenom: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.nameRegex)],
      ],
      email: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.emailRegex)],
      ],
      password: [null, [Validators.required, Validators.min(6)]],
      cv: [null, Validators.required],
      date: [null, Validators.required],
      grade: [null, Validators.required],
      etablissement: [null, Validators.required],
    });
    if (this.dialogData.action === 'Edit') {
      this.dialogAction = 'Edit';
      this.action = 'Update';
      this.teacherForm.patchValue(this.dialogData.data);
    }
  }

  handleSubmit() {
    if (this.dialogAction === 'Edit') {
      this.edit();
    } else {
      this.add();
    }
  }
  add() {
    var formData = this.teacherForm.value;
    var data = {
      cin: formData.cin,
      nom: formData.nom,
      prenom: formData.prenom,
      email: formData.email,
      password: formData.password,
      cv: formData.cv,
      date: formData.date,
      grade: formData.grade,
      etablissement: formData.etablissement,
      role: 'ens',
    };
    this.teacherService.add(data).subscribe(
      (response: any) => {
        console.log(response);
        this.dialogRef.close();
        this.onAddTeacher.emit();
        //alert('Successfully Add Teacher');
        this.responseMessage = GlobalConstants.memberAdded;
        this.snackbarService.openSnackBar(this.responseMessage, 'success');
      },
      (error) => {
        this.dialogRef.close();
        console.error(error);
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        //alert(this.responseMessage + ' ' + GlobalConstants.error);
        this.snackbarService.openSnackBar(
          this.responseMessage,
          GlobalConstants.error
        );
      }
    );
  }
  edit() {
    var formData = this.teacherForm.value;
    var data = {
      id: this.dialogData.data.id,
      cin: formData.cin,
      nom: formData.nom,
      prenom: formData.prenom,
      email: formData.email,
      password: formData.password,
      cv: formData.cv,
      date: formData.date,
      grade: formData.grade,
      etablissement: formData.etablissement,
      role: 'ens',
    };
    this.teacherService.update(data, data.id).subscribe(
      (response: any) => {
        this.dialogRef.close();
        this.onEditCatefory.emit();
        this.responseMessage = response.message;
        //alert('Successfully Update Teacher');
        this.responseMessage = GlobalConstants.memberUpdated;
        this.snackbarService.openSnackBar(this.responseMessage, 'success');
      },
      (error) => {
        this.dialogRef.close();
        console.error(error);
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        alert(this.responseMessage + ' ' + GlobalConstants.error);
        this.snackbarService.openSnackBar(
          this.responseMessage,
          GlobalConstants.error
        );
      }
    );
  }
}
