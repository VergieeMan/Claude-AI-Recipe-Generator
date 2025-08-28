import React from "react"
import IngredientsList from "./components/IngredientsList"
import ClaudeRecipe from "./components/ClaudeRecipe"
import RecipePlaceHolder from "./components/RecipePlaceHolder"


export default function Main() {
    const [ingredients, setIngredients] = React.useState([])
    const [recipe, setRecipe] = React.useState("")

//     async function getRecipe() {
//     try {
//         const res = await fetch("/.netlify/functions/ai", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ingredients }),
//         });

//         const data = await res.json();
//         setRecipe(data.recipe || "");
//     } catch (err) {
//         console.error("Error fetching recipe:", err);
//     }
// }

async function getRecipe() {
  try {
    console.log("Calling Netlify function...");
    const res = await fetch("/.netlify/functions/getRecipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredients }),
    });

    console.log("Response status:", res.status);

    const data = await res.json();
    console.log("Data from Netlify function:", data);

    setRecipe(data.recipe || "");
  } catch (err) {
    console.error("Error fetching recipe:", err);
  }
}

    function addIngredient(formData) {
        const newIngredientName = formData.get("ingredient")
        const newIngredient = {
            id: crypto.randomUUID(),
            name:newIngredientName
        }
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    function removeIngredients(id){
       return setIngredients(prevIngredients => prevIngredients.filter(item => item.id !==id))
    }

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>
            {ingredients.length === 0 &&
                            <RecipePlaceHolder
                            />
                        }
                        
            {ingredients.length > 0 &&
                <IngredientsList
                    ingredients={ingredients}
                    removeIngredients={removeIngredients}
                    getRecipe={getRecipe}
                />
            }

            {recipe && <ClaudeRecipe recipe={recipe}/>}
        </main>
    )
}