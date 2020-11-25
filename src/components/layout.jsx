import React from "react"
import CookieConsent from "react-cookie-consent";

import SEO from "./seo"
import Header from "./header"
import Footer from "./footer"

import "../styles/main.scss"
import styles from "./layout.module.scss"
import { Link } from "gatsby";

const Layout = props => {
  const { children, layoutFullWidth, indexPage, blogPost, recipe, title, description, image, author, pathName } = props

  return (
    <>
      <SEO blogPost={blogPost} recipe={recipe} title={title} description={description} image={image} author={author} pathName={pathName} />
      <CookieConsent
        location="bottom"
        buttonText="Accept"
        style={{"alignItems": "center"}}
        contentStyle={{"flex": "auto", "width": "80%"}}
        buttonStyle={{"backgroundColor": "#1f3c88", "color": "white", "borderRadius": "0.25em", "padding": "0.5em"}}
        cookieName="gatsby-gdpr-google-analytics"
        onAccept={() => {
          if (parseInt(navigator.doNotTrack) !== 1 && parseInt(window.doNotTrack) !== 1 && parseInt(navigator.msDoNotTrack) !== 1){
            window.dataLayer = window.dataLayer || [];
            function gtag() { window.dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', 'G-DP143SBMCB');
            var gascript = document.createElement("script");
            gascript.async = true;
            gascript.src = "https://www.googletagmanager.com/gtag/js?id=G-DP143SBMCB";
            document.getElementsByTagName("head")[0].appendChild(gascript, document.getElementsByTagName("head")[0]);
          }
        }}>
        This site uses cookies, including from our partners, to enhance and personalise your experience. Learn more about our cookie policy <Link to="/privacy-policy" className={styles.cookiePolicyText}>here</Link>.
      </CookieConsent>
      <Header indexPage={indexPage}/>
      {layoutFullWidth ? (
        <section className={styles.layout}>{children}</section>
      ) : (
          <section className={styles.layoutNarrow}>{children}</section>
        )}
      <Footer />
    </>
  )
}

export default Layout
