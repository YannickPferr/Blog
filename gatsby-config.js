/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

require("dotenv").config();

module.exports = {
  siteMetadata: {
    siteUrl: "https://www.fillingfoodspot.com",
    author: "Yannick Pferr",
    publisher: "Netlify",
    title: "The Filling Food Spot ",
    logoTitle: "the FILLING FOOD spot",
    description: "The Filling Food Spot is a Blog about low calorie dense food! I want to show you the best recipes to really fill you up while also being delicious.",
    image: "/images/logo.png",
    bannerImage: "/images/banner.png",
    blogPostsPerPage: 9,
    social: {
      instagram: "",
      twitter: "",
    },
    mailchimpUrl: "https://gmail.us2.list-manage.com/subscribe/post?u=4496257eb2519fb7538da613f&amp;id=3811aa9127",
    commentsServerUrl: "https://oydzowvwze.execute-api.eu-central-1.amazonaws.com/dev"
  },
  plugins: [
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
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
            resolve: "gatsby-remark-relative-images",
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
    /*{
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
                  sort: { fields: createdAt, order: DESC }
                  ){
                  edges {
                    node {
                      title
                      author {
                        name
                      }
                      createdAt
                      previewText
                      tags{
                        name
                      }
                      content {
                        json
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
    },*/
    {
      resolve: "gatsby-plugin-sitemap",
    },
    "gatsby-plugin-robots-txt",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        // req props
        name: "The Filling Food Spot",
        short_name: "Filling Food Spot",
        start_url: "/",
        background_color: "#fff",
        theme_color: "#ee6f57",
        display: "minimal-ui",
        // optional
        icon: "static/images/logo.png",
        include_favicon: false,
      },
    },
    "gatsby-plugin-preact",
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: "Rock Salt",
              fontDisplay: 'swap',
              strategy: 'selfHosted'
            }
          ],
        },
        formats: ['woff2', 'woff'],
        useMinify: true,
        usePreload: true,
      },
    },
    `gatsby-plugin-netlify`,
    'gatsby-plugin-remove-serviceworker'
  ],
}
