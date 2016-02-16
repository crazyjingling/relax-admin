import filter from 'lodash.filter';

import actionTypes from '../client/actions/types';

const defaultState = {
  data: {
    items: [],
    count: 0
  },
  errors: null
};

export default function strategiesReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.getAdmin:
      const data = {};
      let hasData = false;
      if (action.data.strategies) {
        data.items = action.data.strategies;
        hasData = true;
      }
      if (action.data.strategiesCount || action.data.strategiesCount === 0) {
        data.count = action.data.strategiesCount.count || 0;
        hasData = true;
      }
      if (hasData) {
        return Object.assign({}, state, {
          data: data,
          errors: action.errors
        });
      }
      return state;
    case actionTypes.removeStrategy:
      return Object.assign({}, state, {
        data: {
          items: filter(state.data.items, (strategyIt) => {
            return strategyIt._id !== action.data.removeStrategy._id;
          }),
          count: state.data.count - 1
        },
        errors: action.errors
      });
    case actionTypes.addStrategy:
      return Object.assign({}, state, {
        data: {
          items: [...state.data.items, action.data.addStrategy],
          count: state.data.count + 1
        },
        errors: action.errors
      });
    default:
      return state;
  }
}
