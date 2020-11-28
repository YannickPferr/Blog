import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import AboutContent from "../components/about-content"

import styles from "./about.module.scss"

const AboutPage = ({ data }) => {
  return (
    <Layout title="About" pathName="/about">
      <h1 className="page-heading">About</h1>

      <div className={styles.mainSectionWrapper}>
        {
          data.aboutSections.edges.map(obj => {
            return <AboutContent
              key={obj.node.id}
              heading={obj.node.heading}
              copy={obj.node.text.childMarkdownRemark.html}
              image={obj.node.image}
              imageAlt={obj.node.imageAlt}
            />;
          })
        }
      </div>

      <section className={styles.finalSectionWrapper}>
        <div>
          <h2 className="section-heading">{data.aboutSectionFinal.heading}</h2>
          {data.aboutSectionFinal.footerText &&
            <div
              dangerouslySetInnerHTML={{
                __html: data.aboutSectionFinal.footerText.childMarkdownRemark.html,
              }}
            ></div>}
        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query {
    aboutSections: allContentfulAboutContent(sort: {fields: order}, filter: {order: {gt: 0}})  {
      edges{
        node{
          id
          heading
          image{
            fluid(maxWidth: 500, quality: 50) {
              ...GatsbyContentfulFluid_withWebp
            }
          } 
          text {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }

    aboutSectionFinal: contentfulAboutFooter  {
      heading
    }
  }
`

export default AboutPage
