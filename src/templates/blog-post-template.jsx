import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import { format, parseISO } from "date-fns"

import Layout from "../components/layout"
import Button from "../components/button"
import RichText from "../components/rich-text"
import PrevNext from "../components/prev-next"
import SocialShare from "../components/social-share"
import Recipe from "../components/recipe"

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
        fluid (maxWidth: 800, quality: 50){
          ...GatsbyContentfulFluid_withWebp
        }
      }
      recipe{
        name
        description{
          childMarkdownRemark {
            html
          }
          description
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
        calories
        proteinContent
        fatContent
        carbohydrateContent
        fiberContent
        keywords
        image{
          fluid(maxWidth: 400, quality: 50){
            ...GatsbyContentfulFluid_withWebp
          }
        }
        recipeInstructions{
          name
          text {
            childMarkdownRemark {
              html
            }
            text
          }
        }
        aggregateRating{
          internal {
            content
          }
        }
      }
    }

    relatedPosts: allContentfulPost(
        filter: {tags: {elemMatch: {name: {in: $tags}}}, slug: {ne: $slug}}
        limit: 5
      ){
      edges {
        node {
          id
          title
          slug
          image {
            fluid (maxWidth: 500, quality: 50){
              ...GatsbyContentfulFluid_withWebp           
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
            shareUrl={`${data.site.siteMetadata.siteUrl}/blog/${post.slug}`}
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
        {post.recipe
          &&
          <Recipe recipe={post.recipe} />
        }

        <div className={styles.postEnd}>
          <h3 style={{ "width": "50%" }} className={styles.sectionSubHeading}>Thanks for reading!</h3>
          <SocialShare
            text="SHARE THIS POST"
            shareTitle={post.title}
            shareUrl={`${data.site.siteMetadata.siteUrl}/blog/${post.slug}`}
          />
        </div>

        <PrevNext prevDetails={prevDetails} nextDetails={nextDetails} />
      </article>
      <section className={styles.comments}>
        <h2>Comments</h2>
        <p>Coming soon!</p>
      </section>

      {/* Sidebar with related posts if available*/}
      {
        data.relatedPosts
        &&
        <div className={styles.sidebar}>
          <div>
            <h4 className={styles.sidebarTitle}>Related recipes</h4>
            {data.relatedPosts.edges.map(edge => (
              <Link key={edge.node.id} to={`/blog/${edge.node.slug}`} className="no-underline">
                <div className={styles.recommendedPost}>
                  <Img
                    fluid={edge.node.image.fluid} className={styles.recommendedPostImg} />
                  <div className={styles.recommendedPostText}>
                    <h4>{edge.node.title}</h4>
                    <p>{edge.node.previewText}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      }
    </Layout>
  )
}

export default BlogPosts
