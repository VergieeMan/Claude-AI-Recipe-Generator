export default function IngredientsList(props) {
    const ingredientsListItems = props.ingredients.map(ingredient => (
        <li key={ingredient.id}>{ingredient.name}{" "} <button className="removeBtn" onClick={()=>props.removeIngredients(ingredient.id)}>⛔️</button></li>
    ))
    return (
        <section>
            <h2>Ingredients on hand:</h2>
            <ul className="ingredients-list" aria-live="polite">{ingredientsListItems}</ul>
            {props.ingredients.length > 3 && <div className="get-recipe-container">
                <div>
                    <h3>Ready for a recipe?</h3>
                    <p>Generate a recipe from your list of ingredients.</p>
                </div>
                <button className="recipeBtn" onClick={props.getRecipe}>Get a recipe</button>
            </div>}
        </section>
    )
}