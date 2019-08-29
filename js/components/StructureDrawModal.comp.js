import React from 'react';
import { Modal, Button } from 'react-bootstrap';

import bem from 'b_';

const b = bem.with('StructureDrawModal');

class StructureDrawModal extends React.Component {

    constructor(props) {
        super(props);

        this.handleClose = this.handleClose.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleClose() {
        this.props.onClose();
    }

    handleSearch() {
        const that = this;
        moleculeEditor.exportStructure('smiles').then(function(smiles) {
            that.props.onSearch(smiles);
        });
    }

    initializeDrawer() {
        ChemicalizeMarvinJs.createEditor('#marvin-container').then(editor => {
            window.moleculeEditor = editor;
        });
    }

    render() {

        return (
            <Modal className={b()} show={this.props.show} onHide={this.handleClose} size='lg'
                onShow={this.initializeDrawer}>
                <Modal.Header closeButton>
                    <Modal.Title>Draw a compound</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div id='marvin-container'></div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={this.handleClose}>
                        Close
                    </Button>
                    <Button variant='primary' onClick={this.handleSearch}>
                        Search
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default StructureDrawModal;
