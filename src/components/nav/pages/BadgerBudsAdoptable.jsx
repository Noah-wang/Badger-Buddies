import { useContext, useState, useEffect } from 'react';
import BadgerBudsDataContext from '../../../contexts/BadgerBudsDataContext';
import BadgerBudSummary from "./BadgerBudSummary";
import { Button, Col, Row } from 'react-bootstrap';

export default function BadgerBudsAdoptable(props) {
    const allCats = useContext(BadgerBudsDataContext);
    const [savedCatIds, setSavedCatIds] = useState(JSON.parse(sessionStorage.getItem('savedCatIds') || "[]"));
    const availableCats = allCats.filter(cat => !savedCatIds.includes(cat.id));
    

    useEffect(() => {
        sessionStorage.setItem('savedCatIds', JSON.stringify(savedCatIds));
    }, [savedCatIds]);

    const handleSavedCat = (id, name) => {
        const savedCatID = [...savedCatIds, id];
        setSavedCatIds(savedCatID);
        alert(`${name} has been added to your basket!`);
    };

    
    return (
        <div>
            <h1>Available Badger Buds</h1>
            <p>The following cats are looking for a loving home! Could you help?</p>
            {availableCats.length === 0 ? (
                <p>No buds are available for adoption!</p>
            ) : (
                <>
                    <Row>
                        {availableCats.map(cat => (
                            <Col xs={12} md={6} lg={4} xl={3} key={cat.id} >
                                <BadgerBudSummary cat={cat} saveCat={handleSavedCat} />
                            </Col>
                        ))}
                    </Row>
                </>
            )}
        </div>
    );
}
