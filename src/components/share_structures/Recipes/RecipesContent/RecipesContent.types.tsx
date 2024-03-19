export default interface RecipesContentInterface {
    id: string;
    name: string;
    cuisine: string;
    photoPath: string;
    ingredients: string[];
    instructions: string[];
    description: string;
}