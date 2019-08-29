import React from 'react';
import { Col, Card, Image } from 'react-bootstrap';

import bem from 'b_';

const b = bem.with('StructureCard');

const StructureCard = ({ structure }) => {

    return (
        <Col className={b()} sm={3}>
            <Card body>
                <Image fluid src={structure.image}></Image>

                <div className={b('overlay')}>
                    <div>{structure.productId}</div>
                </div>
            </Card>
        </Col>
    );
};

export default StructureCard;
