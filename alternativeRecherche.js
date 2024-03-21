var artRecipes = document.getElementById("recipes");
var listIngredients = document.getElementById("list-ingredients");
var listAppliance = document.getElementById("list-appareils");
var listUstensils = document.getElementById("list-utensiles");
var totalRecettes = document.getElementById("totalRecettes");

var ingredientsFilter = document.getElementById("ingredients");
var applianceFilter = document.getElementById("appareils");
var ustensilsFilter = document.getElementById("utensiles");
var inputPrincipal = document.getElementById('inputName');

var allFilterList = document.querySelectorAll('.filter-ul');
let researchFilter = document.getElementById('research_filters');
var allTagNames = new Set();  // To storage the tags of the filter
var allTagNamesWithParent = new Set(); // To storage the tags of the filterwith the parent
var arrayRecipes = []; // To storage the recipes and to pass in the case we use the input and then the tags


//clean all the filters and article
function cleanFilterAndPage() {
    artRecipes.innerHTML = '';
    listIngredients.innerHTML = '';
    listAppliance.innerHTML = '';
    listUstensils.innerHTML = '';
}

//Main input to filter

inputPrincipal.addEventListener('input', () => {
    let filterSelectedTags = document.querySelectorAll('.filter__query p');
    // Case : User uses the input when User has selected tags. Remove the tags and clean the input
    if (filterSelectedTags.length > 0) {
        filterSelectedTags.forEach(node => {
            node.parentNode.remove();
        });
        inputPrincipal.value = '';
    }
    // Case : User removes the value of the Main input
    if (inputPrincipal.value.length == 0) {
        cleanFilterAndPage();
        init(recipes)
        allTagNames = new Set();
        allTagNamesWithParent = new Set();
        arrayRecipes = []
        return { allTagNames, allTagNamesWithParent, arrayRecipes };

    }
    let mainInputValue = inputPrincipal.value.toLowerCase();
    //Case : User writes more than 3 characters in the main input
    if (mainInputValue.length > 3) {
        arrayRecipes = [];
        let allIngredients = '';
        let allUstensils = '';
        let allAppliance = '';
        cleanFilterAndPage();

        for (let index = 0; index < recipes.length; index++) {
            const element = recipes[index];
            const { appliance, ingredients, ustensils } = element;
            let nameRecipe = element.name.toLowerCase().includes(mainInputValue)
            let descriptionRecipe = element.description.toLowerCase().includes(mainInputValue)

            if (nameRecipe || descriptionRecipe) {
                articlesAll(ingredients, element.time, element.image, element.name, element.description);
                allAppliance += appliance + ','
                allIngredients += valIngredients(ingredients) + ','
                allUstensils += valUsten(ustensils) + ','
                arrayRecipes.push(element);
            }
        }
        let applianceSorted = seaprateDataSort(allAppliance);
        let ingredientsSorted = seaprateDataSort(allIngredients);
        let ustensilsSorted = seaprateDataSort(allUstensils);
        printIngredients(ingredientsSorted);
        printUstensils(ustensilsSorted);
        printAppliance(applianceSorted);
        if (arrayRecipes.length === 0) {
            artRecipes.innerHTML = 'Result not found';
        }
        return arrayRecipes;
    } else {
        cleanFilterAndPage();
        init(recipes);
    }
});

//Add event to each li to filter by tag
allFilterList.forEach(function (filter) {
    filter.addEventListener('click', function (event) {
        let arrayEmptyRecipes = [];
        //Empty the list and the cards articles
        cleanFilterAndPage();

        if (event.target.tagName === 'LI') {
            let parentTagFilter = filter.id;

            let childTagFilter = event.target;
            let nameChildTagFilter = childTagFilter.textContent.toLowerCase();

            // varify if all the names are inside of the tags
            if (!allTagNames.has(nameChildTagFilter)) {
                researchFilter.innerHTML += `<div class="filter__query"><p>${childTagFilter.textContent}</p><span class="material-icons outlined">
                close
                </span></div>`;
                allTagNames.add(nameChildTagFilter);  // add the name to the set
                let nameWithParent = nameChildTagFilter + '-' + parentTagFilter;
                allTagNamesWithParent.add(nameWithParent) //
                let allRecipesFiltered = '';
                if (arrayRecipes.length > 0) {
                    allRecipesFiltered = tagsFilteredRecipes(arrayRecipes, arrayEmptyRecipes, allTagNamesWithParent);
                    hideTagClicked(allRecipesFiltered, allTagNames)
                    displayFilterAfterClick(allTagNamesWithParent, allTagNames, arrayRecipes)
                    if (allRecipesFiltered.length < 10) {
                        totalRecettes.innerHTML = `0${allRecipesFiltered.length} Recettes`

                    } else {
                        totalRecettes.innerHTML = `${allRecipesFiltered.length} Recettes`
                    }
                } else {
                    allRecipesFiltered = tagsFilteredRecipes(recipes, arrayEmptyRecipes, allTagNamesWithParent);
                    hideTagClicked(allRecipesFiltered, allTagNames)
                    displayFilterAfterClick(allTagNamesWithParent, allTagNames, recipes)
                    totalRecettes.innerHTML = `${allRecipesFiltered.length} Recettes`

                }
                if (allRecipesFiltered.length === 0) {
                    totalRecettes.innerHTML = `${allRecipesFiltered.length} Recettes`
                    artRecipes.innerHTML = 'Result not found';
                }
            }
        }
    });
});

//Verify if the tag is inside the each array of ingredients, ustensils and appliances, return the array with all the recipes filtered
function tagsFilteredRecipes(recipesAll, arrayEmptyRecipes, allTagNamesWithParent) { // Agrega el parámetro 'recipes'
    let allIngredients = [];
    let allUstensils = [];
    let allAppliance = [];
    // Filter elements tag with parents
    allTagNamesWithParent.forEach((value) => {
        if (value.includes('ingredient')) {
            allIngredients.push(value.replace("-list-ingredients", "").toLowerCase());
        }
        if (value.includes('utensiles')) {
            allUstensils.push(value.replace("-list-utensiles", "").toLowerCase());
        }
        if (value.includes('appareils')) {
            allAppliance.push(value.replace("-list-appareils", "").toLowerCase());
        }
    });

    // iteration with recipes
    for (let i = 0; i < recipesAll.length; i++) {
        let recipe = recipesAll[i];
        let isValid = true;
        // Get all the ingredients , ustensiles and appliances to lowercase
        let ingredients = recipe.ingredients.map(ing => ing.ingredient.toLowerCase());
        let ustensils = recipe.ustensils.map(ust => ust.toLowerCase());
        let appliance = recipe.appliance.toLowerCase();
        // Verify all in gredients in the ingredients recipes
        for (let j = 0; j < allIngredients.length; j++) {
            console.log(allTagNamesWithParent)
            if (!ingredients.includes(allIngredients[j])) {
                isValid = false;
                break; // We break when some of them is not in the verification
            }
        }
        // Verify all in ustensiles in the ustensiles recipes
        for (let j = 0; j < allUstensils.length; j++) {
            if (!ustensils.includes(allUstensils[j])) {
                isValid = false;
                break; //  We break when some of them is not in the verification
            }
        }
        // Verify all in appliances in the appliances recipes
        for (let j = 0; j < allAppliance.length; j++) {
            if (!appliance.includes(allAppliance[j])) {
                isValid = false;
                break; //  We break when some of them is not in the verification
            }
        }
        //  If all the verification are in inside we do a push to the array
        if (isValid) {
            arrayEmptyRecipes.push(recipe);
        }
    }
    return arrayEmptyRecipes;
}