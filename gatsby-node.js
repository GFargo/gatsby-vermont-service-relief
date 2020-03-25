const slugify = require("limax");

exports.onCreateNode = function onCreateNode({ actions, getNode, node }) {

  console.log('Creating Node', node.internal);
  
  if (node.internal.type === `Airtable` && node.data.Category) {

    const category = node.data.Category;
    actions.createNodeField({
      node,
      name: `slug`,
      value: slugify(category)
    });
  }
};
