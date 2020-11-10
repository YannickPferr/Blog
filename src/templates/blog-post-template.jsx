import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import { format, parseISO } from "date-fns"

import Layout from "../components/layout"
import Button from "../components/button"
import RichText from "../components/rich-text"
import PrevNext from "../components/prev-next"
import SocialShare from "../components/social-share"

import styles from "./blog-post-template.module.scss"

export const queryPostBySlug = graphql`
  query($tags: [String], $slug: String!){
    post: contentfulPost(slug: {eq: $slug}) {
      title
      slug
      createdAt
      updatedAt
      previewText
      tags {
        name
      }
      author {
        name
      }
      content {
        json
      }
      image {
        fluid {
          aspectRatio
          base64
          sizes
          src
          srcSet
          srcSetWebp
          srcWebp
        }
      }
      recipe{
        name
        description{
          childMarkdownRemark {
            html
          }
        }
        author {
          name
        }
        recipeCategory
        recipeCuisine
        recipeIngredient
        recipeYield
        cookTime
        prepTime
        totalTime
        tool
        nutrition{
          calories
          proteinContent
          fatContent
          carbohydrateContent
          fiberContent
        }
        keywords{
          name
        }
        image{
          fluid{
            src
          }
        }
        recipeInstructions{
          name
          text {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }

    relatedPosts: allContentfulPost(filter: {tags: {elemMatch: {name: {in: $tags}}}}) {
      edges {
        node {
          id
          title
          slug
          image {
            fluid{
              aspectRatio
              base64
              sizes
              src
              srcSet
              srcSetWebp
              srcWebp            
            }
          }
          previewText
          tags {
            name
          }
        }
      }
    }
    
    site: site {
      siteMetadata {
        siteUrl
        social {
          twitter
        }
      }
    }
  }
`

const BlogPosts = ({ data, pageContext }) => {
  const { post } = data
  const { next, prev } = pageContext

  const nextDetails = !next
    ? null
    : {
      titleText: "Next Post",
      linkPath: "/blog/" + next.slug,
      linkText: next.title,
    }

  const prevDetails = !prev
    ? null
    : {
      titleText: "Previous Post",
      linkPath: "/blog/" + prev.slug,
      linkText: prev.title,
    }

  return (
    <Layout
      blogPost={post}
      recipe={post.recipe}
      title={post.title}
      description={post.description}
      image={post.image.fluid}
      author={post.author.name}
      pathName={`/blog/${post.slug}`}
    >
      <article className={styles.article}>
        <header className={styles.header}>
          <h1 className={styles.title}>{post.title}</h1>
          <div>
            <span className={styles.subtitle}>
              by{" "}
              <Link to={`/blog/authors/${post.author.name}`}>
                {post.author.name}
              </Link>{" "}
              on {format(parseISO(post.createdAt), "MMMM do, yyyy")}
            </span>
          </div>
          <SocialShare
            text="SHARE THIS POST"
            shareTitle={post.title}
            shareUrl={`${data.site.siteMetadata.siteUrl}/blog/${post.title}`}
          />
          <div className={styles.tagListContainer}>
            {post.tags.map(tag => (
              <Button key={tag.name} linkUrl={`/blog/tags/${tag.name}`} linkText={tag.name} />
            ))}
          </div>
        </header>
        <Img fluid={post.image.fluid} />

        <div className={styles.postContent}>
          <RichText input={data.post.content} />
        </div>

        {/* Recipe if available */}
        {post.recipe && <section className={styles.recipeSection}>
          <header className={styles.recipeHeader}>
            <Img fluid={post.image.fluid} className={styles.recipeImg} />
            <div><h1 className={styles.pageHeading}>{post.recipe.name}</h1></div>
            <div><p>RATING</p></div>
            <div><p>Prep time: {post.recipe.prepTime} | Cook time: {post.recipe.cookTime} | Yields: {post.recipe.recipeYield}</p></div>
            <div><p>{post.recipe.nutrition.calories} Calories | {post.recipe.nutrition.proteinContent} g Protein | {post.recipe.nutrition.fatContent} g Fat | {post.recipe.nutrition.carbohydrateContent} g Carbs</p></div>
          </header>
          <hr></hr>
          <div>
            <div dangerouslySetInnerHTML={{ __html: post.recipe.description.childMarkdownRemark.html }}></div>
            <div>
              <p>Ingredients:</p>
              <ul>
                {post.recipe.recipeIngredient.map(ingredient => <li key={ingredient}>{ingredient}</li>)}
              </ul>
            </div>
            <div>
              <p>Instructions:</p>
              <ul>
                {post.recipe.recipeInstructions.map(obj => <li key={obj.name}>{obj.name}</li>)}
              </ul>
            </div>
            <div><p>Tools: {post.recipe.tool}</p></div>
            <div><p>Category: {post.recipe.recipeCategory} | Cuisine: {post.recipe.recipeCuisine}</p></div>
            <div><p>Keywords: {post.recipe.keywords.map(obj => obj.name).join(", ")}</p></div>
          </div>
        </section>}

        <div className={styles.postEnd}>
          <h3 className="section-sub-heading">Thanks for reading!</h3>
          <SocialShare
            text="SHARE THIS POST"
            shareTitle={post.title}
            shareUrl={`${data.site.siteMetadata.siteUrl}/blog/${post.title}`}
          />
        </div>

        <PrevNext prevDetails={prevDetails} nextDetails={nextDetails} />
      </article>

      {/* Sidebar with related posts */}
      <div className={styles.sidebar}>
        <div>
          <h4 className={styles.sidebarTitle}>Related recipes</h4>
          {data.relatedPosts.edges.map(edge => (
            <Link key={edge.node.id} to={`/blog/${edge.node.slug}`} className="no-underline">
              <div className={styles.recommendedPost}>
                <Img
                  fluid={edge.node.image.fluid} className={styles.recommendedPostImg} />
                <div>
                  <h4>{edge.node.title}</h4>
                  <p>{edge.node.previewText}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default BlogPosts
