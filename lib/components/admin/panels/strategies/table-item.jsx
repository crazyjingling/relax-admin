import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';
import moment from 'moment';
import A from '../../../a';
import Lightbox from '../../../lightbox';
import Utils from '../../../../helpers/utils';

export default class TableItem extends Component {
    static fragments = {
        strategy: {
            _id: 1,
            name: 1,
            strategyname: 1,
            email: 1,
            date: -1
        }
    };

    static propTypes = {
        strategy: PropTypes.object,
        removeStrategy: PropTypes.func.isRequired,
        showFields: PropTypes.array.isRequired,
        type: PropTypes.func.isRequired
    }

    getInitState () {
        return {
            removing: false
        };
    }

    onRemove (event) {
        event.preventDefault();
        this.setState({
            removing: true
        });
    }

    cancelRemove (event) {
        event.preventDefault();
        this.setState({
            removing: false
        });
    }

    confirmRemove (event) {
        event.preventDefault();
        this.props.removeStrategy(this.constructor.fragments, this.props.strategy._id).done();
        this.setState({
            removing: false
        });
    }
    render() {
        const showFields = this.props.showFields;
        return (
            <tr>
                {this.props.showFields.map(this.renderItem, this)}
            </tr>
        );
    }

    renderRemoving () {
        if (this.state.removing) {
            const label = 'Are you sure you want to remove the strategy ' + this.props.strategy.name + '?';
            const label1 = 'This action cannot be reverted';
            return (
                <Lightbox className='small' header={false}>
                    <div className='big centered'>{label}</div>
                    <div className='medium centered'>{label1}</div>
                    <div className='centered space-above'>
                        <a className='button button-grey margined' href='#' onClick={this.cancelRemove.bind(this)}>No, abort!</a>
                        <a className='button button-alert margined' href='#' onClick={this.confirmRemove.bind(this)}>Yes, delete it!</a>
                    </div>
                </Lightbox>
            );
        }
    }
    renderItem (item) {
        const data = this.props.strategy;
        let field = data;
        const type = item.type;

        if (item.key.indexOf('.') !== -1) {
            const keys = item.key.split('.');
            for (let i of keys) {
                field = field[i];
            }
        } else {
            field = field[item.key];
        }
        let inner;
        switch (type) {
            case 'avatar':
                inner = <Avatar avatar={field} userId={data.owner.userId}/>;
                break;
            case 'image':
                inner = <img src={field} style={{ maxWidth: '40px' }} />;
                break;
            default:
                inner = field;
        }
        return <td>{inner}</td>;
    }
}
