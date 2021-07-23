const axios = require('axios');

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema
} = require('graphql');


const COUNTRYTYPE = new GraphQLObjectType({
  name: 'Country',
  fields: () => ({
    name: { type: GraphQLString },
    native: { type: GraphQLString },
    capital: { type: GraphQLString },
    emoji: { type: GraphQLString },
    currency: { type: GraphQLString },
    phone: { type: GraphQLString },
    continent: { type: GraphQLString }
  })
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    countries: {
      type: new GraphQLList(COUNTRYTYPE),
      resolve(parent, args) {
        return axios
          .get('https://countries.trevorblades.com/')
          .then(res => res.data);
      }
    },
    country: {
      type: COUNTRYTYPE,
      args: {
        code: { type: GraphQLString }
      },
      resolve(parent, args) {
        return axios
          .get(`https://countries.trevorblades.com/${args.code}`)
          .then(res => res.data);
      }
    },
      
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
