import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Helmet from "react-helmet"

import styles from "./privacy-policy.module.scss"

const PrivacyPolicy = ({ data }) => {
  return (
    <Layout title="Privacy Policy" pathName="/privacy-policy">
        <Helmet>
          <meta name="robots" content="noindex"/>
        </Helmet>
        <h1 className="page-heading">Privacy Policy</h1>
        <section className={styles.privacyPolicy}>
            <div dangerouslySetInnerHTML={{ __html: data.markdown.markdownText.childMarkdownRemark.html}} />
        </section>
    </Layout>
  )
}

export const query = graphql`
  query {
    markdown: contentfulMarkdownContainer(name: {eq: "Privacy Policy"})  {
      markdownText {
          childMarkdownRemark{
              html
          }
      }
    }
  }
`

export default PrivacyPolicy
