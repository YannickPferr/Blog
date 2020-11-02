import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"

import PrevNext from "../components/prev-next"
import Button from "../components/button"
import SocialShare from "../components/social-share"

import styles from "./blog-post-template.module.scss"

import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

export const queryPostBySlug = graphql`
  query($tags: [String], $slug: String!){
    post: contentfulPost(title: {eq: $slug}) {
      createdAt(formatString: "MMMM Do, YYYY")
      previewText
      title
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
          tracedSVG
        }
      }
    }

    latestPosts: allContentfulPost(filter: {tags: {elemMatch: {name: {in: $tags}}}}) {
      edges {
        node {
          title
          image {
            fluid(maxWidth: 500, maxHeight: 500){
              aspectRatio
              base64
              sizes
              src
              srcSet
              srcSetWebp
              srcWebp
              tracedSVG
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
      linkPath: "/blog/" + next.title,
      linkText: next.title,
    }

  const prevDetails = !prev
    ? null
    : {
      titleText: "Previous Post",
      linkPath: "/blog/" + prev.title,
      linkText: prev.title,
    }

  return (
    <Layout
      isArticle={true}
      title={post.title}
      description={post.description}
      image={post.image.fluid}
      author={post.author.name}
      pathName={`/blog/${post.title}`}
      datePublished={post.createdAt}
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
              on {post.createdAt}
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
        <Img
          fluid={post.image.fluid}
          alt={post.imageAlt}
        />

        <div className={styles.postContent}>
          {documentToReactComponents(data.post.content.json)}
        </div>

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
      <div className={styles.sidebar}>
        <h3>Similar recipes</h3>
        {data.latestPosts.edges.map(node => (
          <Link to={`/blog/${node.node.title}`} className="no-underline">
            <div className={styles.recommendedPost}>
              <Img
                fluid={node.node.image.fluid} className={styles.recommendedPostImg} />
              <div>
                <h3>{node.node.title}</h3>
                <p>{node.node.previewText}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  )
}

export default BlogPosts
