import React from 'react';
import { Col, Card, Image, Row } from 'react-bootstrap';

import bem from 'b_';

const b = bem.with('StructureDetailCard');


const StructureDetailCard = ({ structure }) => {
    return (
        <Col className={b()} sm={12}>
            <Card body>
                <Row>
                    <Col sm={2}>
                        <Image fluid src={structure.image}></Image>
                    </Col>
                    <Col className={b('details-column')}>
                        <h6 className={b('product-id')}>{structure.productId}</h6>
                        <div>Composition: {structure.properties.Composition}</div>
                        <div>Molar mass: {structure.properties['Molar mass']}</div>
                        <div>Formula: {structure.properties.Formula}</div>
                        <Row className={b('counter-row')}>
                            <Col>
                                <div className={b('counter')}>
                                    {structure.properties['Atom count']}
                                </div>
                                <div className={b('counter-title')}>
                                    Atom count
                                </div>
                            </Col>
                            <Col>
                                <div className={b('counter')}>
                                    {structure.properties['Ring count']}
                                </div>
                                <div className={b('counter-title')}>
                                    Ring count
                                </div>
                            </Col>
                            <Col>
                                <div className={b('counter')}>
                                    {structure.properties['Aromatic ring count']}
                                </div>
                                <div className={b('counter-title')}>
                                    Aromatic ring count
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>
        </Col>
    );
};

export default StructureDetailCard;
