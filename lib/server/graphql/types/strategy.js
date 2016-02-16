import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString
} from 'graphql';

const strategyType = new GraphQLObjectType({
  name: 'Strategy',
  fields: {
    _id: {type: new GraphQLNonNull(GraphQLString)},
    strategyname: {type: new GraphQLNonNull(GraphQLString)},
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    date: {type: GraphQLString}
  }
});

export default strategyType;
