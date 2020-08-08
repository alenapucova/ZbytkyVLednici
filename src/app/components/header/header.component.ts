import { Component, OnInit } from "@angular/core";
import { LoginComponent } from "../login/login.component";
import { MatDialog } from "@angular/material/dialog";
import { UserService } from "src/app/user.service";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent {
  user: string;
  name: string;
  constructor(
    public dialog: MatDialog,
    public userService: UserService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: "750px",
      height: "450px",
      panelClass: "custom-dialog-container",
      data: { name: this.name, user: this.user }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      this.user = result;
    });
  }
  logoutUser() {
    this.userService.logout();
    this._snackBar.open("You are logged out", "End now", {
      duration: 3000
    });
    this.router.navigate(["/home"]);
    return false;
  }
}
// part 9, 14:17
