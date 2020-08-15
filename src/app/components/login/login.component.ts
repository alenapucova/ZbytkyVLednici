import { Component, Inject, OnInit } from "@angular/core";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog
} from "@angular/material/dialog";
import { UserService } from "../../user.service";
import { User } from "../../user.model";
import { Router } from "@angular/router";
import { RegisterComponent } from "../register/register.component";
import { MatSnackBar } from "@angular/material";

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  name2: string;
  name: string;

  email: String;
  password: String;

  ngOnInit() { }
  constructor(
    public dialogRef: MatDialogRef<RegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private router: Router,
    private userService: UserService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  onNoClick(): void {
    //this.dialogRef.close();
  }

  openRegisterDialog(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: "750px",
      height: "500px",
      panelClass: "custom-dialog-container",
      data: { name: this.name, name2: this.name2 }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      //this.user = result;
    });
  }
  loginUser() {
    const user = {
      email: this.email,
      password: this.password
    };
    this.userService.authenticateUser(user).subscribe(data => {
      if (data.success) {
        this.userService.storeUserData(data.token, data.user);
        this._snackBar.open("Přihlášení proběhlo úspěšně", "Skrýt", {
          duration: 3000
        });
        this.router.navigate(["profile"]);
        this.dialogRef.close();
      } else {
        this._snackBar.open("Přihlášení se nezdařilo", "Skrýt", {
          duration: 3000
        });
      }
    });
  }
}
