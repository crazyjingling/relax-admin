import {
  GraphQLNonNull
} from 'graphql';
import Q from 'q';

import authorize from '../../authorize';
import strategyType from '../../types/strategy';
import strategyInputType from '../../types/strategy-input';
import StrategyModel from '../../../models/strategy';

export default {
  type: strategyType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(strategyInputType)
    }
  },
  //resolve (root, params, options) {
  //  const {strategyname, name, email, password} = params.data;
  //  const strategy = new StrategyModel({
  //    strategyname,
  //    name,
  //    email
  //  });
  //
  //  return Q()
  //    .then(() => StrategyModel.count().exec())
  //    .then((count) => {
  //      if (count > 0) {
  //        authorize(root);
  //      }
  //    })
  //    .then(() => Q.ninvoke(StrategyModel, 'register', strategy, password))
  //    .then(() => {
  //      return strategy;
  //    });
  //}
  resolve (root, params, options) {
    authorize(root);

    const strategy = new StrategyModel(params.data);

    return Q()
        .then(() => strategy.save())
        .then((newStrategy) => {
          if (!newStrategy) {
            throw new Error('Page not found');
          }
          return newStrategy;
        });
  }
};
