import React from "react"
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby'
import Layout from "../components/Layout"
import PostLink from "../components/PostLink"
import './ad.css'

const AdPage = ({
  data: {
    site,
    allMarkdownRemark: { edges },
  },
}) => {

  const Posts = edges
    .filter(edge => !!edge.node.frontmatter.date)
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />)

  return (
    <Layout>
      <Helmet>
        <title>{site.siteMetadata.title}</title>
        <meta name="description" content={site.siteMetadata.description} />
      </Helmet>
      <div className="work">
        <div className="mad-man">
          <h2>Ad:</h2>
          <div className="list">
            <ul className="work-list">
              {Posts}
            </ul>
          </div>
        </div>
        <div className="back-home">
          <Link to="/">⇦ back home</Link>
        </div>
      </div>
    </Layout>
  )
}

export default AdPage
export const pageQuery = graphql`
  query adPageQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { order: ASC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
            thumbnail
          }
        }
      }
    }
  }
`
