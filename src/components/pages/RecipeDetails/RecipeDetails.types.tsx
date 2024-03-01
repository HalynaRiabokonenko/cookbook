export default interface RecipeInterface {
  id: string;
  name: string;
  cuisine: string;
  photoPath: string;
  ingredients: string[];
  instructions: string[];
  description: string;
}