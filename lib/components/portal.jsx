import ReactDOM from 'react-dom';
import {PropTypes} from 'react';
import {Component} from 'relax-framework';

const renderSubtreeIntoContainer = ReactDOM.unstable_renderSubtreeIntoContainer;

export default class Portal extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    attachTo: PropTypes.string
  }

  componentDidMount () {
    this._target = this.props.attachTo ? document.getElementById(this.props.attachTo).appendChild(document.createElement('div')) : document.body.appendChild(document.createElement('div'));
    this._portal = renderSubtreeIntoContainer(this, this.props.children, this._target);
  }

  componentDidUpdate () {
    this._portal = renderSubtreeIntoContainer(this, this.props.children, this._target);
  }

  componentWillUnmount () {
    ReactDOM.unmountComponentAtNode(this._target);
    this.props.attachTo ? document.getElementById(this.props.attachTo).removeChild(this._target) : document.body.removeChild(this._target);
  }

  render () {
    return null;
  }
}
