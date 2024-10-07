import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { EventService } from 'src/app/services/event.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
  onAddEvent = new EventEmitter();
  onEditEvent = new EventEmitter();
  eventForm: any = FormGroup;
  dialogAction: any = 'Add';
  action: any = 'Add';
  hide = true;
  responseMessage: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBulider: FormBuilder,
    protected eventService: EventService,
    public dialogRef: MatDialogRef<EventComponent>,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.eventForm = this.formBulider.group({
      titre: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.nameRegex)],
      ],
      lieu: [null, [Validators.required]],
      date: [null, Validators.required],
    });
    if (this.dialogData.action === 'Edit') {
      this.dialogAction = 'Edit';
      this.action = 'Update';
      this.eventForm.patchValue(this.dialogData.data);
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
    var formData = this.eventForm.value;
    var data = {
      titre: formData.titre,
      lieu: formData.lieu,
      date: formData.date,
    };
    this.eventService.add(data).subscribe(
      (response: any) => {
        console.log(response);
        this.dialogRef.close();
        this.onAddEvent.emit();
        this.responseMessage = GlobalConstants.evnetAdded;
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
    var formData = this.eventForm.value;
    var data = {
      id: this.dialogData.data.id,
      titre: formData.titre,
      lieu: formData.lieu,
      date: formData.date,
    };
    this.eventService.update(data, data.id).subscribe(
      (response: any) => {
        this.dialogRef.close();
        this.onEditEvent.emit();
        this.responseMessage = response.message;
        this.responseMessage = GlobalConstants.evnetUpdated;
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
