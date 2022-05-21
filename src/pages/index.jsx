import React from "react"
import { graphql, Link } from "gatsby"
import BackgroundImage from 'gatsby-background-image'

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
    return obj.node.featuredImage
  })

  const backgroundImage = [
    `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))`,
    data.heroSectionMarkdown.rightImage.fluid
  ]

  return (
    <Layout layoutFullWidth indexPage title="Home">
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroBanner}>
          <div className={styles.heroImage}>
            <BackgroundImage
              fluid={backgroundImage}
              className={styles.heroImage}
            />
            <div className={styles.heroTextWrap}>
              <h2 className={styles.heroTitle}>{data.heroSectionMarkdown.title}</h2>
              <p className={styles.heroSubtitle}>{data.heroSectionMarkdown.subtitle}</p>
              <Button
                linkUrl={data.heroSectionMarkdown.buttonLink}
                linkText={data.heroSectionMarkdown.buttonText}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Latest Posts */}
      <section className={styles.latestPostsSection}>
        <h2 className="section-heading">Latest Posts</h2>
        <BlogList data={data.latestPosts} />
        <Link to="/blog" className={styles.showAllLink}>
          Show all posts
        </Link>
        <hr></hr>
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
          image={data.aboutSectionMarkdown.image}
          imageFirst={true}
          button={{ text: "Learn More", url: "/about" }}
        />
      </section>
    </Layout>
  )
}

export const query = graphql`
  query {
    latestPosts: allContentfulPost(
      limit: 9
      sort: { fields: createdAt, order: DESC }
    ){
      edges {
        node {
          id
          slug
          title
          author {
            name
          }
          createdAt(formatString: "MMMM Do, YYYY")
          previewText
          tags{
            name
          }
          image {
            fluid (maxWidth: 500, quality: 50) {
              ...GatsbyContentfulFluid_withWebp
            } 
          }
          recipe {
            calories
          }
        }
      }
    }
    

    tagDetails: allContentfulTag(filter: {featured: {eq: true}}){
      edges {
        node {
          name
          featuredImage {
            fluid (maxWidth: 500, quality: 50){
              ...GatsbyContentfulFluid_withWebp
            } 
          }
        }
      }
    }

    heroSectionMarkdown: contentfulHomeBanner  {
      title
      subtitle
      buttonText
      buttonLink
      rightImage {
        fluid(maxWidth: 2500, quality: 50) {
          ...GatsbyContentfulFluid_withWebp
        }
      }
    }

    aboutSectionMarkdown: contentfulAboutContent(order: {eq: 0}) {
      heading
      text {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`

export default IndexPage
