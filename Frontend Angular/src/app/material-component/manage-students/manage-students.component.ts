import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { StudentService } from 'src/app/services/student.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { StudentComponent } from '../dialog/student/student.component';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-manage-students',
  templateUrl: './manage-students.component.html',
  styleUrls: ['./manage-students.component.scss'],
})
export class ManageStudentsComponent implements OnInit {
  displayedColumns: string[] = [
    'cin',
    'prenom',
    'nom',
    'email',
    'date',
    'cv',
    'dateInscription',
    'diplome',
    'sujet',
    'encadrant',
  ];

  dataSource: any;
  length1: any;
  responseMessage: any;
  userRole: any;
  token: any = localStorage.getItem('token');
  tokenPayload: any;

  constructor(
    private studentService: StudentService,
    private dialog: MatDialog,
    private SnackbarService: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tableData();
    this.tokenPayload = jwtDecode(this.token);
    this.userRole = this.tokenPayload?.role;
    if (this.userRole === 'admin') {
      this.displayedColumns.push('edit');
    }
  }
  tableData() {
    this.studentService.getStudents().subscribe(
      (response: any) => {
        console.log(response);
        this.dataSource = new MatTableDataSource(response);
      },
      (error: any) => {
        console.log(error.error?.message);
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.SnackbarService.openSnackBar(
          this.responseMessage,
          GlobalConstants.error
        );
      }
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  handleAddAction() {
    const dialogConfog = new MatDialogConfig();
    dialogConfog.data = {
      action: 'Add',
    };
    dialogConfog.width = '850px';
    const dialogRef = this.dialog.open(StudentComponent, dialogConfog);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onAddStudent.subscribe(
      (response) => {
        this.tableData();
      }
    );
  }
  handleEditAction(values: any) {
    const dialogConfog = new MatDialogConfig();
    dialogConfog.data = {
      action: 'Edit',
      data: values,
    };
    dialogConfog.width = '850px';
    const dialogRef = this.dialog.open(StudentComponent, dialogConfog);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onEditCatefory.subscribe(
      (response) => {
        this.tableData();
      }
    );
  }
  handleDeleteAction(values: any) {
    const dialogConfog = new MatDialogConfig();
    dialogConfog.data = {
      message: 'delete ' + values.name + ' student ',
      confirmation: true,
    };
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfog);
    const sub = dialogRef.componentInstance.onEmistStatusChange.subscribe(
      (response) => {
        console.log(values.id);
        this.deleteStudent(values.id);
        dialogRef.close();
      }
    );
  }
  deleteStudent(id: any) {
    this.studentService.delete(id).subscribe(
      (response: any) => {
        this.tableData();
        this.responseMessage = response?.message;
        //alert("Student is Deleted");
        this.responseMessage = GlobalConstants.memberDeleteded;
        this.SnackbarService.openSnackBar(this.responseMessage, 'success');
      },
      (error: any) => {
        console.log(error.error?.message);
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.SnackbarService.openSnackBar(
          this.responseMessage,
          GlobalConstants.error
        );
      }
    );
  }
}
