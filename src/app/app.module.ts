import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SideBarComponent } from "./components/side-bar/side-bar.component";
import { HeaderComponent } from "./components/header/header.component";
import { FridgeItemsComponent } from "./components/fridge-items/fridge-items.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatMenuModule } from "@angular/material/menu";
import { MatSliderModule } from "@angular/material/slider";
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import {
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatTabsModule,
  MatIconModule,
  MatProgressSpinnerModule
} from "@angular/material";
import { LoginComponent } from "./components/login/login.component";
import { RecipeComponent } from "./components/recipe/recipe.component";
import { RecipeDetailComponent } from "./components/recipe-detail/recipe-detail.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { RouterModule, Routes } from "@angular/router";
import { IndexComponent } from "./components/index/index.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { MatCardModule } from "@angular/material/card";
import { MatExpansionModule } from "@angular/material/expansion";
import { StorageService } from "./storage.service";
import { UserService } from "./user.service";
import { RegisterComponent } from "./components/register/register.component";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { AuthGuard } from "./guards/auth.guard";
import { IngredientsService } from "./ingredients.service";
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { SuggestedRecipeComponent } from './components/suggested-recipe/suggested-recipe.component';

const appRoutes: Routes = [
  { path: "detail/:id", component: RecipeDetailComponent },
  { path: "detail/:id/portions/:portions", component: RecipeDetailComponent },
  { path: "home", component: IndexComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
  { path: "", redirectTo: "/home", pathMatch: "full" }
];

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    HeaderComponent,
    FridgeItemsComponent,
    LoginComponent,
    RecipeComponent,
    RecipeDetailComponent,
    IndexComponent,
    ProfileComponent,
    RegisterComponent,
    RecipeListComponent,
    SuggestedRecipeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatSliderModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false, useHash: true } // <-- debugging purposes only
    ),
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatTabsModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],

  entryComponents: [LoginComponent],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
    { provide: MAT_DIALOG_DATA, useValue: [] },
    StorageService,
    UserService,
    AuthGuard,
    IngredientsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
