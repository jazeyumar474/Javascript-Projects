const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer= document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn')
//Function To Get Recipes 
const fetchRecipes = async (query) => {
  recipeContainer.innerHTML ='Fetching Recipes';
  const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
  const response = await data.json();
  recipeContainer.innerHTML ='';
  response.meals.forEach(meal => {
    //console.log(meal);
    const recipeDiv = document.createElement('div');
    recipeDiv.classList.add('recipe');
    recipeDiv.innerHTML = `
    <img src="${meal.strMealThumb}">
    <h1>${meal.strMeal}</h1>
    <p>${meal.strArea} Dish</p>
    <p>Belongs To ${meal.strCategory} Category</p>
    `
    const viewRecipe = document.createElement('button');
    viewRecipe.textContent = 'View Recipe';
    recipeDiv.appendChild(viewRecipe);
    viewRecipe.addEventListener('click',() => {
      openRecipePoppup(meal);
    })
    recipeContainer.appendChild(recipeDiv);
  })
  //console.log(response.meals[0]);
}
const fetchIngredients = (meal) => {
  let ingredientsList = "";
  for (let i = 1; i <= 20; i++) { // Start from 1, not 0
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== "") {
      ingredientsList += `<li>${measure ? measure : ''} ${ingredient}</li>`;
    } else {
      break; // Stop when no more ingredients are found
    }
  }
  return ingredientsList;
}

const openRecipePoppup = (meal) => {
  recipeDetailsContent.innerHTML = `
    <h1 class='recipeName'>${meal.strMeal}</h1>
    <h2 class='ingredient'>Ingredients</h2>
    <ul class='ingredientsList'>${fetchIngredients(meal)}</ul>
    <div>
    <h3 class='ingredient'>Instructions</h3>
    <p class='instructions'>${meal.strInstructions}</p>
    </div>
    `;
    
  recipeDetailsContent.parentElement.style.display = 'block';
}
recipeCloseBtn.addEventListener('click', () => {
  recipeDetailsContent.parentElement.style.display = 'none';
})
searchBtn.addEventListener('click',(e) =>{
  e.preventDefault();
  const searchInput = searchBox.value.trim();
  fetchRecipes(searchInput);
  //console.log('Btn Clicked');
  });