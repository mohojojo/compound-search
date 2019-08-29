import React from 'react';
import { connect } from 'react-redux';
import * as fetchHelper from '../common/fetchHelper';
import { FetchDesc } from '../common/fetchDesc';
import { Row, ToggleButtonGroup, ToggleButton, Spinner } from 'react-bootstrap';
import StructureCard from './StructureCard.comp';
import StructureDetailCard from './StructureDetailCard.comp';

import bem from 'b_';

const b = bem.with('StructureList');

class StructureList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            view: 'tiles'
        };

        this.handleViewChange = this.handleViewChange.bind(this);
    }

    handleViewChange(view) {
        console.log(view);

        this.setState({
            view
        });
    }

    render() {
        const { searchResults, searchResultsMeta } = this.props;
        const { view } = this.state;

        return (
            <div className={b()}>
                {searchResultsMeta.isFetching
                    ? <Spinner className={b('spinner')}
                        animation='border' variant='primary'>
                    </Spinner>
                    : <div>
                        <Row className={b('view-buttons-container')}>
                            <ToggleButtonGroup className={b('view-toggle-buttons')} name='views' value={this.state.view}
                                onChange={(e) => this.handleViewChange(e)}>
                                <ToggleButton type='radio' name='radio' value={'tiles'}>
                                    <i className='fa fa-th'></i>
                                </ToggleButton>
                                <ToggleButton type='radio' name='radio' value={'list'}>
                                    <i className='fa fa-th-list'></i>
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Row>

                        {searchResultsMeta.isFetched &&
                            <Row>
                                {searchResults.results.map(s => {
                                    return view === 'tiles'
                                        ? <StructureCard key={s.productId} structure={s}></StructureCard>
                                        : <StructureDetailCard key={s.productId} structure={s}></StructureDetailCard>;
                                })}
                            </Row>
                        }

                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    const searchResults = fetchHelper.getFetchResult(state, FetchDesc.SEARCHRESULTS);

    return {
        searchResults,
        searchResultsMeta: searchResults
            ? fetchHelper.getFetchMeta(searchResults) : {},
    };
};


export default connect(mapStateToProps, null)(StructureList);
