import React from "react"
import Helmet from 'react-helmet';
import { graphql } from 'gatsby'
import About from "../components/About"

const IndexPage = ({
  data: {
    site,
  },
}) => {
  return (
    <>
      <Helmet>
        <title>{site.siteMetadata.title}</title>
        <meta name="description" content={site.siteMetadata.description} />
      </Helmet>
      <About />
    </>
  )
}

export default IndexPage
export const pageQuery = graphql`
  query indexPageQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`
