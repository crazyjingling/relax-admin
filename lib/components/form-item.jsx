import cx from 'classnames';
import merge from 'lodash.merge';
import React from 'react';
import {Component} from 'relax-framework';

import A from './a';
import Utils from '../helpers/utils';

export default class FormItem extends Component {
    static propTypes = {
        sorts: React.PropTypes.array.isRequired,
        url: React.PropTypes.string.isRequired,
        search: React.PropTypes.string.isRequired,
        searchFields: React.PropTypes.array.isRequired,
        query: React.PropTypes.object,
        history: React.PropTypes.object.isRequired
    }

    render() {
        const props = this.props;
        const type = props.type;
        let formItem = <input key={props.key} type={props.type} name={props.name} placeholder={props.name} className="form-control"/>;

        if (type === 'select') {
            const options = props.options.map(function (item) {
                return <option value={item.value}>{item.name}</option>;
            });
            formItem = <select key={props.key} name={props.name} className="select2_demo_1 form-control">{options}</select>;
        }

        return (
            <div className="col-sm-2">
                <div className="form-group">
                    <label className="control-label">{props.label}</label>
                    {formItem}
                </div>
            </div>
        );
    }
}

