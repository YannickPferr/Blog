import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import PrevNext from "../components/prev-next"
import Button from "../components/button"
import SocialShare from "../components/social-share"

import styles from "./blog-post-template.module.scss"

export const queryPostBySlug = graphql`
  query($slug: String!){
    post: contentfulPost(title: {eq: $slug}) {
      date
      previewText
      title
      tags {
        name
      }
      author {
        name
      }
      content {
        childMarkdownRemark{
          html
        }
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
      datePublished={post.date}
    >
      <article className="ph4">
        <header className={styles.header}>
          <h1 className={styles.title}>{post.title}</h1>
          <div>
            <span className={styles.subtitle}>
              by{" "}
              <Link to={`/blog/authors/${post.author.name}`}>
                {post.author.name}
              </Link>{" "}
              on {post.date}
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

        <div
          className={styles.postContent}
          dangerouslySetInnerHTML={{ __html: post.content.childMarkdownRemark.html}}
        ></div>

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
    </Layout>
  )
}

export default BlogPosts
