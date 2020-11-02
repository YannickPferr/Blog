const path = require("path")

const { GraphQLBoolean } = require("gatsby/graphql")

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve(
    "./src/templates/blog-post-template.jsx"
  )
  const blogListTemplate = path.resolve(
    "./src/templates/blog-list-template.jsx"
  )
  const blogPostsByTagTemplate = path.resolve(
    "./src/templates/blog-posts-by-tag-template.jsx"
  )
  const blogPostsByAuthorTemplate = path.resolve(
    "./src/templates/blog-posts-by-author-template.jsx"
  )

  const res = await graphql(`
    query {
      postsRemark: allContentfulPost {
        edges {
          node {
            title
            tags {
              name
            }
          }
          next {
            title
          }
          previous {
            title
          }
        }
      }

      tagsGroup: allContentfulPost {
        group(field: tags___name) {
          fieldValue
          totalCount
        }
      }

      authorsGroup:  allContentfulPost {
        group(field: author___name) {
          fieldValue
          totalCount
        }
      }

      siteMetaData: site {
        siteMetadata {
          blogPostsPerPage
        }
      }
    }
  `)

  const posts = res.data.postsRemark.edges
  const postsPerPage = res.data.siteMetaData.siteMetadata.blogPostsPerPage
  const numBlogListPages = Math.ceil(posts.length / postsPerPage)
  const tags = res.data.tagsGroup.group
  const authors = res.data.authorsGroup.group


  // Create blog post detail pages
  // Example: /blog/my-first-post
  posts.forEach(({ node, next, previous }) => {
    createPage({
      component: blogPostTemplate,
      path: `/blog/${node.title}`,
      context: {
        tags: node.tags.map(tag => tag.name),
        slug: node.title,
        prev: next, // prev = next is on purpose. in the context of the blog post template, the next post is the one posted later, not before
        next: previous, // see above comment
      },
    })
  })

  // Create paginated blog listing pages
  // Example: /blog, /blog/2, blog/3, etc
  Array.from({ length: numBlogListPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: blogListTemplate,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages: numBlogListPages,
        currentPage: i + 1,
      },
    })
  })

  // Create paginated blog tag listing pages for each tag
  // Example: /blog/tag/first-tag, /blog/tag/first-tag/2, /blog/tag/second-tag, etc
  tags.forEach(tag => {
    const tagName = tag.fieldValue
    const tagCount = tag.totalCount
    const numTagListPages = Math.ceil(tagCount / postsPerPage)

    Array.from({ length: numTagListPages }).forEach((_, i) => {
      createPage({
        path:
          i === 0 ? `/blog/tags/${tagName}` : `/blog/tags/${tagName}/${i + 1}`,
        component: blogPostsByTagTemplate,
        context: {
          tag: tagName,
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages: numTagListPages,
          currentPage: i + 1,
        },
      })
    })
  })

  // Create paginated blog author listing pages for each author
  // Example: /blog/author/savannah, /blog/author/savannah/2, /blog/author/maya, etc
  authors.forEach(author => {
    const authorName = author.fieldValue
    const authorCount = author.totalCount
    const numAuthorListPages = Math.ceil(authorCount / postsPerPage)

    Array.from({ length: numAuthorListPages }).forEach((_, i) => {
      createPage({
        path:
          i === 0
            ? `/blog/authors/${authorName}`
            : `/blog/authors/${authorName}/${i + 1}`,
        component: blogPostsByAuthorTemplate,
        context: {
          author: authorName,
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages: numAuthorListPages,
          currentPage: i + 1,
        },
      })
    })
  })
}
