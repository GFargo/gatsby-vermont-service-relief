require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
  siteMetadata: {
    title: process.env.COMMUNITY ? `${process.env.COMMUNITY} Service Relief` : `{COMMUNITY} Service Relief`,
    description: `A list of local service-industry businesses and their fundraisers to help them get through the local shutdowns.`,
    siteUrl: 'https://vermontservicerelief.com',
    authorName: `@TraceNetwork`,
    authorLink: `https://tracevt.com`,
    community: process.env.COMMUNITY || `{COMMUNITY}`,
    formId: process.env.AIRTABLE_EMBED_ID
  },
  plugins: [
    `gatsby-plugin-postcss`,
    'gatsby-plugin-webpack-size',
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.AIRTABLE_API_KEY,
        tables: [
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: process.env.AIRTABLE_TABLE_NAME
          }
        ]
      }
    },
    {
      resolve: 'gatsby-source-mathdroid-covid19',
      options: {
        countries: [{ iso2: 'US' }],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: require.resolve(`./src/images/heart.png`)
      }
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Bungee`
          }
        ]
      }
    },
    `gatsby-plugin-preload-fonts`,
    `gatsby-plugin-preact`,
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: process.env.gatsby_log_level === `verbose`,
        develop: process.env.NODE_ENV !== `production`,
        purgeOnly: ['src/css/style.css'],
        tailwind: true,
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: 'gatsby-plugin-netlify-cache',
      options: {
        extraDirsToCache: ['public/static', 'public/google-fonts'],
      },
    },
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        headers: {}, // option to add more headers. `Link` headers are transformed by the below criteria
        allPageHeaders: [], // option to add headers for all pages. `Link` headers are transformed by the below criteria
        mergeSecurityHeaders: true, // boolean to turn off the default security headers
        mergeLinkHeaders: true, // boolean to turn off the default gatsby js headers
        mergeCachingHeaders: true, // boolean to turn off the default caching headers
        transformHeaders: (headers, path) => headers, // optional transform for manipulating headers under each path (e.g.sorting), etc.
        generateMatchPathRewrites: true, // boolean to turn off automatic creation of redirect rules for client only paths
      },
    },
  ]
};