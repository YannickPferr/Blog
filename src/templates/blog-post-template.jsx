import React, { useState, useEffect } from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import { format, parseISO } from "date-fns"
import { useToasts } from 'react-toast-notifications'

import Layout from "../components/layout"
import Button from "../components/button"
import RichText from "../components/rich-text"
import PrevNext from "../components/prev-next"
import SocialShare from "../components/social-share"
import Recipe from "../components/recipe"
import Comments from "../components/comments"

import styles from "./blog-post-template.module.scss"

export const queryPostBySlug = graphql`
  query($tags: [String], $slug: String!){
    post: contentfulPost(slug: {eq: $slug}) {
      contentful_id
      title
      slug
      createdAt
      updatedAt
      previewText
      enableComments
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
        contentful_id
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
        commentsServerUrl
      }
    }
  }
`
const BlogPosts = ({ data, pageContext }) => {
  const { addToast } = useToasts()

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


  const [comments, setComments] = useState([])
  useEffect(() => {
    fetch(data.site.siteMetadata.commentsServerUrl + "/comments?id=" + data.post.contentful_id)
      .then(response => response.json()) // parse JSON from request
      .then(resultData => {
        setComments(resultData);
      })
      .catch(error => addToast(error, { appearance: 'error' }))
  }, [data.post.contentful_id, data.site.siteMetadata.commentsServerUrl, addToast])

  const [ratingValue, setRatingValue] = useState(0)
  const [ratingCount, setRatingCount] = useState(0)
  useEffect(() => {
    fetch(data.site.siteMetadata.commentsServerUrl + "/rating?id=" + data.post.recipe.contentful_id)
      .then(response => response.json()) // parse JSON from request
      .then(resultData => {
        setRatingValue(resultData.ratingValue);
        setRatingCount(resultData.ratingCount);
      })
      .catch(error => addToast(error, { appearance: 'error' }))
  }, [data.post.recipe.contentful_id, data.site.siteMetadata.commentsServerUrl, addToast])

  const handleCommentsUpdate = (comment) => {
    fetch(data.site.siteMetadata.commentsServerUrl + '/comments', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: data.post.contentful_id, comment: comment })
    })
      .then(response => {
        if (response.status === 200) {
          setComments(comments.concat(comment))
          addToast('Comment posted!', { appearance: 'success' })
        }
      })
      .catch(error => addToast(error, { appearance: 'error' }))
  }

  const handleRatingsUpdate = (rating) => {
    fetch(data.site.siteMetadata.commentsServerUrl + '/rating', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: data.post.recipe.contentful_id, rating: rating })
    })
      .then(response => response.json())
      .then(responseData => {
        setRatingValue(Math.round(responseData.newRatingValue * 10) / 10)
        setRatingCount(responseData.newRatingCount)
        addToast('Rating submitted!', { appearance: 'success' })
      })
      .catch(error => addToast(error, { appearance: 'error' }))
  }

  const handleRepliesUpdate = (commentNum, reply) => {
    fetch(data.site.siteMetadata.commentsServerUrl + '/replies', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: data.post.contentful_id, comment: commentNum, reply: reply })
    })
      .then(response => {
        if (response.status === 200) {
          comments[commentNum].replies.push(reply)
          setComments(comments.slice())
          addToast('Reply posted!', { appearance: 'success' })
        }
      })
      .catch(error => addToast(error, { appearance: 'error' }))
  }

  data.post.recipe.ratingValue = ratingValue
  data.post.recipe.ratingCount = ratingCount

  return (
    <Layout
      blogPost={data.post}
      recipe={data.post.recipe}
      title={data.post.title}
      description={data.post.description}
      image={data.post.image.fluid}
      author={data.post.author.name}
      pathName={`/blog/${data.post.slug}`}
    >
      <article className={styles.article}>
        <header className={styles.header}>
          <h1 className={styles.title}>{data.post.title}</h1>
          <div>
            <span className={styles.subtitle}>
              by{" "}
              <Link to={`/blog/authors/${data.post.author.name}`}>
                {data.post.author.name}
              </Link>{" "}
              on {format(parseISO(data.post.createdAt), "MMMM do, yyyy")}
            </span>
          </div>
          <SocialShare
            text="SHARE THIS POST"
            shareTitle={data.post.title}
            shareUrl={`${data.site.siteMetadata.siteUrl}/blog/${data.post.slug}`}
          />
          <div className={styles.tagListContainer}>
            {data.post.tags.map(tag => (
              <Button key={tag.name} linkUrl={`/blog/tags/${tag.name}`} linkText={tag.name} />
            ))}
          </div>
        </header>
        <Img fluid={data.post.image.fluid} />

        <div className={styles.postContent}>
          <RichText input={data.post.content} />
        </div>

        {/* Recipe if available */}
        {data.post.recipe
          &&
          <Recipe recipe={data.post.recipe} ratingValue={ratingValue} ratingCount={ratingCount} />
        }

        <div className={styles.postEnd}>
          <h3 style={{ "width": "50%" }} className={styles.sectionSubHeading}>Thanks for reading!</h3>
          <SocialShare
            text="SHARE THIS POST"
            shareTitle={data.post.title}
            shareUrl={`${data.site.siteMetadata.siteUrl}/blog/${data.post.slug}`}
          />
        </div>

        <PrevNext prevDetails={prevDetails} nextDetails={nextDetails} />
      </article>

      {/* Comment sections if comments enabled*/}
      {
        data.post.enableComments
        &&
        <Comments id={data.post.contentful_id} handleCommentsUpdate={handleCommentsUpdate} handleRatingsUpdate={handleRatingsUpdate} handleRepliesUpdate={handleRepliesUpdate} comments={comments}></Comments>
      }

      {/* Sidebar with related posts if available*/}
      {
        data.relatedPosts
        &&
        <div className={styles.sidebar}>
          <div>
            <h2 className={styles.sidebarTitle}>Related recipes</h2>
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
