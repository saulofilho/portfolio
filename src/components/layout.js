import React from "react"
import { useStaticQuery, graphql } from "gatsby"
// import Navigation from "../components/navigation"
import 'prismjs/themes/prism-okaidia.css';

export default ({ children }) => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )
  return (
    <div className="">
      {/* <header className="site-header">
        <div className="site-title">
          <Link to="/">{data.site.siteMetadata.title}</Link>
        </div>
        <Navigation />
      </header> */}
      {children}
      <footer className="site-footer">
        <p className="warn">
          This World Wide Web generates random backgroundColor & color.
          In case of indistinguishable layout: F5.
          </p>
        <p>
          &copy; 2020 S&S &bull; From Pantanal
          <span role="img" aria-label="alligator"> 🐊 </span>
          to the world
        </p>
        <br/>
        <p>NO PLACE FOR RACISM, HOMOPHOBIA, FASCISM, SEXISM, HATE.</p>
      </footer>
    </div>
  )
}
