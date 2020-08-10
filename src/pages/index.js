import React from "react"
import Helmet from 'react-helmet';
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import PostLink from "../components/post-link"
import About from "../components/about"

const IndexPage = ({
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
      <div className="site-wrapper">
        <Helmet>
          <title>{site.siteMetadata.title}</title>
          <meta name="description" content={site.siteMetadata.description} />
        </Helmet>
        <header>
        </header>
        <About />
        <div className="work">
          <div className="developer">
            <h2>Dev:</h2>
            <ul className="work-list">
              <li>
                <a href="https://3d-primitives-experiment.now.sh/" className="orange">3D Primitives Experiment</a>,
              </li>
              <li>
                <a href="https://instaxmmrs.com/" className="orange"> Instaxmmrs</a>,
              </li>
              <li>
                <a href="https://jessycasilva.net/" className="orange"> Jessyca Creative</a>,
              </li>
              <li>
                <a href="https://www.decoskin.com/" className="orange"> DecoSkin</a>,
              </li>
              <li>
                <a href="https://ffwd-site.netlify.app/" className="orange"> FFWD</a>,
              </li>
              <li>
                <a href="https://santacontabilidade-site-blog.netlify.app/" className="orange"> Santa Contabilidade Site/Blog</a>,
              </li>
              <li>
                <a href="https://pagina-de-materiais.netlify.app/" className="orange"> Santa Contabilidade LP</a>,
              </li>
              <li>
                <a href="https://loja.bblend.com.br/capsulas-alcool-skol-beats-gintonic-spritz" className="orange"> Brastemp B.blend Drinks/B.blend Máquinas</a>,
              </li>
              <li>
                <a href="https://speedweed.vercel.app" className="orange"> <span role="img" aria-label="delicious">🚴🏾</span></a>,
              </li>
              <li>
                <a href="https://saulofilho.github.io/laughed-a-lot/" className="orange"> LOL Generator</a>,
              </li>
              <li>
                <a href="https://saulofilho.github.io/photos/" className="orange"> Photos</a>,
              </li>
              <li>
                <a href="https://saulofilho.github.io/virose/" className="orange"> Virose</a>,
              </li>
              <li>
                <a href="https://saulofilho.github.io/TerrainGenerator/" className="orange"> Terrain Generator</a>,
              </li>
              {/* <li>
                <a href="https://saulofilho.github.io/Polar-Perlin-Noise-Loops/" className="orange">Polar Perlin Noise Loops</a>
              </li> */}
              <li>
                <a href="https://saulofilho.github.io/SANDPILES/" className="orange"> Sandpiles</a>,
              </li>
              {/* <li>
                <a href="https://saulofilho.github.io/TheSexySoundOfTheLaundryMachine/" className="orange">
                  <span role="img" aria-label="delicious">
                    😋
                  </span>
                </a>
              </li> */}
              <li>
                <a href="./TheCyberPlant" className="orange"> The Cyber Plant</a>,
              </li>
              <li>
                <a href="https://the-world-of-infos.now.sh/" className="orange"> The World of Infos</a>,
              </li>
              <li>
                <a href="https://move-glitch.now.sh/" className="orange"> move glitch</a>,
              </li>
              <li>
                <a href="https://draw-canvas.now.sh/" className="orange"> Draw Me Like One of Your French Girls beta</a>,
              </li>
              <li>
                <a href="https://ubook-desafio.now.sh/" className="orange"> Ubook</a>,
              </li>
              <li>
                <a href="https://ghibli-api-connect.now.sh/" className="orange"> Ghibli</a>,
              </li>
              <li>
                <a href="https://react-huntweb-tutorial.netlify.app/" className="orange"> HuntWeb</a>,
              </li>
              <li>
                <a href="https://gb-app-react.now.sh/" className="orange"> gb app beta</a>,
              </li>
              <li>
                <a href="https://saas-app.now.sh/" className="orange"> SaaS App</a>,
              </li>
              <li>
                <a href="https://ong-app.now.sh/" className="orange"> ong app beta</a>,
              </li>
              <li>
                <a href="https://uploadappreact.herokuapp.com/" className="orange"> img ➯ link app</a>,
              </li>
              <li>
                <a href="https://animated-moving.now.sh/" className="orange"> follow the mouse</a>,
              </li>
              <li>
                <a href="https://search-movie-app-one.now.sh/" className="orange"> Movie Poster beta</a>,
              </li>
              <li>
                <a href="https://search-git-user-app.now.sh/" className="orange"> GitUser App</a>,
              </li>
              <li>
                <a href="https://rs-react-app.now.sh/" className="orange"> Find Repo</a>,
              </li>
            </ul>
          </div>
          <div className="mad-man">
            <h2>Ad:</h2>
            <div className="list">
              <ul className="work-list">
                {Posts}
              </ul>
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
