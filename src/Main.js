import React from "react";

function Main() {
  const recipes = [
    {
      id: 1,
      title: "Curd Pudding",
      ingredients: [
        "Cottage cheese (finely grated) - 1 kg",
        "Eggs - 3-4 pcs. (depending on size)",
        "Sugar - 100-150 g (depending on how you like it sweet, I put 110)",
        "Flour (or semolina) - 6-7 tbsp.",
        "Raisins - 1/2 cup",
        "Salt - a pinch",
        "Vanilla sugar - 10-20 g",
        "Butter (or vegetable oil, for greasing the mold) - 1 tbsp.",
        "Sour cream - 3 tbsp.",
      ],
      instructions:
        "Beat egg whites, add yolks. Mix the resulting mass with sugar, cottage cheese, and sifted flour. Add vanilla and salt. Add raisins softened in boiling water to the curd dough. Grease the mold with oil, sprinkle with flour, pour in the mixture, and spread sour cream on top. Bake for 40-45 minutes. at 180'C. After baking, let cool for 30-40 minutes.",
    },
    {
      id: 2,
      title: "Borsch",
      ingredients: [
        "Beef - 300 g",
        "Small beans - 150 g",
        "Potatoes - 300 g",
        "Carrots - 2 pcs. medium size",
        "Onion - 2 pcs. medium size",
        "Beetroot - 200 g.",
        "Garlic - 3 teeth.",
        "Cabbage - 300 g",
        "Grated tomatoes - 400 g",
        "Apple cider vinegar - 2-3 tbsp.",
        "Salt 1-2 tbsp.",
        "Sugar 1 tbsp.",
        "Ground black pepper 1/2 tsp.",
        "Bay leaves 3-4 pcs.",
        "Water 1-1.5 l (depending on the desired consistency)",
      ],
      instructions:
        "Boil the beef cut into pieces for 40 minutes, add the beans and cook for another 20 minutes (removing the foam). Fry finely chopped onion with grated carrots, add beets, grated tomatoes and simmer for 5-10 minutes. Add apple cider vinegar to the beef broth (so that the beets do not lose color) and add the stewed vegetables. Add diced potatoes and shredded cabbage. Cook until vegetables are soft. Add chopped garlic, salt, sugar, black pepper and cook for another 10 minutes. Serve hot with sour cream, lard, green onions and black bread",
    },
    {
      id: 3,
      title: "Uzbek pilaf",
      ingredients: [
        "Meat (beef/lamb) - 500 g",
        "Rice - 500 g",
        "Carrots - 200 g",
        "Garlic - 1 head",
        "Onion - 200 g",
        "Turmeric - 1 tsp.",
        "Black pepper - 1/2 tsp.",
        "Allspice - 1/2 tsp.",
        "Ground paprika - 1/2 tsp.",
        "Ground cumin - 1/4 tsp.",
        "Salt - 2 tbsp.",
        "Vegetable oil for frying - 5-7 tbsp.",
      ],
      instructions:
        "Cut the onions and carrots into strips. Fry the onion until golden brown. Add meat and fry until crust appears. Add carrots and simmer for 5-7 minutes. with seasonings and salt (turmeric, black pepper, allspice, paprika). Pour the meat and vegetables into a saucepan with a thick bottom, add a small amount of water to cover the meat, and simmer for 40 minutes. Add the rice, washed several times, to the meat, do not stir, add salt if necessary, add water to cover the rice by 2 cm, cover with a lid and cook over low heat until the rice absorbs the water. Place whole, unpeeled garlic in the middle and press it into the rice. Make holes in the rice (do not mix the rice and meat) to allow steam to escape and cook covered for another 20-30 minutes. until done, adding a little water if necessary. Before serving, mix rice with meat",
    },
  ];

  return (
    <main>
      <section className="recipes">
        <h1>Most popular recipes</h1>
        <p>
          “A recipe has no soul. You, as the cook, must bring soul to the
          recipe.” – Thomas Keller
        </p>
        <ul className="recipes__list">
          {recipes.map((recipe) => (
            <li key={recipe.id} className="recipes__list--option">
              <h2>{recipe.title}</h2>
              <ul className="recipes__items-list">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="recipes__items-list--option">
                    {ingredient}
                  </li>
                ))}
              </ul>
              <p>Instructions: {recipe.instructions}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
