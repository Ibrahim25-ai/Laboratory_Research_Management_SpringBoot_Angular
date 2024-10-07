import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    // this.userService.checkToken().subscribe(
    //   (response: any) => {
    //     this.router.navigate(['/laboratory/dashboard']);
    //   },
    //   (error: any) => {
    //     console.log(error);
    //   }
    // );
  }

  handleLoginAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    this.dialog.open(LoginComponent, dialogConfig);
  }
  handleDashboardAction() {
    //this.dialog.open(LoginComponent, dialogConfig);
    this.router.navigate(['/laboratory/dashboard']);
  }
}
