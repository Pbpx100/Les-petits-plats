//Separating data
function seaprateDataSort(arrayLIst) {
    var ex = arrayLIst.split(',')
    var sor = ex.flat().filter(ingredient => ingredient !== '');
    var arraSorted = sorthings(sor);
    return arraSorted;
}

//Mapping data

//mapping ingredients
function valIngredients(ingredients) {
    var allINg = [];
    const ingredientsArray = ingredients.map(ingredient => ingredient.ingredient);
    allINg.push(...ingredientsArray);
    return allINg;
}

//mapping ustensils and appareils

function valUsten(ustensils) {
    var allINg = [];
    ustensils.map((usten) => {
        allINg.push(usten);
    });
    return allINg;
}

//Mapping articles
//Sorting data
function sorthings(sortAll) {
    const ingre = new Set(sortAll)
    const uni = [...ingre]
    uni.sort((a, b) => a.localeCompare(b));
    return uni;

}