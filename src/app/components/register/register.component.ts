import { Component, Inject, OnInit } from "@angular/core";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog
} from "@angular/material/dialog";
import { UserService } from "../../user.service";
import { User } from "../../user.model";
import { Router } from "@angular/router";
import { DialogData } from "../login/login.component";
import { MatSnackBar } from "@angular/material/snack-bar";

/*export interface DialogData {
  animal: string;
  name: string;
}*/

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent {
  durationInSeconds = 5;
  firstName: String;
  lastName: String;
  email: String;
  password: String;

  users: User[];
  user: User;


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

  createUser() {
    const user = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    };

    //required fields
    if (!this.userService.validateRegister(user)) {
      this._snackBar.open("Vyplňte prosím všechna pole", "Skrýt", {
        duration: 3000
      });

      return false;
    }
    //validate Email
    if (!this.userService.validateEmail(user.email)) {
      this._snackBar.open("Použijte validní email", "Skrýt", {
        duration: 3000
      });
      return false;
    }

    //register user
    this.userService.registerUser(user).subscribe(data => {
      if (data.success) {
        this._snackBar.open("Registrace a přihlášení proběhlo úspěšně", "Skrýt", {
          duration: 3000
        });
        this.dialogRef.close();
        this.router.navigate(["/profile"]);
      } else {
        this._snackBar.open("Něco se pokazilo", "Skrýt", {
          duration: 3000
        });
      }
    });
  }
}
