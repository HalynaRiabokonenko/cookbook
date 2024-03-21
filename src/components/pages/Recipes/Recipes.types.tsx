export default interface RecipeInterface {
    id: string;
    name: string;
    cuisine: string;
    src: string;
    ingredients: string[];
    instructions: string[];
    description: string;
    option: string
}