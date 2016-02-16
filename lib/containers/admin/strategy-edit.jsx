import React from 'react';
import {connect} from 'react-redux';
import {Component} from 'relax-framework';

import StrategyEdit from '../../components/admin/panels/strategy-edit';

@connect(
  (state) => ({
    strategy: state.strategy.data,
    errors: state.strategy.errors
  })
)
export default class StrategyEditContainer extends Component {
  static fragments = StrategyEdit.fragments

  static panelSettings = {
    activePanelType: 'strategyEdit',
    breadcrumbs: [
      {
        label: 'Strategies',
        type: 'strategies',
        link: '/admin/strategies'
      }
    ]
  }

  static propTypes = {
    strategy: React.PropTypes.object.isRequired,
    breadcrumbs: React.PropTypes.array.isRequired
  }

  render () {
    return (
      <StrategyEdit
        {...this.props}
        {...this.state}
      />
    );
  }
}
