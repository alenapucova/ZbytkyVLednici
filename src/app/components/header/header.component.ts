import {Component, OnInit} from '@angular/core';
import { LoginComponent } from '../login/login.component';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  user: string;
  name: string;
  constructor(public dialog: MatDialog){
    
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '500px',
      data: {name: this.name, user: this.user}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.user = result;
    });
  }
}

