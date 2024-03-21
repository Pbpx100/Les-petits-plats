function hideTagClicked(allRecipesFiltered, allTagNames) {
    init(allRecipesFiltered)
    //Select All the elements lists and then for each list if I find a name I add display none
    let listEleIngredients = document.querySelectorAll('#list-ingredients li')
    let listEleAppliances = document.querySelectorAll('#list-appareils li')
    let listEleUstensils = document.querySelectorAll('#list-utensiles li')

    //get all elments of the list each time and we compares with the nam selected we storaged before and we add display none
    listEleIngredients.forEach((value) => {
        allTagNames.forEach((nam) => {
            if (value.textContent.toLowerCase() == nam) {
                value.style.visibility = 'hidden';
                value.style.display = 'none';
            }
        })
    })

    listEleAppliances.forEach((value) => {
        allTagNames.forEach((nam) => {
            if (value.textContent.toLowerCase() == nam) {
                value.style.visibility = 'hidden';
                value.style.display = 'none';
            }
        })
    })
    listEleUstensils.forEach((value) => {
        allTagNames.forEach((nam) => {
            if (value.textContent.toLowerCase() == nam) {
                value.style.visibility = 'hidden';
                value.style.display = 'none';
            }
        })
    })
}

//toggle list


//selected tags and remove tags to filter again

function displayFilterAfterClick(allTagNamesWithParent, allTagNames, recipesTotal) {
    let filterSelectedTags = document.querySelectorAll('.filter__query p'); //filter tag selected
    filterSelectedTags.forEach((value) => {
        value.parentElement.addEventListener(('click'), () => {
            let arrayInAllrecDel = [];
            cleanFilterAndPage();
            value.parentElement.remove();
            let valueFilterSelectedTag = value.textContent.toLowerCase();
            allTagNames.delete(valueFilterSelectedTag) // here we eliminate the tag
            allTagNamesWithParent.forEach((value) => {
                if (value.includes(valueFilterSelectedTag)) {
                    allTagNamesWithParent.delete(value);
                }
            })
            let allFiltersTag = tagsFilteredRecipes(recipesTotal, arrayInAllrecDel, allTagNamesWithParent);
            if (allFiltersTag.length > 0) {
                hideTagClicked(allFiltersTag, allTagNames);
            } else {
                cleanFilterAndPage();
                init(recipes);
            }
        })
    })
}
//Toggle

//Opening list

ingredientsFilter.addEventListener('focus', () => {
    showList(listIngredients)
    toggleArrow(ingredientsFilter)

});
ingredientsFilter.addEventListener('blur', () => {
    hideList(listIngredients)
    toggleArrow(ingredientsFilter)
});
applianceFilter.addEventListener('focus', () => {
    showList(listAppliance)
    toggleArrow(applianceFilter)
});
applianceFilter.addEventListener('blur', () => {
    hideList(listAppliance)
    toggleArrow(applianceFilter)

});
ustensilsFilter.addEventListener('focus', () => {
    showList(listUstensils)
    toggleArrow(ustensilsFilter)

});
ustensilsFilter.addEventListener('blur', () => {
    hideList(listUstensils)
    toggleArrow(ustensilsFilter)

});


function toggleArrow(arrowList) {
    let arrow = arrowList.nextElementSibling
    let elementArrow = arrow.firstElementChild
    console.log(elementArrow)
    elementArrow.innerText === 'expand_more' ? elementArrow.innerHTML = 'expand_less' : elementArrow.innerHTML = 'expand_more'

}
function showList(list) {

    list.style.visibility = 'visible';
}
// Funcions show and hide list after 300 miliseconds

function hideList(list) {
    setTimeout(() => {
        list.style.visibility = 'hidden';
    }, 300);
}
function filterElementList(valueFilter, allElementList) {
    for (let i = 0; i < allElementList.length; i++) {
        let eachElement = allElementList[i].textContent.toLowerCase();
        let isCurrentlyHidden = allElementList[i].style.visibility === 'hidden';
        if (eachElement.includes(valueFilter)) {
            if (isCurrentlyHidden) {
                allElementList[i].style.display = 'none';
            } else {
                allElementList[i].style.display = 'block';
            }
        } else {
            allElementList[i].style.display = 'none';

        }
    }
}

ingredientsFilter.addEventListener("input", function () {
    let valueFilter = ingredientsFilter.value.toLowerCase();
    let allElementList = document.querySelectorAll('#list-ingredients li')
    filterElementList(valueFilter, allElementList);
});

applianceFilter.addEventListener("input", function () {
    let valueFilter = applianceFilter.value.toLowerCase();
    let allElementList = document.querySelectorAll('#list-appareils li')
    filterElementList(valueFilter, allElementList);
});
ustensilsFilter.addEventListener("input", function () {
    let valueFilter = ustensilsFilter.value.toLowerCase();
    let allElementList = document.querySelectorAll('#list-utensiles li')
    filterElementList(valueFilter, allElementList);

});




