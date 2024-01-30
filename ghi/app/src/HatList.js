import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

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
            console.log(data)
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

    return (
        <div className="container">
            <h1>Hat List</h1>
            {hatList.length > 0 ? (
                <table className="table table-dark table-striped table-hover table-bordered">
                    <thead class="table-light">
                        <tr>
                            <th>Image</th>
                            <th>Color</th>
                            <th>Fabric</th>
                            <th>Style Name</th>
                            <th>Delete?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hatList.map((hat) => (
                            <tr key={hat.fabric}>
                                <td>
                                    <img src={hat.picture} width={50} alt="Hat" />
                                </td>
                                <td>{hat.color}</td>
                                <td>{hat.fabric}</td>
                                <td>{hat.style_name}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => this.deleteHat(hat.id)}>
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
