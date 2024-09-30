let searchbox=document.querySelector("#searchbox");
let searchbtn=document.querySelector(".searchbtn");
let container=document.querySelector(".container");
let recipeDetailContent=document.querySelector(".recipe-detail-content");
let recipeCloseBtn=document.querySelector(".recipe-close-btn");


const fetchrecipes =async (query)=>{
    container.innerHTML="<h2>fetching data...</h2>"
    try{

      const data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const response =await data.json();
      container.innerHTML=""
      // console.log(response)
      response.meals.forEach(element => {
      //   console.log(element);   
      const recipediv=document.createElement("div");
      recipediv.classList.add("recipe");   
      recipediv.innerHTML=
      `<img src="${element.strMealThumb}"/>
      <h3>${element.strMeal}</h3>
      <p>${element.strArea}</p>
      <p>${element.strCategory}</p>
     
      `
  
      const btn=document.createElement("button");
      btn.innerHTML="View Recipe";
      recipediv.appendChild(btn);
  
  
      btn.addEventListener("click",()=>{
        openRecipePopup(element);
      })
  
  
      container.appendChild(recipediv);
      });
    }catch(error){
      container.innerHTML=`<h2>Error In Fetching recipes...</h2>`
    }
    

  }

searchbtn.addEventListener("click",(e)=>{
    e.preventDefault();
    // console.log("clicked");
    const searchInput=searchbox.value.trim();
    fetchrecipes(searchInput);
});

const fetchIngredient=(element)=>{
    //  console.log(element);
     let ingredientList="";
     for(let i=1;i<20;i++)
     {
        const ingredient=element[`strIngredient${i}`];
        if(ingredient){
          const measure=element[`strMeasure${i}`];
          ingredientList +=`<li>${measure} ${ingredient}</li>`
        }else{
          break;
        }
     }
     return ingredientList;

}

const openRecipePopup=(element)=>{
recipeDetailContent.innerHTML=`
<h2 class="recipeName">${element.strMeal}</h2>
<h3>Ingredient:</h3>
<ul class="IngredientList>${fetchIngredient(element)}</ul>
<div>
  <h3>Instruction</h3>
  <p class="RecipeInstructions">${element.strInstructions}</p>
</div>
`
recipeDetailContent.parentElement.style.display="block";
}

recipeCloseBtn.addEventListener("click",()=>{
  recipeDetailContent.parentElement.style.display="none";
})

