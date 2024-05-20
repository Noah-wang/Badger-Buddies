import { useContext, useState, useEffect } from "react";
import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext";
import { Button, Col, Row } from 'react-bootstrap';

export default function BadgerBudsBasket(props) {
    const cats = useContext(BadgerBudsDataContext);
    const savedCatIds = JSON.parse(sessionStorage.getItem('savedCatIds') || '[]');
    const adoptedCatIds = JSON.parse(sessionStorage.getItem('adoptedCatIds') || '[]');
    const [triggerRerender, setTriggerRerender] = useState(false);
    const savedCats = cats.filter(cat => savedCatIds.includes(cat.id));
    useEffect(() => { }, [triggerRerender]);

    const unselectCat = (id, name) => {
        const savedCatIds = JSON.parse(sessionStorage.getItem('savedCatIds') || '[]');
        const updatedSavedCatIds = savedCatIds.filter(catId => catId !== id);
        sessionStorage.setItem('savedCatIds', JSON.stringify(updatedSavedCatIds));
        alert(`${name} has been removed from your basket!`);


        setTriggerRerender(prev => !prev);

    }
    const adoptCat = (id, name) => {
        // Add the cat's ID to the adopted list
        adoptedCatIds.push(id);
        sessionStorage.setItem('adoptedCatIds', JSON.stringify(adoptedCatIds));


        const newSavedCatIds = savedCatIds.filter(catId => catId !== id);
        sessionStorage.setItem('savedCatIds', JSON.stringify(newSavedCatIds));

        alert(`${name} has been adopted!`);
        setTriggerRerender(prev => !prev);
    };

    //color is given by Chatgpt
    const showMoreButtonStyle = {
        backgroundColor: '#f0ad4e', // Example color for "Show More" button
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        margin: '5px',
        borderRadius: '5px',
    };

    const saveButtonStyle = {
        backgroundColor: '#5cb85c', // Example color for "Save" button
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        margin: '5px',
        borderRadius: '5px',
    };

    return (
        <div>
            <h1>Badger Buds Basket</h1>
            <p>These cute cats could be all yours!</p>
            {savedCats.length === 0 ? (
                <p>You have no buds in your basket!</p>
            ) : (
                <Row>
                    {savedCats.map(cat => (
                        <Col xs={12} md={6} lg={4} xl={3}>
                            <div key={cat.id}>
                                <img src={`https://raw.githubusercontent.com/CS571-S24/hw5-api-static-content/main/cats/${cat.imgIds[0]}`} alt={`Image ${cat.name}`} />
                                <h2>{cat.name}</h2>
                                <button style={showMoreButtonStyle} onClick={() => unselectCat(cat.id, cat.name)}>Unselect</button>
                                <button style={saveButtonStyle} onClick={() => adoptCat(cat.id, cat.name)}>Adopt</button>

                            </div>
                        </Col>
                    ))}
                </Row>
            )}
        </div>


    );

}
