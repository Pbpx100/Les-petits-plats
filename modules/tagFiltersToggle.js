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