// //BENCH TEST
// let mainInputValue = '';
// let arrayRecipes = [];
// const recipes = [
//     {
//         "id": 1,
//         "image": "Recette01.jpg",
//         "name": "Limonade de Coco",
//         "servings": 1,
//         "ingredients": [
//             {
//                 "ingredient": "Lait de coco",
//                 "quantity": 400,
//                 "unit": "ml"
//             },
//             {
//                 "ingredient": "Jus de citron",
//                 "quantity": 2
//             },
//             {
//                 "ingredient": "Crème de coco",
//                 "quantity": 2,
//                 "unit": "cuillères à soupe"
//             },
//             {
//                 "ingredient": "Sucre",
//                 "quantity": 30,
//                 "unit": "grammes"
//             },
//             {
//                 "ingredient": "Glaçons"
//             }
//         ],
//         "time": 10,
//         "description": "Mettre les glaçons à votre goût dans le blender, ajouter le lait, la crème de coco, le jus de 2 citrons et le sucre. Mixer jusqu'à avoir la consistence désirée",
//         "appliance": "Blender",
//         "ustensils": ["cuillère à Soupe", "verres", "presse citron"]
//     },
//     {
//         "id": 2,
//         "image": "Recette02.jpg",
//         "name": "Poisson Cru à la tahitienne",
//         "servings": 2,
//         "ingredients": [
//             {
//                 "ingredient": "Thon Rouge (ou blanc)",
//                 "quantity": 200,
//                 "unit": "grammes"
//             },
//             {
//                 "ingredient": "Concombre",
//                 "quantity": 1
//             },
//             {
//                 "ingredient": "Tomate",
//                 "quantity": 2
//             },
//             {
//                 "ingredient": "Carotte",
//                 "quantity": 1
//             },
//             {
//                 "ingredient": "Citron Vert",
//                 "quantity": 5
//             },
//             {
//                 "ingredient": "Lait de Coco",
//                 "quantity": 100,
//                 "unit": "ml"
//             }
//         ],
//         "time": 60,
//         "description": "Découper le thon en dés, mettre dans un plat et recouvrir de jus de citron vert (mieux vaut prendre un plat large et peu profond). Laisser reposer au réfrigérateur au moins 2 heures. (Si possible faites-le le soir pour le lendemain. Après avoir laissé mariner le poisson, coupez le concombre en fines rondelles sans la peau et les tomates en prenant soin de retirer les pépins. Rayer la carotte. Ajouter les légumes au poissons avec le citron cette fois ci dans un Saladier. Ajouter le lait de coco. Pour ajouter un peu plus de saveur vous pouvez ajouter 1 à 2 cuillères à soupe de Crème de coco",
//         "appliance": "Saladier",
//         "ustensils": ["presse citron"]
//     }, {
//         "id": 3,
//         "image": "Recette03.jpg",
//         "name": "Poulet coco réunionnais",
//         "servings": 4,
//         "ingredients": [
//             {
//                 "ingredient": "Poulet",
//                 "quantity": 1
//             },
//             {
//                 "ingredient": "Lait de coco",
//                 "quantity": 400,
//                 "unit": "ml"
//             },
//             {
//                 "ingredient": "Coulis de tomate",
//                 "quantity": 25,
//                 "unit": "cl"
//             },
//             {
//                 "ingredient": "Oignon",
//                 "quantity": 1
//             },
//             {
//                 "ingredient": "Poivron rouge",
//                 "quantity": 1
//             },
//             {
//                 "ingredient": "Huile d'olive",
//                 "quantity": 1,
//                 "unit": "cuillères à soupe"
//             }
//         ],
//         "time": 80,
//         "description": "Découper le poulet en morceaux, les faire dorer dans une cocotte avec de l'huile d'olive. Salez et poivrez. Une fois doré, laisser cuire en ajoutant de l'eau. Au bout de 30 minutes, ajouter le coulis de tomate, le lait de coco ainsi que le poivron et l'oignon découpés en morceaux. Laisser cuisiner 30 minutes de plus. Servir avec du riz",
//         "appliance": "Cocotte",
//         "ustensils": ["couteau"]
//     }
//   ];

//   if (mainInputValue.length > 3) {
//     recipes.forEach((recipe) => {
//                 const { appliance, ingredients, ustensils } = recipe;
//                 let nameRecipe = recipe.name.toLowerCase().includes(mainInputValue);
//                 let descriptionRecipe = recipe.description.toLowerCase().includes(mainInputValue);
//                 if (nameRecipe || descriptionRecipe) {
//                     arrayRecipes.push(recipe);
//                 }
//                     });
//     }

//     if (mainInputValue.length > 3) {
//         for (let index = 0; index < recipes.length; index++) {
//                     const element = recipes[index];
//                     const { appliance, ingredients, ustensils } = element;
//                     let nameRecipe = element.name.toLowerCase().includes(mainInputValue);
//                     let descriptionRecipe = element.description.toLowerCase().includes(mainInputValue);
        
//                     if (nameRecipe || descriptionRecipe) {
//                         arrayRecipes.push(element);
//                     }
//         }
//          }