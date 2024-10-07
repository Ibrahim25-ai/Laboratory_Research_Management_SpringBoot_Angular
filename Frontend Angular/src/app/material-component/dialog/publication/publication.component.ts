import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PublicationService } from 'src/app/services/publication.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss'],
})
export class PublicationComponent implements OnInit {
  onAddPublication = new EventEmitter();
  onEditPublication = new EventEmitter();
  onAffectPublication = new EventEmitter();
  onDisaffectPublication = new EventEmitter();
  publicationForm: any = FormGroup;
  dialogAction: any = 'Add';
  action: any = 'Add';
  teachers: any = [];
  teachersOfPub: any = [];
  responseMessage: any;
  add_id: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBulider: FormBuilder,
    protected teacherService: TeacherService,
    protected publicationService: PublicationService,
    public dialogRef: MatDialogRef<PublicationComponent>,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.publicationForm = this.formBulider.group({
      titre: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.nameRegex)],
      ],
      type: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.nameRegex)],
      ],
      date: [null, Validators.required],
      lien: [null, Validators.required],
      sourcepdf: [null, Validators.required],
      members: [null, Validators.required],
    });
    if (this.dialogData.action === 'Edit') {
      this.dialogAction = 'Edit';
      this.action = 'Update';
      this.publicationForm.patchValue(this.dialogData.data);
    } else if (this.dialogData.action === 'Affect') {
      this.dialogAction = 'Affect';
      this.action = 'Add';
      this.publicationForm.patchValue(this.dialogData.data);
    } else if (this.dialogData.action === 'Disaffect') {
      this.dialogAction = 'Disaffect';
      this.action = 'Delete';
      this.publicationForm.patchValue(this.dialogData.data);
      console.log(this.dialogData.data);
    }
    this.getTeachers();
  }

  handleSubmit() {
    if (this.dialogAction === 'Edit') {
      this.edit();
    } else if (this.dialogAction === 'Add') {
      this.add();
    } else if (this.dialogAction === 'Affect') {
      this.affect();
    } else {
      this.disaffect();
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
    var formData = this.publicationForm.value;
    var data = {
      titre: formData.titre,
      type: formData.type,
      date: formData.date,
      lien: formData.lien,
      sourcepdf: formData.sourcepdf,
      members: formData.members,
    };
    this.publicationService.add(data).subscribe(
      (response: any) => {
        console.log(response);
        console.log(response.id);
        this.teacherService
          .affecterauteurTopublication(data.members, response.id)
          .subscribe(
            (response: any) => {
              console.log(response);
              this.dialogRef.close();
              this.onAddPublication.emit();
              this.responseMessage = GlobalConstants.memberAdded;
              this.snackbarService.openSnackBar(
                this.responseMessage,
                'success'
              );
            },
            (error) => {
              this.dialogRef.close();
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
        this.dialogRef.close();
        this.onAddPublication.emit();
        this.responseMessage = GlobalConstants.publicationAdded;
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
        this.snackbarService.openSnackBar(
          this.responseMessage,
          GlobalConstants.error
        );
      }
    );
  }
  edit() {
    var formData = this.publicationForm.value;
    var data = {
      id: this.dialogData.data.id,
      titre: formData.titre,
      type: formData.type,
      date: formData.date,
      lien: formData.lien,
      sourcepdf: formData.sourcepdf,
    };
    this.publicationService.update(data, data.id).subscribe(
      (response: any) => {
        console.log(response);
        this.dialogRef.close();
        this.onEditPublication.emit();
        this.responseMessage = response.message;
        this.responseMessage = GlobalConstants.publicationUpdated;
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
  affect() {
    var formData = this.publicationForm.value;
    var data = {
      id: this.dialogData.data.id,
      members: formData.members,
    };
    this.teacherService
      .affecterauteurTopublication(data.members, data.id)
      .subscribe(
        (response: any) => {
          console.log(response);
          this.dialogRef.close();
          this.onAffectPublication.emit();
          this.responseMessage = GlobalConstants.publicationAffected;
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
          this.snackbarService.openSnackBar(
            this.responseMessage,
            GlobalConstants.error
          );
        }
      );
  }
  disaffect() {
    var formData = this.publicationForm.value;
    var data = {
      id: this.dialogData.data.id,
      members: formData.members,
    };
    this.teacherService
      .desaffecterauteurTopublication(data.members, data.id)
      .subscribe(
        (response: any) => {
          console.log(response);
          this.dialogRef.close();
          this.onDisaffectPublication.emit();
          this.responseMessage = GlobalConstants.publicationDisaffected;
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
          this.snackbarService.openSnackBar(
            this.responseMessage,
            GlobalConstants.error
          );
        }
      );
  }
}
