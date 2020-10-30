import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

import styles from "./blog-list-item.module.scss"

const BlogListItem = ({ node }) => {
  return (
    <div key={node.title}>
      <Link to={`/blog/${node.title}`} className="no-underline">
        <div className={styles.post}>
          <div className={styles.postColumn}>
            <h2 className={styles.title}>{node.title}</h2>
            <p className={styles.subtitle}>
              by {node.author.name} on {node.createdAt}
            </p>
            {node.tags.length > 0 && (
              <p className={styles.tags}>
                tags: {node.tags.map(tag => tag.name).join(", ")}
              </p>
            )}
            <p>{node.previewText}</p>
          </div>
          <div className={styles.postColumn}>
            <Img
              fluid={node.image.fluid}
              alt={node.imageAlt}
            />
          </div>
        </div>
      </Link>
    </div>
  )
}

export default BlogListItem
