import React from "react"
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby'
import Layout from "../components/Layout"
import './dev.css'

const DevPage = ({
  data: {
    site,
  },
}) => {

  return (
    <Layout>
      <Helmet>
        <title>{site.siteMetadata.title}</title>
        <meta name="description" content={site.siteMetadata.description} />
      </Helmet>
      <div className="work">
        <div className="developer">
          <h2>Dev:</h2>
          <ul className="work-list">
            <li>
              <a href="https://buenavistalab.com" className="orange">buenavistalab softwares</a>,
            </li>
            <li>
              <a href="https://3d-primitives-experiment.now.sh/" className="orange"> 3D Primitives Experiment</a>,
            </li>
            <li>
              <a href="http://botanicdailydata.com/" className="orange"> botanic daily data</a>,
            </li>
            <li>
              <a href="https://bidaot.com.br/" className="orange"> BIDAOT</a>,
            </li>
            <li>
              <a href="https://zinetrip.site/" className="orange"> zinetrip</a>,
            </li>
            <li>
              <a href="https://instaxmmrs.com/" className="orange"> Instaxmmrs</a>,
            </li>
            <li>
              <a href="https://jessycasilva.work/" className="orange"> Jessyca Creative</a>,
            </li>
            <li>
              <a href="https://manual-customer-success.vercel.app/" className="orange"> Manual Customer Success</a>,
            </li>
            <li>
              <a href="https://fecmt.com.br" className="orange"> FECMT</a>,
            </li>
            <li>
              <a href="https://www.decoskin.com/" className="orange"> DecoSkin</a>,
            </li>
            <li>
              <a href="https://ffwd-site.netlify.app/" className="orange"> FFWD</a>,
            </li>
            <li>
              <a href="https://santacontabilidade.com.br" className="orange"> Santa Contabilidade</a>,
            </li>
            <li>
              <a href="https://loja.bblend.com.br/capsulas-alcool-skol-beats-gintonic-spritz" className="orange"> Brastemp B.blend Drinks</a>,
            </li>
            <li>
              <a href="https://loja.bblend.com.br/maquinas" className="orange"> Brastemp B.blend Máquinas</a>,
            </li>
            <li>
              <a href="https://badcompany.io/" className="orange"> badcompany</a>,
            </li>
            <li>
              <a href="https://spdwd.vercel.app/" className="orange"> <span role="img" aria-label="delicious">🚴🏾</span></a>,
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
            <li>
              <a href="https://boilerplate-p5js-react.vercel.app/" className="orange"> noise</a>,
            </li>
            <li>
              <a href="https://music-js.vercel.app/" className="orange"> music</a>,
            </li>
            <li>
              <a href="https://chatnilson.vercel.app/" className="orange"> Chat Bot</a>,
            </li>
            <li>
              <a href="https://spotz-car.vercel.app/" className="orange"> Find Your Car</a>,
            </li>
            <li>
              <a href="https://githubstarsapp.vercel.app/" className="orange"> GitHubStars</a>,
            </li>
            <li>
              <a href="https://myfavoritesapp.vercel.app/" className="orange"> <span role="img" aria-label="delicious">⭐</span>My Favorites<span role="img" aria-label="delicious">⭐</span></a>,
            </li>
            <li>
              <a href="https://wogofilmes.com.br/" className="orange"> WOGO Filmes</a>,
            </li>
            <li>
              <a href="https://productlab.com.br/" className="orange"> ProductLab</a>,
            </li>
          </ul>
        </div>
        <div className="back-home">
          <Link to="/">⇦ back home</Link>
        </div>
      </div>
    </Layout>
  )
}

export default DevPage
export const pageQuery = graphql`
  query devPageQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`
