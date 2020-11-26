import React from "react"
import PropTypes from "prop-types"

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            function loadGAonConsent() {
              if (parseInt(navigator.doNotTrack) !== 1 && parseInt(window.doNotTrack) !== 1 && parseInt(navigator.msDoNotTrack) !== 1){
                window.dataLayer = window.dataLayer || [];
                function gtag() { dataLayer.push(arguments); }
                gtag('js', new Date());
                gtag('config', 'G-DP143SBMCB');
                var gascript = document.createElement("script");
                gascript.async = true;
                gascript.src = "https://www.googletagmanager.com/gtag/js?id=G-DP143SBMCB";
                document.getElementsByTagName("head")[0].appendChild(gascript, document.getElementsByTagName("head")[0]);
              }
            }

            if (document.cookie.split(';').filter(item => item.indexOf('gatsby-gdpr-google-analytics=true') >= 0).length) {
                loadGAonConsent();
            }
        `,
        }}/>
        <link rel="preload" href="/fonts/fonts.css" as="font"></link>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
