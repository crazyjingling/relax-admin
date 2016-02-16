import React from 'react';
import {Component} from 'relax-framework';
import moment from 'moment';

import Breadcrumbs from '../../../breadcrumbs';
import {getGravatarImage} from '../../../../helpers/utils';

export default class StrategyEdit extends Component {
  static fragments = {
    strategy: {
      email: 1,
      name: 1,
      strategyname: 1,
      date: 1
    }
  }

  static propTypes = {
    strategy: React.PropTypes.object.isRequired,
    breadcrumbs: React.PropTypes.array.isRequired
  }

  render () {
    const strategy = this.props.strategy;
    const url = getGravatarImage(strategy.email, 70);
    const createdDate = moment(strategy.date).format('MMMM Do YYYY');

    const breadcrumbs = this.props.breadcrumbs.slice();
    breadcrumbs.push({
      label: this.props.strategy.name
    });

    return (
      <div className='admin-user-edit'>
        <div className='filter-menu'>
          <Breadcrumbs data={breadcrumbs} />
        </div>
        <div className='admin-scrollable'>
          <div className='list'>
            <div>
              <div className='image-part'>
                <img src={url} />
              </div>
              <div className='info-part'>
                {strategy.name}
              </div>
            </div>
            <div className='infos'>
              <div className='info'>
                <i className='material-icons'>today</i>
                <span>Created at</span>
                <div>{createdDate}</div>
              </div>
              <div className='info'>
                <i className='material-icons'>person</i>
                <span>Strategyname</span>
                <div>{strategy.strategyname}</div>
              </div>
              <div className='info'>
                <i className='material-icons'>mail</i>
                <span>Email</span>
                <div>{strategy.email}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
