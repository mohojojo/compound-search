import React from 'react';
import { connect } from 'react-redux';
import * as fetchHelper from '../common/fetchHelper';
import { FetchDesc } from '../common/fetchDesc';
import { Button, InputGroup, FormControl, Row, Col } from 'react-bootstrap';
import * as searchActions from '../actions/searchActions';
import StructureListComp from '../components/StructureList.comp';
import StructureDrawModal from '../components/StructureDrawModal.comp';

import bem from 'b_';

const b = bem.with('Search');

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            structure: '',
            isOpenStructureDrawer: false
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.filterChanged = this.filterChanged.bind(this);
    }

    filterChanged(e) {
        this.setState({
            structure: e.target.value
        });
    }

    handleSearch(structure) {
        this.props.search(structure);
    }

    openStructureDrawer() {
        this.handleStructureDrawerOpen(true);
    }

    handleStructureDrawerOpen(isOpenStructureDrawer) {
        this.setState({
            isOpenStructureDrawer
        });
    }

    onDrawerSearch(structure) {
        this.handleStructureDrawerOpen(false);
        this.handleSearch(structure);
    }

    render() {

        return (
            <div className={b()}>
                <div className={b('header')}>
                    <h4 className={b('title')}>Compound library</h4>
                    <Row>
                        <Col sm={10}>
                            <InputGroup>
                                <FormControl
                                    placeholder='Search by compound ID, name, SMILES, InChI, etc.'
                                    aria-label='Search by compound ID, name, SMILES, InChI, etc.'
                                    aria-describedby='basic-addon2'
                                    onChange={e => this.filterChanged(e)}
                                />
                                <InputGroup.Append>
                                    <Button variant='outline-secondary' onClick={() => this.openStructureDrawer()}>
                                        <i className='fa fa-pencil'></i>
                                        Draw
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col>
                        <Col sm={2}>
                            <Button className='w-100' onClick={() => this.handleSearch(this.state.structure)}>
                                Search
                            </Button>
                        </Col>
                    </Row>
                </div>
                <div className={b('structure-list-container')}>
                    <StructureListComp></StructureListComp>
                </div>
                <StructureDrawModal show={this.state.isOpenStructureDrawer}
                    onClose={() => this.handleStructureDrawerOpen(false)}
                    onSearch={(structure) => this.onDrawerSearch(structure)}>
                </StructureDrawModal>
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

const mapDispatchToProps = (dispatch) => {
    return {
        search: (structure) =>
            dispatch(searchActions.getSearchResults(structure))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
