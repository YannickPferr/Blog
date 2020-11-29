import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import { FaInstagram, FaTwitter } from "react-icons/fa"

import styles from "./footer.module.scss"

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          logoTitle
          social {
            instagram
            twitter
          }
          mailchimpUrl
        }
      }
    }
  `)

  return (
    <div className={styles.footerWrapper}>
      <footer className={styles.footer}>
        <div className={styles.footerRowContent}>
          <div className={styles.footerColumnName}>
            <span className={styles.name}>{data.site.siteMetadata.logoTitle}</span>
          </div>
          <div className={styles.footerColumnLinks}>
            <Link to="/" className={styles.navItem}>
              Home
          </Link>
            <Link to="/blog" className={styles.navItem}>
              Blog
          </Link>
            <Link to="/about" className={styles.navItem}>
              About
          </Link>
            <Link to="/contact" className={styles.navItem}>
              Contact
          </Link>
            <hr />
          </div>
          <div className={styles.footerColumnSocial}>
            <a
              href={`https://www.instagram.com/${data.site.siteMetadata.social.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="icon" alt="instagram icon link" />
            </a>
            <a
              href={`https://www.twitter.com/${data.site.siteMetadata.social.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="icon" alt="twitter icon link" />
            </a>
          </div>
        </div>
        <div className={styles.footerRow}>
          <div className={styles.metaLinks}>
            {/*<a
              href={data.site.siteMetadata.mailchimpUrl}
              target="__blank"
              className="nav-link mh3"
            >
              Subscribe
            </a>
            |
            <a href="/rss.xml" className="nav-link mh3">
              RSS
            </a>
            | */}
            <a href="/sitemap.xml">
              Sitemap
            </a>
            |
            <a href="/legal-notice">
              Legal Notice
            </a>
            |
            <a href="/privacy-policy">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
