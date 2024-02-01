import React, { useEffect, useState } from 'react'

const HatList = () => {
    const [hatList, setHatList] = useState([])

    useEffect(() => {
        fetchHatList()
    }, [])

    const fetchHatList = async () => {
        try {
            const response = await fetch('http://localhost:8090/hats');
            const data = await response.json();
            setHatList(data.hats);
        } catch (error) {
            console.error("Hats aren't populating! Here's what I got:", error);
        }
    }

    const deleteHat = async (hatId) => {
        await fetch(`http://localhost:8090/hats/${hatId}`, {
            method: 'DELETE',
        });
        fetchHatList();
    }
    console.log(hatList)
    return (
        <div className="container">
            <h1 className="text-center">Hat List</h1>
            {hatList.length > 0 ? (
                <table className="table table-dark table-striped table-hover table-bordered">
                    <thead className="table-light">
                        <tr>
                            <th>Image</th>
                            <th>Color</th>
                            <th>Fabric</th>
                            <th>Style Name</th>
                            <th>Closet Name</th>
                            <th>Section Number</th>
                            <th>Shelf Number</th>
                            <th>Delete?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hatList.map((hat) => (
                            <tr key={hat.id}>
                                <td>
                                    <img src={hat.picture} width={50} alt="Hat" />
                                </td>
                                <td>{hat.color}</td>
                                <td>{hat.fabric}</td>
                                <td>{hat.style_name}</td>
                                <td>{hat.location.closet_name}</td>
                                <td>{hat.location.section_number}</td>
                                <td>{hat.location.shelf_number}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => deleteHat(hat.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hats available!</p>
            )}
        </div>
    )
}

export default HatList
