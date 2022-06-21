const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");
let searchQuery = '';
const APP_ID = '8c95972e';
const APP_key ='428074aed42d5d47ab3eb8441254848d';
const baseURL =`https://api.edamam.com/api/recipes/v2?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}`;

searchForm.addEventListener('submit',(e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    fetchAPI();
    
});

async function fetchAPI (){
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=20`;
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits);
    console.log(data);
}
function generateHTML(results){
    let generatedHTML ='';
    results.map(result =>{
        generatedHTML +=
        `
        <div class="item">
        <img src="${result.recipe.image}" alt="">
        <div class="flex-container">
        <h1 class="title">${result.recipe.label}</h1>
        <a class="view-button" href="${result.recipe.url}" target="_blank">view Recipe</a>
        </div>
        <p class="item-data">CuisineType: ${result.recipe.cuisineType}</p>
        <p class="item-data">MealType: ${result.recipe.mealType}</p>
        <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
        </div>
    `
    })
    searchResultDiv.innerHTML = generatedHTML;
}