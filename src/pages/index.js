import React from "react"
import Helmet from 'react-helmet';
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import PostLink from "../components/post-link"
// import HeroHeader from "../components/heroHeader"
import About from "../components/about"
import randomColor from "../components/randomColor"

if (typeof window !== 'undefined') {
  randomColor();
}

const IndexPage = ({
  data: {
    site,
    allMarkdownRemark: { edges },
  },
}) => {

  const Posts = edges
    .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />)

  return (
    <Layout>
      <div className="site-wrapper">
        <Helmet>
          <title>{site.siteMetadata.title}</title>
          <meta name="description" content={site.siteMetadata.description} />
          {!site.siteMetadata.w3l_dom_key ? null : <meta name="w3l-domain-verification" content={site.siteMetadata.w3l_dom_key} />}
        </Helmet>
        <header>
          <p className="warn">
            This page generates random backgroundColor & color.
            In case of indistinguishable layout: F5.
          </p>
        </header>
        <About />
        <div className="work">
          <div className="developer">
            <h2>Developer:</h2>
            <ul className="work-list">
              <li>
                <a href="https://torus-app.now.sh" className="orange">Torus Experiment</a>
              </li>
              <li>
                <a href="https://instaxmmrs.com/" class="orange">Instaxmmrs</a>
              </li>
              <li>
                <a href="https://www.decoskin.com/" class="orange">DecoSkin</a>
              </li>
              <li>
                <a href="https://loja.bblend.com.br/capsulas-alcool-skol-beats-gintonic-spritz" class="orange">Brastemp B.blend Drinks; Máquinas</a>
              </li>
              <li>
                <a href="https://saulofilho.github.io/speedweed.bike/" class="orange">
                <span role="img" aria-label="delicious">
                  🚴🏾
                </span>
                </a>
              </li>
              <li>
                <a href="https://saulofilho.github.io/laughed-a-lot/" className="orange">LOL Generator</a>
              </li>
              <li>
                <a href="https://saulofilho.github.io/photos/" className="orange">Photos</a>
              </li>
              <li>
                <a href="https://saulofilho.github.io/virose/" className="orange">Virose</a>
              </li>
              <li>
                <a href="https://saulofilho.github.io/TerrainGenerator/" className="orange">Terrain Generator</a>
              </li>
              <li>
                <a href="https://saulofilho.github.io/Polar-Perlin-Noise-Loops/" className="orange">Polar Perlin Noise Loops</a>
              </li>
              <li>
                <a href="https://saulofilho.github.io/SANDPILES/" className="orange">Sandpiles</a>
              </li>
              <li>
                <a href="https://saulofilho.github.io/TheSexySoundOfTheLaundryMachine/" className="orange">
                  <span role="img" aria-label="delicious">
                    😋
                  </span>
                </a>
              </li>
              <li>
                <a href="./TheCyberPlant" className="orange">The Cyber Plant</a>
              </li>
              <li>
                <a href="https://the-world-of-infos.now.sh/" className="orange">The World of Infos</a>
              </li>
              <li>
                <a href="https://move-glitch.now.sh/">move glitch</a>
              </li>
              <li>
                <a href="https://draw-canvas.now.sh/">Draw Me Like One of Your French Girlsbeta</a>
              </li>
              <li>
                <a href="https://ubook-desafio.now.sh/">Ubook</a>
              </li>
              <li>
                <a href="https://api-connect-ghibli.herokuapp.com/index.html">Ghibli Page</a>
              </li>
              <li>
                <a href="https://react-huntweb-tutorial.netlify.app/">HuntWeb</a>
              </li>
              <li>
                <a href="https://gb-app-react.now.sh/">GB</a>
              </li>
              <li>
                <a href="https://sas-app.now.sh/">SaaS App</a>
              </li>
              <li>
                <a href="https://uploadappreact.herokuapp.com/">img ➯ link App</a>
              </li>
              <li>
                <a href="https://animated-moving.now.sh/">follow the mouse</a>
              </li>
              <li>
                <a href="./tutoriais" className="orange">tutorials</a>
              </li>
            </ul>
          </div>
          <div className="mad-man">
            <h2>Mad Man:</h2>
            <div classNameName="list">
              {Posts}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
export const pageQuery = graphql`
  query indexPageQuery {
    site {
      siteMetadata {
        title
        description
        w3l_dom_key
      }
    }
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
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
