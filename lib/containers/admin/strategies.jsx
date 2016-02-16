import * as strategiesActions from '../../client/actions/strategies';

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component, buildQueryAndVariables} from 'relax-framework';

import queryProps from '../../decorators/query-props';
import Strategies from '../../components/admin/panels/strategies';

@connect(
  (state) => ({
    strategies: state.strategies.data.items,
    count: state.strategies.data.count
  }),
  (dispatch) => bindActionCreators(strategiesActions, dispatch)
)
@queryProps({
  page: 1,
  limit: 5,
  sort: '_id',
  order: 'desc'
})
export default class StrategiesContainer extends Component {
  static fragments = Strategies.fragments

  static panelSettings = {
    activePanelType: 'strategies',
    breadcrumbs: [
      {
        label: 'Strategies'
      }
    ],
    showFields: [
      { key: 'strategyname', name: '妙招标题', type: 'text' },
      { key: 'name', name: '昵称', type: 'text' },
      { key: 'password', name: '密码', type: 'text' },
      { key: 'email', name: '邮箱', type: 'text' },
      { key: 'date', name: '日期', type: 'text' },
    ],
    searchFields: [{
      key: 'name',
      name: 'name',
      label: '姓名',
      type: 'text',
      value: ''
    }, {
      key: 'statue',
      name: 'statue',
      options: [
        { name: 'mahui', value: '马慧' },
        { name: 'mahui1', value: '马慧1' },
        { name: 'mahui2', value: '马慧2' },
        { name: 'mahui3', value: '马慧3' },
        { name: 'mahui4', value: '马慧4' },
      ],
      label: '状态',
      type: 'select'
    }]
  }

  static propTypes = {
    breadcrumbs: PropTypes.array.isRequired,
    strategies: PropTypes.array,
    showFields: PropTypes.array,
    searchFields: PropTypes.array,
    query: PropTypes.object,
    count: PropTypes.number,
    hasQueryChanged: PropTypes.bool.isRequired,
    queryVariables: PropTypes.object.isRequired,
    removeStrategy: PropTypes.func.isRequired,
    addStrategy: PropTypes.func.isRequired
  }

  getInitState () {
    return {
      lightbox: false
    };
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.hasQueryChanged) {
      const vars = {
        strategies: {
          ...nextProps.queryVariables
        }
      };

      nextProps
        .getAdmin(buildQueryAndVariables(
          this.constructor.fragments,
          vars
        ))
        .done();
    }
  }

  //onAddNew (newStrategy) {
  //  this.props
  //    .addStrategy({strategy: Strategies.fragments.strategies}, newStrategy)
  //    .then(() => {
  //      this.onCloseLightbox();
  //    });
  //}
  //
  //onAddNewClick (event) {
  //  event.preventDefault();
  //  this.setState({
  //    lightbox: true
  //  });
  //}

  onCloseLightbox () {
    this.setState({
      lightbox: false
    });
  }

  render () {
    return (
      <Strategies
        {...this.props}
        {...this.state}
        onCloseLightbox={::this.onCloseLightbox}
      />
    );
  }
}
