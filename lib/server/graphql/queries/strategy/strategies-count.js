import Q from 'q';

import authorize from '../../authorize';
import countType from '../../types/count';
import StrategyModel from '../../../models/strategy';

export default {
  type: countType,
  args: {},
  resolve (root, params, options) {
    authorize(root);
    return Q()
    .then(() => StrategyModel.count({}))
    .then((count) => {
      return {count};
    });
  }
};
