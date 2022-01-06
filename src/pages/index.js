import React from "react"
import Helmet from 'react-helmet';
import { graphql } from 'gatsby'
import About from "../components/About"
import FooterWrapper from '../components/Footer'

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
      <FooterWrapper />
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
