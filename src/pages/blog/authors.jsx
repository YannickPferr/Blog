import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"

import Layout from "../../components/layout"

import styles from "./authors.module.scss"

const Authors = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulPost {
        group(field: author___name) {
          fieldValue
          totalCount
        }
      }
    }
  `)

  return (
    <Layout title="All Blog Authors" pathName="/blog/authors">
      <h1 className="page-heading">Authors</h1>
      <section className={styles.authorSection}>
        {data.allContentfulPost.group.map(author => (
          <div key={author.fieldValue}>
            <Link to={`/blog/authors/${author.fieldValue}`}>
              <div className={styles.authorWrapper}>
                <h2 className="section-heading">
                  {author.fieldValue} ({author.totalCount})
                </h2>
              </div>
            </Link>
          </div>
        ))}
      </section>
    </Layout>
  )
}

export default Authors
