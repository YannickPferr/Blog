import React from "react"

import FeaturedTagItem from "../components/featured-tag-item"

import styles from "./featured-tag-list.module.scss"

const FeaturedTagList = ({ tags }) => {
  return (
    <>
      <h2 className="section-heading">Posts by Tag</h2>
      <div className={styles.featuredTagItemsContainer}>
        {tags.map(({ node }) => (
          <FeaturedTagItem
            key={node.name}
            tag={node.name}
            heading={node.name[0].toUpperCase() + node.name.substring(1)}
            image={node.featuredImage.fluid}
            imageAlt={node.featured_image_alt}
          />
        ))}
      </div>
    </>
  )
}

export default FeaturedTagList
