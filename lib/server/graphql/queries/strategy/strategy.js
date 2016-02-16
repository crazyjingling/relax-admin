import {
  GraphQLString
} from 'graphql';

import {getProjection} from 'relax-framework';

import authorize from '../../authorize';
import strategyType from '../../types/strategy';
import StrategyModel from '../../../models/strategy';

export default {
  type: strategyType,
  args: {
    strategyname: {
      name: 'strategyname',
      type: GraphQLString
    }
  },
  resolve (root, params, options) {
    authorize(root);

    const projection = getProjection(options.fieldASTs[0]);
    return StrategyModel.findOne(params).select(projection).exec();
  }
};
