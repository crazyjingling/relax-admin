import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

const strategyInputType = new GraphQLInputObjectType({
  name: 'StrategyInput',
  fields: {
    _id: {type: GraphQLString},
    strategyname: {type: new GraphQLNonNull(GraphQLString)},
    name: { type: GraphQLString },
    password: { type: GraphQLString },
    email: { type: GraphQLString },
    date: {type: GraphQLString}
  }
});

export default strategyInputType;
