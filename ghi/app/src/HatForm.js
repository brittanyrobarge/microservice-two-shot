import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';



function CreateHatForm() {
    const [locations, setLocations] = useState([]);
    const [fabric, setFabric] = useState('');
    const [style_name, setStyleName] = useState('');
    const [color, setColor] = useState('');
    const [picture, setPicture] = useState('');
    const [location, setLocation] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);



    const fetchData = async () => {
        const url = 'http://localhost:8100/api/locations/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setLocations(data.locations);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.fabric = fabric;
        data.style_name = style_name;
        data.color = color;
        data.picture = picture;
        data.location = location;
        console.log("Submitted!")
        console.log(JSON.stringify(data))

        const hatUrl = 'http://localhost:8090/hats/';
        const fetchOptions = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const hatResponse = await fetch(hatUrl, fetchOptions);
        if (hatResponse.ok) {
            setFabric('');
            setStyleName('');
            setColor('');
            setPicture('');
            setLocation('');
            setIsSubmitted(true);
        }
    }

    const handleChangeFabric = (event) => {
        const value = event.target.value;
        setFabric(value);
    }

    const handleChangeStyleName = (event) => {
        const value = event.target.value;
        setStyleName(value);
    }

    const handleChangeColor = (event) => {
        const value = event.target.value;
        setColor(value);
    }

    const handleChangePicture = (event) => {
        const value = event.target.value;
        setPicture(value);
    }
    const handleChangeLocation = (event) => {
        const value = event.target.value;
        setLocation(value);
    }

    if (isSubmitted) {
        return <Navigate to="/hats" />;
    }

    return (
        <form onSubmit={handleSubmit} className="text-center">
            <div className="form-group">
                <label>
                    Fabric:
                    <input type="text" name="fabric" value={fabric} onChange={handleChangeFabric} className="form-control" />
                </label>
            </div>
            <div className="form-group">
                <label>
                    Style Name:
                    <input type="text" name="style_name" value={style_name} onChange={handleChangeStyleName} className="form-control" />
                </label>
            </div>
            <div className="form-group">
                <label>
                    Color:
                    <input type="text" name="color" value={color} onChange={handleChangeColor} className="form-control" />
                </label>
            </div>
            <div className="form-group">
                <label>
                    Picture URL:
                    <input type="text" name="picture" value={picture} onChange={handleChangePicture} className="form-control" />
                </label>
            </div>
            {picture && (
                <div className="form-group">
                    <label>Preview:</label>
                    <img src={picture} alt="Preview" className="preview-image" width={200} />
                </div>
            )}
            <div className="form-group">
                <label>
                Location:
                </label>

                    <select name="location" onChange={handleChangeLocation} className="form-control select-arrow">
                        <option value={location}>Select a location</option>
                        {locations.map(location => (
                            <option key={location.id} value={location.href}>
                                {`${location.closet_name} - Section ${location.section_number} - Shelf ${location.shelf_number}`}
                            </option>
                        ))}
                    </select>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
};

export default CreateHatForm;
