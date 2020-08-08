import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "src/app/user.service";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  user: Object;

  constructor(
    private router: Router,
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.userService.getProfile().subscribe(
      profile => {
        this.user = profile.user;
      },
      err => {
        console.log(err);
        return false;
      }
    );
  }
}
