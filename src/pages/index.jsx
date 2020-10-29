import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import Button from "../components/button"
import BlogList from "../components/blog-list"
import FeaturedTagList from "../components/featured-tag-list"
import EmailSignup from "../components/email-signup"
import AboutContent from "../components/about-content"

import styles from "./index.module.scss"

const IndexPage = ({ data }) => {
  // Create sublist of featured tags where feature flag is set and a valid image is present
  let featuredTags = data.tagDetails.edges.filter(obj => {
    return obj.node.featured === true && obj.node.featuredImage
  })
  console.log(featuredTags)

  return (
    <Layout layoutFullWidth title="Home">
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroColumnFirst}>
          <Img
            fluid={
              data.heroSectionMarkdown.leftImage
                .fluid
            }
            alt={data.heroSectionMarkdown.leftImageAlt}
          />
        </div>
        <div className={styles.heroColumnSecond}>
          <h1 className={styles.heroTitle}>
            {data.heroSectionMarkdown.title}
          </h1>
          <p className={styles.heroSubtitle}>
            {data.heroSectionMarkdown.subtitle}
          </p>
        </div>
        <div className={styles.heroColumnThird}>
          <Img
            fluid={
              data.heroSectionMarkdown.rightImage
                .fluid
            }
            alt={data.heroSectionMarkdown.rightImageAlt}
          />
        </div>
      </section>

      {/* Main Feature*/}
      <section className={styles.mainFeatureSection}>
        <h2 className="section-heading">
          {data.mainFeatureSectionMarkdown.heading}
        </h2>
        <div
          dangerouslySetInnerHTML={{
            __html: data.mainFeatureSectionMarkdown.content.childMarkdownRemark.html,
          }}
        ></div>
        <Button
          linkUrl={data.mainFeatureSectionMarkdown.linkUrl}
          linkText={data.mainFeatureSectionMarkdown.linkText}
        />
      </section>

      {/* Latest Posts */}
      <section className={styles.latestPostsSection}>
        <h2 className="section-heading">Latest Posts</h2>
        <BlogList data={data.latestPosts} />
      </section>

      {/* Featured Tags */}
      <section className={styles.featuredTagsSection}>
        <FeaturedTagList tags={featuredTags} />
      </section>

      {/* Subscribe */}
      <section className={styles.subscribeSection}>
        <EmailSignup />
      </section>

      {/* About Me Blurb */}
      <section className={styles.aboutMeSection}>
        <AboutContent
          heading={data.aboutSectionMarkdown.heading}
          copy={data.aboutSectionMarkdown.text.childMarkdownRemark.html}
          image={
            data.aboutSectionMarkdown.image.fluid
          }
          imageAlt={data.aboutSectionMarkdown.imageAlt}
          imageFirst={true}
          button={{ text: "Read More", url: "/about" }}
        />
      </section>
    </Layout>
  )
}

export const query = graphql`
  query {
    latestPosts: allContentfulPost{
      edges {
        node {
          title
          author {
            name
          }
          date
          previewText
          tags{
            name
          }
          image {
            fluid(maxWidth: 750, quality: 75) {
              base64
              aspectRatio
              src
              srcSet
              srcWebp
              srcSetWebp
              sizes
            } 
          }
        }
      }
    }
    

    tagDetails: allContentfulTag{
      edges {
        node {
          name
          featured
          featuredImage {
            fluid(maxWidth: 800, quality: 90) {
              base64
              aspectRatio
              src
              srcSet
              srcWebp
              srcSetWebp
              sizes
            } 
          }
        }
      }
    }

    heroSectionMarkdown: contentfulHomeBanner  {
      title
      subtitle
      leftImage{
        fluid(maxWidth: 800, quality: 90) {
          base64
          aspectRatio
          src
          srcSet
          srcWebp
          srcSetWebp
          sizes
        }
      } 
      rightImage {
        fluid(maxWidth: 800, quality: 90) {
          base64
          aspectRatio
          src
          srcSet
          srcWebp
          srcSetWebp
          sizes
        }
      }
    }

    mainFeatureSectionMarkdown: contentfulFeature{
      heading
      linkUrl
      linkText 
      content {
        childMarkdownRemark {
          html
        }
      }
    }

    aboutSectionMarkdown: contentfulAboutContent  {
      heading
      image{
        fluid(maxWidth: 800, quality: 90) {
          base64
          aspectRatio
          src
          srcSet
          srcWebp
          srcSetWebp
          sizes
        }
      } 
      text {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`

export default IndexPage
