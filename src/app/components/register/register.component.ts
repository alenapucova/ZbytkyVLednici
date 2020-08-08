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
export class RegisterComponent implements OnInit {
  durationInSeconds = 5;
  firstName: String;
  lastName: String;
  email: String;
  password: String;

  users: User[];
  user: User;

  ngOnInit() {
    // this.fetchUsers();
  }
  constructor(
    public dialogRef: MatDialogRef<RegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private router: Router,
    private userService: UserService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  onNoClick(): void {
    //this.dialogRef.close();
  }
  /*
  fetchUsers() {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
      console.log("Data requested ... ");
      console.log(this.users);
    });
  }
  */

  createUser() {
    const user = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    };

    //required fields
    if (!this.userService.validateRegister(user)) {
      this._snackBar.open("Please fill in all fields", "End now", {
        duration: 3000
      });

      return false;
    }
    //validate Email
    if (!this.userService.validateEmail(user.email)) {
      this._snackBar.open("Please fill valid email", "End now", {
        duration: 3000
      });
      return false;
    }

    //register user
    this.userService.registerUser(user).subscribe(data => {
      if (data.success) {
        this._snackBar.open("You are now registered and logged in", "End now", {
          duration: 3000
        });
        this.dialogRef.close();
        this.router.navigate(["/profile"]);
      } else {
        this._snackBar.open("Something went wrong", "End now", {
          duration: 3000
        });
      }
    });
  }
}
