/* eslint-disable @typescript-eslint/no-explicit-any */
export function extractIngredients(recipe: any, initialCount = 1, finalCount = 10) {
    const ingredients: { name: string; measure: string }[] = [];

    for (let i = initialCount; i <= finalCount; i++) {
        const ingredient = recipe[`strIngredient${i}`]?.trim();
        const measure = recipe[`strMeasure${i}`]?.trim();

        if (ingredient && ingredient !== "") {
            ingredients.push({
                name: ingredient,
                measure: measure || "",
            });
        }
    }

    return ingredients;
}