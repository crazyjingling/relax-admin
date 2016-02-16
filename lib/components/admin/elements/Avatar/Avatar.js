/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component } from 'react';

class Avatar extends Component {
  static propTypes = {
    user: React.PropTypes.object,
    avatar: React.PropTypes.string
  }

  render() {
    return (
      <a href={'/admin/users/'+ this.props.user._id}>
        <img alt="image" className="img-circle" height="48px" width="48px" src={this.props.avatar}/>
      </a>
    );
  }

}

export default Avatar;
