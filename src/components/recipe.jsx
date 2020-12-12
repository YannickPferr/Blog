import React from "react"
import Img from "gatsby-image"
import * as duration from 'duration-fns'

import { FaRegStar, FaStar, FaStarHalfAlt, FaClock, FaUtensils, FaFire, FaDrumstickBite, FaTint, FaBreadSlice } from "react-icons/fa"

import styles from "./recipe.module.scss"

const Recipe = (data) => {

  const round = Math.round(data.ratingValue) || 0;
  const floor = Math.floor(data.ratingValue) || 0;
  const isHalfStar = ((data.ratingValue - floor) || 0) < 0.5 ? false : true;

  function renderStars() {
    let stars = []
    for (let i = 0; i < floor; i++)
      stars.push(<FaStar className={styles.iconMedium} />)

    if (isHalfStar)
      stars.push(<FaStarHalfAlt className={styles.iconMedium} />);

    for (let i = 0; i < 5 - round; i++)
      stars.push(<FaRegStar className={styles.iconMedium} />)

    let ratingDesc = <p>No ratings yet!</p>;
    if (data.ratingCount)
      ratingDesc = <p>{data.ratingValue + " (" + data.ratingCount + " ratings)"}</p>;

    return (<div><div className={styles.starsContainer}>{stars}</div>{ratingDesc}</div>)
  }

  return (
    <section id="recipe" className={styles.recipeSection}>
      <header className={styles.recipeHeader}>
        <Img
          fluid={data.recipe.image.fluid}
          className={styles.recipeImg}

        />
        <div><h2 className={styles.pageHeading}>{data.recipe.name}</h2></div>
        {
          renderStars()
        }
        <button onClick={() => window.print()}>Print recipe</button>
        <div className={styles.infoContainer}>
          <div>
            <FaClock className={styles.iconMedium} />
            <p>Time</p>
            <strong>{duration.toMinutes(duration.parse(data.recipe.totalTime)) + " min"}</strong>
          </div>
          <div>
            <FaFire className={styles.iconMedium} />
            <p>Calories</p>
            <strong>{data.recipe.calories}</strong>
          </div>
          <div>
            <FaUtensils className={styles.iconMedium} />
            <p>Yields</p>
            <strong>{data.recipe.recipeYield}</strong>
          </div>
        </div>
        <hr style={{ "width": "90%" }}></hr>

        <div className={styles.infoContainer}>
          <div>
            <FaDrumstickBite className={styles.iconMedium} />
            <p>Protein</p>
            <strong>{data.recipe.proteinContent}g</strong>
          </div>
          <div>
            <FaTint className={styles.iconMedium} />
            <p>Fat</p>
            <strong>{data.recipe.fatContent}g</strong>
          </div>
          <div>
            <FaBreadSlice className={styles.iconMedium} />
            <p>Carbs</p>
            <strong>{data.recipe.carbohydrateContent}g</strong>
          </div>
        </div>
      </header>
      <div className={styles.recipeMainSection}>
        <h3>Description:</h3>
        <div dangerouslySetInnerHTML={{ __html: data.recipe.description.childMarkdownRemark.html }}></div>
        <hr></hr>
        <div className={styles.ingredients}>
          <h3>Ingredients:</h3>
          <div className={styles.ingredientsList}>
            {data.recipe.recipeIngredient.map(ingredient =>
              <div key={ingredient} className={styles.ingredientsRow}>
                <div className={styles.ingredientValue}><strong>{ingredient.substr(0, ingredient.indexOf(' '))}</strong></div>
                <div className={styles.ingredientName}>{ingredient.substr(ingredient.indexOf(' ') + 1)}</div>
              </div>)}
          </div>
        </div>
        <hr></hr>
        <div>
          <h3>Instructions:</h3>
          <ol className={styles.instructionsList}>
            {data.recipe.recipeInstructions.map(obj =>
              <li id={obj.name}>
                <h4>{obj.name}</h4>
                <div dangerouslySetInnerHTML={{ __html: obj.text.childMarkdownRemark.html }}></div>
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
