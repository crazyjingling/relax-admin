import {fragmentToQL} from 'relax-framework';

import actionTypes from './types';
import request from '../helpers/request';

export function removeStrategy (fragments, data) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.removeStrategy,
      query: `
        mutation removeStrategy ($data: String!) {
          removeStrategy (data: $data) {
            ${fragmentToQL(fragments.strategy)}
          }
        }
      `,
      variables: {
        data
      }
    })
  );
}

export function addStrategy (fragments, data) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.addStrategy,
      query: `
        mutation addStrategy ($data: StrategyInput!) {
          addStrategy (data: $data) {
            ${fragmentToQL(fragments.strategy)}
          }
        }
      `,
      variables: {
        data
      }
    })
  );
}
