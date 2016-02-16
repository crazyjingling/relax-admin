import React, {PropTypes} from 'react';
import {Component, mergeFragments} from 'relax-framework';

import Breadcrumbs from '../../../breadcrumbs';
import Filter from '../../../filter';
import Lightbox from '../../../lightbox';
import New from './new';
import Pagination from '../../../pagination';
import ListTable from './list-table.jsx';
export default class Strategies extends Component {
    static fragments = mergeFragments({
        strategiesCount: {
            count: 1
        }
    }, ListTable.fragments)

    static propTypes = {
        breadcrumbs: PropTypes.array.isRequired,
        strategies: PropTypes.array,
        showFields: PropTypes.array.isRequired,
        searchFields: PropTypes.array.isRequired,
        query: PropTypes.object,
        count: PropTypes.number,
        lightbox: PropTypes.boolean,
        removeStrategy: PropTypes.func.isRequired,
        onAddNew: PropTypes.func.isRequired,
        onAddNewClick: PropTypes.func.isRequired,
        onCloseLightbox: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired
    }

    render() {
        return (
            <div className="ibox-content">
                <div className='table-responsive'>
                    <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper form-inline dt-bootstrap">
                        <Filter
                            sorts={[
                              {label: 'Date', property: '_id'},
                              {label: 'Strategyname', property: 'strategyname'},
                              {label: 'Email', property: 'email'}
                            ]}
                            url='/admin/strategies'
                            search='strategyname'
                            searchFields={this.props.searchFields}
                            query={this.props.query}
                            history={this.props.history}
                        />
                        <ListTable
                            type='strategy'
                            strategies={this.props.strategies}
                            removeStrategy={this.props.removeStrategy}
                            showFields={this.props.showFields}
                        />
                        <Pagination
                            url='/admin/strategies'
                            query={this.props.query}
                            count={this.props.count}
                        />
                    </div>
                </div>
                {this.renderLightbox()}

            </div>
        );
    }

    renderLightbox() {
        if (this.props.lightbox) {
            return (
                <Lightbox className='small' title='Add strategy' onClose={this.props.onCloseLightbox}>
                    <New onSubmit={this.props.onAddNew}/>
                </Lightbox>
            );
        }
    }
}
