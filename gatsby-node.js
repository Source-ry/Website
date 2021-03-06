const path = require('path');


exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  // Sometimes, optional fields tend to get not picked up by the GraphQL
  // interpreter if not a single content uses it. Therefore, we're putting them
  // through `createNodeField` so that the fields still exist and GraphQL won't
  // trip up. An empty string is still required in replacement to `null`.
  switch (node.internal.type) {
  default: break;
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allStrapiPage {
        edges {
          node {
            name
            hasWidgets
            banner {
              childImageSharp {
                original {
                  src
                }
              }
              childVideoFfmpeg {
                transcode {
                  src
                }
              }
            }
            url
            enabled
            translations {
              title
              body
              language
            }
            template
            partner {
              basicInfo
              name
              url
            }
          }
        }
      }
      allStrapiPartner {
        edges {
          node {
            name
            url
            logo {
              childImageSharp {
                original {
                  src
                }
              }
            }
            basicInfo
            accentColor
          }
        }
      }
    }
  `);
  
  for (const { template, enabled, url } of result.data.allStrapiPage.edges.map(edge => edge.node)) {
    if (!enabled)
      continue;
    createPage({
      path: url,
      component: path.resolve(`./src/templates/${template ?? 'page'}.tsx`),
      context: {
        url: url
      }
    });
  }
};
