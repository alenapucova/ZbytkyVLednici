import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { HeaderComponent } from './components/header/header.component';
import { FridgeItemsComponent } from './components/fridge-items/fridge-items.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatSliderModule } from '@angular/material/slider';
import { SideBarRangeComponent } from './components/side-bar-range/side-bar-range.component';
import { SideBarCheckboxComponent } from './components/side-bar-checkbox/side-bar-checkbox.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule, MatFormFieldModule } from '@angular/material';
import { LoginComponent } from './components/login/login.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';


const appRoutes: Routes = [
 
  { path: 'detail/:id', component: RecipeDetailComponent },
  { path: 'home', component: IndexComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    HeaderComponent,
    FridgeItemsComponent,
    SideBarRangeComponent,
    SideBarCheckboxComponent,
    LoginComponent,
    RecipeComponent,
    RecipeDetailComponent,
    IndexComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
      { enableTracing: true } // <-- debugging purposes only
    )
   
   
  ],
  
  entryComponents: [
    LoginComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }