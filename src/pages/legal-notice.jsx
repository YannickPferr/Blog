import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Helmet from "react-helmet"

import styles from "./legal-notice.module.scss"

const LegalNotice = ({ data }) => {
  return (
    <Layout title="Legal Notice" pathName="/legal-notice">
      <Helmet>
          <meta name="robots" content="noindex"/>
      </Helmet>
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

export default LegalNotice
