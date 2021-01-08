module.exports = {
  siteMetadata: {
    title: `Saulo Filho, Full Stack Javascript Developer`,
    description: `Full Stack Javascript Developer`,
    siteUrl: `https://saulofilho.com`,
    home: {
      title: `Hi! I'm Saulo Filho`,
      description: `Olá. :)

      My name is Saulo Filho. I'm a Creative Full Stack Javascript Developer.

      I used to be (10+ years) a Creative Marketing Professional, writing to
      advertising and content.
      Cinema, music and entertainment scripts as well.

      Since 2017, I have been working with HTML5, CSS3, Vanilla/ECMA, Node,
      Processing, and tools like SASS, React, Gatsby, Next, React Native/Expo,
      Redux, Adonis, Jest, Storybook, P5, Git, Webpack, Gulp, Docker, Regex,
      JSONt, Markdown, CLI, JAMStack, MERNStack, GraphQL, SQL (MySQL, SQLite, Pstgres),
      NoSQL (MongoDB), CMS (WordPress, VTEX, Squarespace, Netlify CMS).

      I spend some time having fun with generative art, and making robots,
      with Arduino and IoT.`,
    }
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
        name: `Saulo Filho, Full Stack Javascript Developer`,
        short_name: `saulofilho`,
        start_url: `/`,
        background_color: `rgb(127, 246, 27`,
        theme_color: `rgb(127, 246, 27)`,
        display: `minimal-ui`,
        icon: `static/assets/torus-icon.png`,
      }
    },
    'gatsby-plugin-offline',
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
        trackingId: "UA-116546328-1",
        head: true,
      }
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-netlify-cms`,
    'gatsby-plugin-dark-mode'
  ],
}
