import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Ingredient } from "./models/ingredient.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class IngredientsService {
  uri = "http://localhost:4000";

  constructor(private http: HttpClient) {}

  getIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(`${this.uri}/ingredients`);
  }
}
