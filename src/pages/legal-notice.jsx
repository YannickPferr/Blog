import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

import styles from "./legal-notice.module.scss"

const TermsOfService = ({ data }) => {
  return (
    <Layout title="Legal Notice" pathName="/legal-notice">
      <h1 className="page-heading">Legal Notice</h1>
      <section className={styles.legalNotice}>
            <div dangerouslySetInnerHTML={{ __html: data.markdown.markdownText.childMarkdownRemark.html}} />
      </section>
    </Layout>
  )
}

export const query = graphql`
  query {
    markdown: contentfulMarkdownContainer(name: {eq: "Legal Notice"})  {
      markdownText {
          childMarkdownRemark{
              html
          }
      }
    }
  }
`

export default TermsOfService
