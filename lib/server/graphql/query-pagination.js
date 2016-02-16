import forEach from 'lodash.foreach';
import {
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType
} from 'graphql';

import filterType from './types/filter';

export const paginationQueryArgs = {
  sort: {
    name: 'sort',
    type: GraphQLString
  },
  order: {
    name: 'order',
    type: GraphQLString
  },
  limit: {
    name: 'limit',
    type: GraphQLInt
  },
  filters: {
    name: 'filters',
    type: new GraphQLList(filterType)
  },
  page: {
    name: 'page',
    type: GraphQLInt
  },
  search: {
    name: 'search',
    type: GraphQLString
  },
  s: {
    name: 's',
    type: GraphQLString
  }
};

function parseFilterOperation (op) {
  const result = {};
  forEach(op, (value, key) => {
    result['$' + key] = value;
  });
  return result;
}

export function searchQuery (find, params) {
  const and = [];
  console.log('=================================find,params', find, params);
  // Search
  if (params.search && params.s && params.search.constructor !== Array) {
    console.log('=================================1', 1);
    and.push({
      [params.search]: new RegExp('.*' + params.s, 'i')
    });
  }
  console.log('=================================and1', and);
  if (params.search && params.search.constructor == Array && params.search.length) {
    console.log('=================================2', 2);
    forEach(params.search, (search) => {
      and.push({
        [search.property]:  new RegExp('.*' + search.value, 'i')
      });
    });
  }
  console.log('=================================and2', and);

  // Filters
  if (params.filters && params.filters.constructor === Array) {
    console.log('=================================3', 3);
    forEach(params.filters, (filter) => {
      and.push({
        [filter.property]: parseFilterOperation(filter.op)
      });
    });
  }
  console.log('=================================and3', and);

  // apply and operator with all the filters
  if (and.length > 0) {
    find.$and = and;
  }
  return find;
}

export function paginateQuery (query, params) {
  if (params.sort) {
    query.sort({
      [params.sort]: params.order || 'asc'
    });
  }
  if (params.page && params.limit) {
    query.skip((params.page - 1) * params.limit);
  }
  if (params.limit) {
    query.limit(params.limit);
  }
}
