import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

import styles from "./blog-list-item.module.scss"

const BlogListItem = ({ node }) => {
  return (
    <div key={node.id} className={styles.post}>
      <Link to={`/blog/${node.slug}`} className="no-underline">
        <Img
          fluid={node.image.fluid}
          className={styles.postImg}
        />
        <div className={styles.postContent}>
          <h2 className={styles.title}>{node.title}</h2>
          {
            node.recipe 
            &&

            <h3 className={styles.subtitle}>{ + " " + node.recipe.calories + " calories"}</h3>
          }
          <h3 className={styles.subtitle}>{node.createdAt}</h3>
          <p>{node.previewText}</p>
        </div>
      </Link>
    </div>
  )
}

export default BlogListItem
