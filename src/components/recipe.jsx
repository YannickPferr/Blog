import React from "react"
import Img from "gatsby-image"
import * as duration from 'duration-fns'

import { FaClock, FaUtensils, FaFire, FaDrumstickBite, FaTint, FaBreadSlice } from "react-icons/fa"

import styles from "./recipe.module.scss"

const Recipe = (data) => {

  return (
    <section id="recipe" className={styles.recipeSection}>
      <header className={styles.recipeHeader}>
        <Img
          fluid={data.recipe.image.fluid}
          className={styles.recipeImg}

        />
        <div><h2 className={styles.pageHeading}>{data.recipe.name}</h2></div>
        {
          data.recipe.aggregateRating.ratingValue
          &&
          <div><p>{data.recipe.aggregateRating.ratingValue + " (" + data.recipe.aggregateRating.ratingCount + " ratings)"}</p></div>
        }
        <div className={styles.infoContainer}>
          <div>
            <FaClock className="icon-medium" />
            <p><strong>Time</strong></p>
            <p>{duration.toMinutes(duration.parse(data.recipe.totalTime)) + " min"}</p>
          </div>
          <div>
            <FaFire className="icon-medium" />
            <p><strong>Calories</strong></p>
            <p>{data.recipe.calories}</p>
          </div>
          <div>
            <FaUtensils className="icon-medium" />
            <p><strong>Yields</strong></p>
            <p>{data.recipe.recipeYield}</p>
          </div>
        </div>
        <hr style={{ "width": "90%" }}></hr>
        <div className={styles.infoContainer}>
          <div>
            <FaDrumstickBite className="icon-medium" />
            <p><strong>Protein</strong></p>
            <p>{data.recipe.proteinContent}g</p>
          </div>
          <div>
            <FaTint className="icon-medium" />
            <p><strong>Fat</strong></p>
            <p>{data.recipe.fatContent}g</p>
          </div>
          <div>
            <FaBreadSlice className="icon-medium" />
            <p><strong>Carbs</strong></p>
            <p>{data.recipe.carbohydrateContent}g</p>
          </div>
        </div>
      </header>
      <div className={styles.recipeMainSection}>
        <h3>Description:</h3>
        <div dangerouslySetInnerHTML={{ __html: data.recipe.description.childMarkdownRemark.html }}></div>
        <hr></hr>
        <div>
          <h3>Ingredients:</h3>
          <div className={styles.ingredients}>
            {data.recipe.recipeIngredient.map(ingredient =>
              <div key={ingredient} className={styles.ingredientsRow}>
                <div><strong>{ingredient.substr(0, ingredient.indexOf(' '))}</strong></div>
                <div>{ingredient.substr(ingredient.indexOf(' ') + 1)}</div>
              </div>)}
          </div>
        </div>
        <hr></hr>
        <div>
          <h3>Instructions:</h3>
          <ol className={styles.instructionsList}>
            {data.recipe.recipeInstructions.map(obj =>
              <li key={obj.name}>
                <h4>{obj.name}</h4>
                <p dangerouslySetInnerHTML={{ __html: obj.text.childMarkdownRemark.html }}></p>
              </li>
            )}
          </ol>
        </div>
        <hr></hr>
        <div><p><strong>Tools:</strong> {data.recipe.tool.join(", ")}</p></div>
        <div><p><strong>Category:</strong> {data.recipe.recipeCategory}</p></div>
        <div><p><strong>Cusine:</strong> {data.recipe.recipeCuisine}</p></div>
      </div>
    </section>
  )
}

export default Recipe
