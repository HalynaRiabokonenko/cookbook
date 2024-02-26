interface RecipeInterface {

}

export default interface RecipesDataInterface {
    id: number;
    name: string;
    cuisine: string;
    photoPath: string;
    ingredients: string[];
    instructions: string[];
    description: string;
}