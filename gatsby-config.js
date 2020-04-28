/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: `Saulo Filho, Creative Full Stack Developer`,
    description: `Creative Full Stack Developer`,
    siteUrl: `https://saulofilho-portfolio.netlify.app/`,
    home: {
      title: `Hi! I'm Saulo Filho`,
      description: `Olá. :)

      My name is Saulo Filho. I'm a Creative Full Stack Javascript Developer.

      I used to be (10+ years) a Creative Marketing Professional, writing to advertising and content.
      Cinema, music and entertainment scripts as well.

      Nowadays, I have been working with HTML5, CSS3, Vanilla/ECMA, Node, Processing, and tools like SASS, React, Gatsby, Next, React Native/Expo, Redux, Adonis, Jest, Storybook, P5, Git, Webpack, Gulp, Docker, Regex, JSONt, Markdown, CLI, JAMStack, MERNStack, GraphQL, SQL (MySQL, SQLite, Pstgres), NoSQL (MongoDB), CMS (WordPress, VTEX, Squarespace, Netlify CMS).

      I spend some time having fun with generative art, and making robots, with Arduino and IoT.`,
    },
    /* W3Layouts domain verification key for contact forms https://my.w3layouts.com/Forms/ */
    w3l_dom_key: `5e609f7a2d23fCF_Domain_verify`
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/_data`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Saulo Filho, Creative Full Stack Developer`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `rgb(127, 246, 27`,
        theme_color: `rgb(127, 246, 27`,
        display: `minimal-ui`,
        icon: `static/assets/torus-icon.png`, // This path is relative to the root of the site.
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [{
          resolve: `gatsby-remark-prismjs`,
          options: {
            classPrefix: "language-",
            inlineCodeMarker: null,
            aliases: {},
            showLineNumbers: false,
            noInlineHighlight: false,
          },
        },
        {
          resolve: 'gatsby-remark-emojis',
        }],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: "UA-30027142-1",
        head: true,
      }
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-netlify-cms`,
    'gatsby-plugin-dark-mode'
  ],
}
