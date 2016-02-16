import actionTypes from '../client/actions/types';

const defaultState = {
  data: {},
  errors: 'Not found'
};

export default function strategyReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.getAdmin:
      if (action.data.strategy) {
        return Object.assign({}, state, {
          data: action.data.strategy,
          errors: action.errors
        });
      }
      return Object.assign({}, state, defaultState);
    default:
      return state;
  }
}
