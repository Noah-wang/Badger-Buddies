import React, { useState } from 'react';
import { Carousel, Button } from 'react-bootstrap';


function BadgerBudSummary({ cat, saveCat }) {
    const [showDetails, setShowDetails] = useState(false);
    const index = 0;

    const showMoreButtonStyle = {
        backgroundColor: '#f0ad4e', // Example color for "Show More" button
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        margin: '5px',
        borderRadius: '5px',
        cursor: 'pointer'
    };

    const saveButtonStyle = {
        backgroundColor: '#5cb85c', // Example color for "Save" button
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        margin: '5px',
        borderRadius: '5px',
        cursor: 'pointer'
    };

    const imageStyle = {
        aspectRatio: '1 / 1',
        width: '100%', 
        height: 'auto', 
        objectFit: 'cover' 
    };

    const images = () => {
        
        if (showDetails) {
            return (
                <Carousel className='carousel'>
                    {cat.imgIds.map((imgId, index) => (
                        <Carousel.Item key={index}>
                            <img
                                style={imageStyle}
                                src={`https://raw.githubusercontent.com/CS571-S24/hw5-api-static-content/main/cats/${cat.imgIds[index]}`}
                                alt={`Image ${index + 1}`}
                            />
                        </Carousel.Item>
                    ))}
                </Carousel>
            );
        } else {
            return (
                <img style={imageStyle} src={`https://raw.githubusercontent.com/CS571-S24/hw5-api-static-content/main/cats/${cat.imgIds[0]}`} alt={`Image ${index}`} />
            );
        }

    };

    return (

        <div>
            {images()}
            <h2>{cat.name}</h2>

            {
                showDetails && (
                    <div className='detail'>
                        <p><strong>Gender:</strong> {cat.gender}</p>
                        <p><strong>Breed:</strong> {cat.breed}</p>
                        <p><strong>Age:</strong> {cat.age}</p>
                        {cat.description && <p className="detail"><strong>Description:</strong> {cat.description}</p>}
                    </div>
                )
            }


            <div className="buttons">
                <Button style={showMoreButtonStyle} onClick={() => setShowDetails(!showDetails)}>{showDetails ? "Show Less" : "Show More"}</Button>
                <Button style={saveButtonStyle} onClick={() => saveCat(cat.id, cat.name)}>Save</Button>
            </div>
        </div>
    );
}

export default BadgerBudSummary;
