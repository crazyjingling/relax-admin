import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql';

import authorize from '../../authorize';
import config from '../../../../../config';
import strategyType from '../../types/strategy';
import StrategyModel from '../../../models/strategy';

export default {
  type: strategyType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve (root, params, options) {
    authorize(root);

    if (config.demo) {
      throw new Error('Remove strategy is disabled on the demo');
    }

    return StrategyModel
      .findByIdAndRemove(params.data)
      .exec()
      .then((removedStrategy) => {
        if (!removedStrategy) {
          throw new Error('strategy not found');
        }
        return removedStrategy;
      });
  }
};
