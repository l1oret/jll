import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import { rhythm } from "../utils/typography"

const Footer = () => {
  const data = useStaticQuery(graphql`
    query FooterQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          siteUrl
          social {
            twitter
            github
            linkedIn
          }
        }
      }
    }
  `)

  const { siteUrl, social } = data.site.siteMetadata

  return (
    <footer style={{
        display: `flex`,
        marginTop: rhythm(2.5),
    }}>
      <p>
        <a href={`${social.twitter}`} target="_blank" rel="nofollow noopener noreferrer">
          Twitter
        </a>
        {` - `}
        <a href={`${social.github}`} target="_blank" rel="nofollow noopener noreferrer">
          GitHub
        </a>
        {` - `}
        <a href={`${social.linkedIn}`} target="_blank" rel="nofollow noopener noreferrer">
          LinkedIn
        </a>
        {` - `}
        <a href={`${siteUrl}/rss.xml`} target="_blank" rel="nofollow noopener noreferrer">
          RSS
        </a>        
      </p>
    </footer>
  )
}

export default Footer
