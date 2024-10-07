import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ToolService } from 'src/app/services/tool.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-tool',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.scss'],
})
export class ToolComponent implements OnInit {
  onAddTool = new EventEmitter();
  onEditTool = new EventEmitter();
  toolForm: any = FormGroup;
  dialogAction: any = 'Add';
  action: any = 'Add';
  hide = true;
  responseMessage: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBulider: FormBuilder,
    protected toolService: ToolService,
    public dialogRef: MatDialogRef<ToolComponent>,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.toolForm = this.formBulider.group({
      source: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.nameRegex)],
      ],
      date: [null, Validators.required],
    });
    if (this.dialogData.action === 'Edit') {
      this.dialogAction = 'Edit';
      this.action = 'Update';
      this.toolForm.patchValue(this.dialogData.data);
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
    var formData = this.toolForm.value;
    var data = {
      source: formData.source,
      date: formData.date,
    };
    this.toolService.add(data).subscribe(
      (response: any) => {
        console.log(response);
        this.dialogRef.close();
        this.onAddTool.emit();
        this.responseMessage = GlobalConstants.toolAdded;
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
    var formData = this.toolForm.value;
    var data = {
      id: this.dialogData.data.id,
      source: formData.source,
      date: formData.date,
    };
    this.toolService.update(data, data.id).subscribe(
      (response: any) => {
        this.dialogRef.close();
        this.onEditTool.emit();
        this.responseMessage = response.message;
        this.responseMessage = GlobalConstants.toolUpdated;
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
