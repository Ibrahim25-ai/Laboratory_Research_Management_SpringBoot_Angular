import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { StudentService } from 'src/app/services/student.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent implements OnInit {
  onAddStudent = new EventEmitter();
  onEditCatefory = new EventEmitter();
  studentForm: any = FormGroup;
  dialogAction: any = 'Add';
  action: any = 'Add';
  teachers: any = [];
  hide = true;
  responseMessage: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBulider: FormBuilder,
    protected studentService: StudentService,
    protected teacherService: TeacherService,
    public dialogRef: MatDialogRef<StudentComponent>,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.studentForm = this.formBulider.group({
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
      dateInscription: [null, Validators.required],
      diplome: [null, Validators.required],
      sujet: [null, Validators.required],
      encadrant: [null, Validators.required],
    });
    if (this.dialogData.action === 'Edit') {
      this.dialogAction = 'Edit';
      this.action = 'Update';
      this.studentForm.patchValue(this.dialogData.data);
    }
    this.getTeachers();
  }

  handleSubmit() {
    if (this.dialogAction === 'Edit') {
      this.edit();
    } else {
      this.add();
    }
  }
  getTeachers() {
    this.teacherService.getTeachers().subscribe(
      (response: any) => {
        console.log(response);
        this.teachers = response;
      },
      (error) => {
        console.error(error);
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(
          this.responseMessage,
          GlobalConstants.error
        );
      }
    );
  }
  add() {
    var formData = this.studentForm.value;
    var data = {
      cin: formData.cin,
      nom: formData.nom,
      prenom: formData.prenom,
      email: formData.email,
      password: formData.password,
      cv: formData.cv,
      date: formData.date,
      dateInscription: formData.dateInscription,
      diplome: formData.diplome,
      sujet: formData.sujet,
      encadrant: formData.encadrant,
      role: 'etd',
    };
    this.studentService.add(data).subscribe(
      (response: any) => {
        console.log(response);
        this.dialogRef.close();
        this.onAddStudent.emit();
        //alert('Successfully Add Student');
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
    var formData = this.studentForm.value;
    var data = {
      id: this.dialogData.data.id,
      cin: formData.cin,
      nom: formData.nom,
      prenom: formData.prenom,
      email: formData.email,
      password: formData.password,
      cv: formData.cv,
      date: formData.date,
      dateInscription: formData.dateInscription,
      diplome: formData.diplome,
      sujet: formData.sujet,
      encadrant: formData.encadrant,
      role: 'etd',
    };
    this.studentService.update(data, data.id).subscribe(
      (response: any) => {
        console.log(response);
        this.dialogRef.close();
        this.onEditCatefory.emit();
        this.responseMessage = response.message;
        //alert('Successfully Update Student');
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
