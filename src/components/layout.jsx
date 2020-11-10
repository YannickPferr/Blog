import React from "react"

import SEO from "./seo"
import Header from "./header"
import Footer from "./footer"
//import Search from "./search"

import "../styles/main.scss"
import styles from "./layout.module.scss"

const Layout = props => {
  const { children, layoutFullWidth, blogPost, recipe, title, description, image, author, pathName } = props

  return (
    <>
      <SEO blogPost={blogPost} recipe={recipe} title={title} description={description} image={image} author={author} pathName={pathName} />
      <Header />
      {layoutFullWidth ? (
        <section className={styles.layout}>{children}</section>
      ) : (
        <section className={styles.layoutNarrow}>{children}</section>
      )}
      <Footer />
    </>
  )
}

export default Layout
