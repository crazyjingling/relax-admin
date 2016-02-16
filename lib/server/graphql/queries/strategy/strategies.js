import {
  GraphQLList
} from 'graphql';

import {getProjection} from 'relax-framework';

import authorize from '../../authorize';
import {paginationQueryArgs, paginateQuery, searchQuery} from '../../query-pagination';
import strategyType from '../../types/strategy';
import StrategyModel from '../../../models/strategy';

export default {
  type: new GraphQLList(strategyType),
  args: {
    ...paginationQueryArgs
  },
  resolve (root, params, options) {
    authorize(root);
    const projection = getProjection(options.fieldASTs[0]);
    const query = StrategyModel.find(searchQuery({}, params));
    paginateQuery(query, params);

    return query.select(projection).exec();
  }
};
