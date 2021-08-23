module.exports = {
  siteMetadata: {
    title: `Saulo Filho, Software Engineer`,
    description: `Javascript, Ruby, Python, Processing && IoT`,
    siteUrl: `https://saulofilho.com`,
    home: {
      title: `Olá! My name is Saulo Filho. I'm a Software Engineer.`,
      description: `Javascript, Ruby, Python, Processing && IoT`
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
        name: `Saulo Filho, Software Engineer`,
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
