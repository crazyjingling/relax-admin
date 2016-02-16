import forEach from 'lodash.foreach';
import {
  GraphQLString,
  GraphQLInt,
  GraphQLList
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
  // Search
  if (params.search && params.s && params.search.constructor !== Array) {
    and.push({
      [params.search]: new RegExp('.*' + params.s, 'i')
    });
  }
  if (params.search && params.search.constructor == Array && params.search.length) {
    forEach(params.search, (search) => {
      and.push({
        [search.property]:  new RegExp('.*' + search.value, 'i')
      });
    });
  }

  // Filters
  if (params.filters && params.filters.constructor === Array) {
    forEach(params.filters, (filter) => {
      and.push({
        [filter.property]: parseFilterOperation(filter.op)
      });
    });
  }

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
