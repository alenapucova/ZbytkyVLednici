import { Component, Input } from '@angular/core';
import { SuggestedRecipe } from 'src/app/models/suggestedRecipe.model';

@Component({
  selector: 'app-suggested-recipe',
  templateUrl: './suggested-recipe.component.html',
  styleUrls: ['./suggested-recipe.component.scss']
})
export class SuggestedRecipeComponent {
  @Input() suggestedRecipes: SuggestedRecipe[] = [];
}
