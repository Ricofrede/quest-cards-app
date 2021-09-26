'use strict';

const axios = require('axios')

const query = `
query getAll
  {
    classes{
      slug
      title
      description
      image
      language
      quick_start{
        slug
        title
        order_in_path
        description
        roll_dice
        Effect{
          id
          description
          cost
        }
      }
      paths (sort: "createdAt"){
        title
        slug
        abilities (sort: "order_in_path"){
          slug
          title
          order_in_path
          description
          roll_dice
          Effect{
            id
            description
            cost
          }
        }
      }
    }
    portugueseTranslation{
      LabelTranslation{
        label
        translation{
          en
          pt_BR
        }
      }
    }
  }
`

/**
 * quest-export.js controller
 *
 * @description: A set of functions called "actions" of the `quest-export` plugin.
 */

module.exports = {

  /**
   * Default action.
   *
   * @return {Object}
   */

  index: async (ctx) => {
    // Add your own logic here.
    let data

    const result = await axios({
      url: 'http://localhost:1337/graphql',
      method: 'POST',
      data: {
        query: query,
      }
    }).then( res => {
      data = res && res.data && res.data.data
    })

    return data
  }
};
