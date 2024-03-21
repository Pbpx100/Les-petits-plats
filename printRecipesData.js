
function printUstensils(arraySorted) {
    arraySorted.forEach((arr) => {
        listUstensils.innerHTML += `<li>${arr}</li>`;
    })
}
function printIngredients(arraySorted) {
    arraySorted.forEach((arr) => {
        const liElement = document.createElement('li');
        liElement.textContent = arr;
        listIngredients.appendChild(liElement);
    });
}
function printAppliance(appli) {
    appli.forEach((arr) => {
        listAppliance.innerHTML += `<li>${arr}</li>`;
    })
}

function articlesAll(ingredients, time, image, name, description) {
    //var mapRec = recipe.ingredients
    var ingredientsDetail = "";
    ingredients.map(rec => {
        const { ingredient, quantity, unit } = rec;
        if (ingredient !== undefined) {
            ingredientsDetail += `<div class="recipes-detail"><b>${ingredient}</b>`;
        }
        if (quantity !== undefined) {
            ingredientsDetail += ` <span>${quantity}</span>&nbsp`;
        }
        if (unit !== undefined) {
            ingredientsDetail += `<span>${unit}</span>`;
        }
        if (ingredient !== undefined) {
            ingredientsDetail += `</div>`;
        }
        return ingredientsDetail;
    });
    artRecipes.innerHTML += `
        <article class="recipes-article" id="recipes-article">
           <span class="recipes-time">${time} min</span>
            <figure class="recipes-card">
                <img class="recipes-image" src="Photos/${image}" alt="">
                <figcaption>
                    <h2>${name}</h2>
                    <h3>RECETTE</h3>
                    <p class="recette-paragraph">${description}</p>
                    <h3>INGRÉDIENTS</h3>
                   <div class="recipes-details">
                    ${ingredientsDetail}
                    </div>
                </figcaption>
            </figure>
        </article>`;
}