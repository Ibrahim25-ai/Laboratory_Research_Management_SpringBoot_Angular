import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PublicationService } from 'src/app/services/publication.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { PublicationComponent } from '../dialog/publication/publication.component';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-manage-publication',
  templateUrl: './manage-publication.component.html',
  styleUrls: ['./manage-publication.component.scss'],
})
export class ManagePublicationComponent implements OnInit {
  displayedColumns: string[] = [
    'titre',
    'type',
    'date',
    'lien',
    'sourcepdf',
    'members',
  ];

  dataSource: any;
  length1: any;
  responseMessage: any;
  userRole: any;
  token: any = localStorage.getItem('token');
  tokenPayload: any;

  constructor(
    private publicationService: PublicationService,
    private dialog: MatDialog,
    private SnackbarService: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tableData();
    this.tokenPayload = jwtDecode(this.token);
    this.userRole = this.tokenPayload?.role;
    if (this.userRole === 'admin' || this.userRole === 'ens') {
      this.displayedColumns.push('edit');
    }
  }
  tableData() {
    this.publicationService.getPublications().subscribe(
      (response: any) => {
        //console.log(response);
        for (let i = 0; i < response.length; i++) {
          for (let j = i + 1; j < response.length; j++) {
            if (response[i].titre === response[j].titre) {
              console.log(response[i]);
              response[i].members.push(response[j].members[0]);
              response.splice(j, 1);
              j--;
            }
          }
        }
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
    const dialogRef = this.dialog.open(PublicationComponent, dialogConfog);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onAddPublication.subscribe(
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
    const dialogRef = this.dialog.open(PublicationComponent, dialogConfog);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onEditPublication.subscribe(
      (response) => {
        this.tableData();
      }
    );
  }
  handleAffectAction(values: any) {
    const dialogConfog = new MatDialogConfig();
    dialogConfog.data = {
      action: 'Affect',
      data: values,
    };
    dialogConfog.width = '850px';
    const dialogRef = this.dialog.open(PublicationComponent, dialogConfog);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onAffectPublication.subscribe(
      (response) => {
        this.tableData();
      }
    );
  }
  handleDeleteAction(values: any) {
    const dialogConfog = new MatDialogConfig();
    dialogConfog.data = {
      message: 'delete ' + values.name + ' publication ',
      confirmation: true,
    };
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfog);
    const sub = dialogRef.componentInstance.onEmistStatusChange.subscribe(
      (response) => {
        console.log(values.id);
        this.deletePublication(values.id);
        dialogRef.close();
      }
    );
  }
  deletePublication(id: any) {
    this.publicationService.deletemempub(id).subscribe(
      (response: any) => {
        this.tableData();
        this.responseMessage = response?.message;
        this.responseMessage = GlobalConstants.publicationDeleteded;
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
    this.publicationService.delete(id).subscribe(
      (response: any) => {
        this.tableData();
        this.responseMessage = response?.message;
        this.responseMessage = GlobalConstants.publicationDeleteded;
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
  handleDisaffectAction(values: any) {
    const dialogConfog = new MatDialogConfig();
    dialogConfog.data = {
      action: 'Disaffect',
      data: values,
    };
    dialogConfog.width = '850px';
    const dialogRef = this.dialog.open(PublicationComponent, dialogConfog);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onDisaffectPublication.subscribe(
      (response) => {
        this.tableData();
      }
    );
  }
}
