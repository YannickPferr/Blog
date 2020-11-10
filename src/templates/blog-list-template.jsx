import React, { useState } from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import BlogList from "../components/blog-list"
import PrevNext from "../components/prev-next"
import Search from "../components/search"

import styles from "./blog-list-template.module.scss"

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allPosts: allContentfulPost(  
      limit: $limit
      skip: $skip
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

    index: allContentfulPost{
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
  }
`

const BlogListTemplate = ({ data, pageContext }) => {
  const { currentPage, numPages } = pageContext
  const allPosts = data.allPosts
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage =
    currentPage - 1 === 1 ? "/blog" : "/blog/" + (currentPage - 1).toString()
  const nextPage = "/blog/" + (currentPage + 1).toString()

  const emptyQuery = ""

  const [state, setState] = useState({
    filteredData: {},
    query: emptyQuery,
  })

  const handleInputChange = event => {
    const query = event.target.value.toLowerCase()

    const filteredArr = data.index.edges.filter(edge => 
      edge.node.title.toLowerCase().includes(query) || edge.node.previewText.toLowerCase().includes(query)
    )

    setState({
      query, // with current query string from the `Input` event
      filteredData: {
        edges: filteredArr, // with filtered data from posts.filter(post => (//filteredData)) above
      }
    })
  }

  const { filteredData, query } = state
  const hasSearchResults = filteredData.edges && query !== emptyQuery
  const posts = hasSearchResults ? filteredData : allPosts

  const prevDetails = isFirst
    ? null
    : hasSearchResults 
    ? null
    : {
      linkPath: prevPage,
      linkText: "Previous Page",
    }

  const nextDetails = isLast
    ? null
    : hasSearchResults
    ? null
    : {
      linkPath: nextPage,
      linkText: "Next Page",
    }
 
  return (
    <Layout title={`Blog - Page ${currentPage}`} pathName="/blog">
      <header className={styles.header}>
        <h1 className={styles.title}>Blog</h1>
      </header>
      <Search inputChangeFunction={handleInputChange} />
      <BlogList data={posts} />
      <PrevNext prevDetails={prevDetails} nextDetails={nextDetails} />
    </Layout>
  )
}

export default BlogListTemplate
