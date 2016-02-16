import A from '../a';
import React from 'react';
import {Component} from 'relax-framework';
import cx from 'classnames';
import Utils from '../../helpers/utils';
import {Avatar} from './elements'
export default class MenuBar extends Component {
  static propTypes = {
    user: React.PropTypes.object,
    activePanelType: React.PropTypes.string,
    breadcrumbs: React.PropTypes.array
  }

  getInitState() {
    return {
      userOpened: false
    };
  }

  render() {
    const links = [
      {
        type: 'settings',
        link: '/admin',
        label: 'General Settings'
      },
      {
        type: 'strategies',
        link: '/admin/strategies',
        label: '妙招列表'
      },
      {
        type: 'pages',
        link: '/admin/pages',
        label: 'Pages'
      },
      {
        type: 'schemas',
        link: '/admin/schemas',
        label: 'Schemas'
      },
      {
        type: 'menus',
        link: '/admin/menus',
        label: 'Menus'
      },
      {
        type: 'media',
        link: '/admin/media',
        label: 'Media'
      },
      {
        type: 'fonts',
        link: '/admin/fonts',
        label: 'Fonts'
      },
      {
        type: 'colors',
        link: '/admin/colors',
        label: 'Colors'
      },
      {
        type: 'users',
        link: '/admin/users',
        label: 'Users'
      }
    ];
    return (
        <nav className="navbar-default navbar-static-side" role="navigation">
          <div className="sidebar-collapse">
            <ul className="nav metismenu" id="side-menu">
              {this.renderNavHeader()}
              {links.map(this.renderLink, this)}
            </ul>
          </div>
        </nav>
    );
  }

  renderLink(link) {
    const active = this.props.activePanelType === link.type || (this.props.breadcrumbs && this.props.breadcrumbs.length > 0 && this.props.breadcrumbs[0].type === link.type);
    return (
        <li key={link.type} className={cx(active && 'active')}>
          <A href={link.link}>{link.label}</A>
        </li>
    );
  }

  renderNavHeader() {
    var url = Utils.getGravatarImage(this.props.user.email, 25) || '/img/default-avatar.png';

    return (
        <li className="nav-header">
          <div className="dropdown profile-element" style={{textAlign: 'center'}}>
                  <span>
                    <Avatar avatar={url} user={this.props.user}/>
                    <span className="block m-t-xs">
                        <strong className="font-bold">{this.props.user.name}</strong>
                    </span>
                  </span>
            <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                      <span className="clear">
                          <span className="text-muted text-xs block">{this.props.user.role || '普通用户'}
                            <b className="caret"></b>
                          </span>
                        </span>
            </a>
            <ul className="dropdown-menu animated fadeInRight m-t-xs">
              <li>
                <a href='/admin/logout'>
                  <i className='material-icons'>directions_run</i>
                  <span>Log out</span>
                </a>
              </li>
            </ul>
          </div>
        </li>
    )
  }
}
