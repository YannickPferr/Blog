import React from "react"
import Img from "gatsby-image"

import Button from "../components/button"

import styles from "./about-content.module.scss"

const AboutContent = ({
  heading,
  copy,
  image,
  imageAlt,
  imageFirst,
  button,
}) => {
  let imageClassName = imageFirst ? styles.imageWrapperFirst : styles.imageWrapper

  let contentWrapperClassName = image ? styles.contentWrapperWithImage : styles.contentWrapperWithoutImage

  return (
    <section className={styles.sectionWrapper}>
      <div className={contentWrapperClassName}>
        <h2 className="section-heading">{heading}</h2>
        <div className={styles.textWrapper}
          dangerouslySetInnerHTML={{
            __html: copy,
          }}
        ></div>
        {button && <Button linkUrl={button.url} linkText={button.text} />}
      </div>

      {image && <Img fluid={image.fluid} alt={imageAlt} className={imageClassName} />}
    </section>
  )
}

export default AboutContent
