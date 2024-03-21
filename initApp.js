function transformRecipeData(recipe) {
    const { id, image, name, time, description, ingredients, appliance, ustensils } = recipe;
    return {
        name: name,
        time: time,
        image: image,
        description: description,
        ingredients: ingredients,
        appliance: appliance,
        ustensils: ustensils
    };
}

// Función que utiliza la transformación
function mappingRecipes(recipesForm) {
    return recipesForm.map(transformRecipeData);
}
// Función para inicializar la interfaz con todas las recetas
function init(Allrecipes) {
    // console.log(Allrecipes)
    // ... (código existente)
    var allRecipesAppliances = '';
    var allRecipesIngredients = '';
    var allRecipesUstensils = '';
    totalRecettes.innerHTML = `${Allrecipes.length} Recettes`

    // Pintar las recetas iniciales
    mappingRecipes(Allrecipes).forEach((recipe) => {
        //console.log(recipe)
        const { appliance, ingredients, ustensils } = recipe;
        articlesAll(ingredients, recipe.time, recipe.image, recipe.name, recipe.description);
        allRecipesAppliances += appliance + ','
        allRecipesIngredients += valIngredients(ingredients) + ','
        allRecipesUstensils += valUsten(ustensils) + ','
    });

    var appliancesSorted = seaprateDataSort(allRecipesAppliances);
    var ingredientsSorted = seaprateDataSort(allRecipesIngredients);
    var ustensilsSorted = seaprateDataSort(allRecipesUstensils);
    printIngredients(ingredientsSorted);
    printUstensils(ustensilsSorted);
    printAppliance(appliancesSorted);
    return { appliancesSorted, ingredientsSorted, ustensilsSorted }
}

init(recipes)