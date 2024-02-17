interface RecipeInterface {
  id: number;
  name: string;
  cuisine: string;
  photoPath: string;
  ingredients: string[];
  instructions: string[];
  description: string;
}

export default interface RecipesDataInterface {
  recipes: Array<RecipeInterface>;
}