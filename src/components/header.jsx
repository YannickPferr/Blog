import React from "react"
//import { Link, useStaticQuery } from "gatsby"
import { graphql, Link, useStaticQuery } from "gatsby"
//import { FaInstagram, FaTwitter } from "react-icons/fa"

import styles from "./header.module.scss"

const Header = ({ indexPage }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          logoTitle
          social {
            instagram
            twitter
          }
        }
      }
    }
  `)

  const children = <header className={styles.header}>
    <nav className={styles.navMain}>
      <span>
        <Link to="/" className={styles.navHomeLink}>
          {data.site.siteMetadata.logoTitle}
        </Link>
      </span>

      <div className={styles.navItemList}>
        <Link
          to="/blog"
          className={styles.navItem}
          activeClassName={styles.navItemActive}
          partiallyActive={true}
        >
          Blog
      </Link>
        <Link
          to="/about"
          className={styles.navItem}
          activeClassName={styles.navItemActive}
        >
          About
      </Link>
        <Link
          to="/contact"
          className={styles.navItem}
          activeClassName={styles.navItemActive}
        >
          Contact
      </Link>
        {/*<a
        href={`https://www.instagram.com/${data.siteMetadata.siteMetadata.social.instagram}`}
        target="_blank"
        rel="noopener noreferrer"
        className="ml3 ml4-l"
      >
        <FaInstagram className="icon" alt="instagram icon link"/>
      </a>
      <a
        href={`https://www.twitter.com/${data.siteMetadata.siteMetadata.social.twitter}`}
        target="_blank"
        rel="noopener noreferrer"
        className="ml3 ml4-l"
      >
        <FaTwitter className="icon" alt="twitter icon link"/>
      </a>*/}
      </div>
    </nav>
  </header>

  return (
    <>
      {indexPage ? (
          <div className={styles.headerWrapperIndex}>{children}</div>
          ) : (
          <div className={styles.headerWrapper}>{children}</div>
        )}
    </>
  )
}

export default Header
