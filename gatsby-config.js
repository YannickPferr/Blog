/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

require("dotenv").config();

module.exports = {
  siteMetadata: {
    siteUrl: "https://blog50086.gtsb.io/",
    author: "Yannick Pferr",
    publisher: "Netlify",
    title: "No Calories, No Problem",
    shortTitle: "NCNP",
    description: "No Calories, No Problem is a Blog about low calorie dense food! I want to show you the best recipes to really fill you up while also being delicious. Never be hungry again!",
    image: "/images/logo.jpg",
    bannerImage: "/images/banner.png",
    blogPostsPerPage: 5,
    social: {
      instagram: "",
      twitter: "",
    },
    mailchimpUrl: "",
  },
  plugins: [
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
      },
    },
    "gatsby-plugin-sass",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          // gatsby-remark-relative-images must
          // go before gatsby-remark-images
          {
            resolve: `gatsby-remark-relative-images`,
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 1000
            },
          },
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "noopener",
            },
          },
          {
            resolve: "gatsby-plugin-catch-links",
          },
        ],
      },
    },
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-plugin-feed",
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allContentfulPost } }) => {
              return allContentfulPost.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  custom_elements: [{ "content:encoded": edge.node.content.childMarkdownRemark.html }],
                  date: edge.node.date,
                  description: edge.node.previewText,
                  guid:
                    site.siteMetadata.siteUrl +
                    "/blog/" +
                    edge.node.title,
                  url:
                    site.siteMetadata.siteUrl +
                    "/blog/" +
                    edge.node.title,
                })
              })
            },
            query: `
              {
                allContentfulPost(  
                  limit: $limit
                  skip: $skip
                  sort: { fields: date, order: DESC }
                  ){
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
                      content {
                        childMarkdownRemark{
                          html
                        }
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
    },
    "gatsby-plugin-robots-txt",
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: "", // Google Analytics Tracking ID
    //     head: false,
    //     respectDNT: true,
    //     cookieDomain: "", // Your Domain
    //   },
    // },
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: ["Open Sans", "Rock Salt", "Mansalva", "Lily Script One"],
        },
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        // req props
        name: "No Calories, No Problem",
        short_name: "NCNP",
        start_url: "/",
        background_color: "#fff",
        theme_color: "#9c7c38",
        display: "minimal-ui",
        // optional
        icon: "static/images/logo.jpg",
        include_favicon: false,
      },
    },
    {
      resolve: "gatsby-plugin-offline",
      options: {
        precachePages: ["", "/blog", "/about"],
      },
    },
  ],
}
