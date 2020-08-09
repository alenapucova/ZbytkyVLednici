import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";

import { Recipe } from "./recipe";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserService {
  uri = "http://localhost:4000";
  authToken: any;
  user: any;

  constructor(public http: HttpClient) {}

  validateRegister(user) {
    if (
      user.firstName == undefined ||
      user.lastName == undefined ||
      user.email == undefined ||
      user.password == undefined
    ) {
      return false;
    } else {
      return true;
    }
  }
  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  registerUser(user): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http.post<any>(`${this.uri}/users/register`, user, httpOptions);
  }
  authenticateUser(user) {
    let httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http.post<any>(
      `${this.uri}/users/authenticate`,
      user,
      httpOptions
    );
  }
  getProfile() {
    this.loadToken();
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.authToken
      })
    };
    return this.http.get<any>(`${this.uri}/users/profile`, httpOptions);
  }
  storeUserData(token, user) {
    localStorage.setItem("id_token", token);
    localStorage.setItem("user", JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
  loadToken() {
    const token = localStorage.getItem("id_token");
    this.authToken = token;
  }
  loggedIn() {
    this.loadToken();
    const helper = new JwtHelperService();
    return !helper.isTokenExpired(this.authToken);
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  setFavouriteRecipe(userID: string, recipeID: string): Observable<any> {
    return this.http.get<any>(
      `${this.uri}/user/${userID}/favouriteRecipes/${recipeID}`
    );
  }

  getFavouriteRecipes(userID: string): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(
      `${this.uri}/user/${userID}/favouriteRecipes`
    );
  }
}
