import { useEffect, useState } from "react";

function ShoeList(props) {
    const [shoes, setShoes] = useState([])

    const getData = async () => {
        const response = await fetch('http://localhost:8080/api/shoes/');

        if (response.ok) {
            const data = await response.json();
            setShoes(data.shoes)
        }
    };
    const handleDelete = async (shoeToDelete) =>
    {
        await
fetch(`http://localhost:8080/api/shoes/${shoeToDelete.id}`,{
        method: 'DELETE',
    });
    getData()
};
    useEffect(()=>{
        getData()
    }, [])
    console.log(shoes)
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Manufacturer</th>
                    <th>Model</th>
                    <th>Color</th>
                    <th>Photo Url</th>
                    <th>Bin</th>
                    <th>Bin Number</th>
                    <th>Bin Size</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {shoes.map((shoe) => {
                    return (
                        <tr key={shoe.id}>
                            <td>{shoe.manufacturer}</td>
                            <td>{shoe.model_name}</td>
                            <td>{shoe.color}</td>
                            <td><img src={shoe.picture_url} width={50} /></td>
                            <td>{shoe.bin.closet_name}</td>
                            <td>{shoe.bin.bin_number}</td>
                            <td>{shoe.bin.bin_size}</td>
                            <td>
                                <button onClick={() => handleDelete(shoe)}>Delete</button>
                            </td>
                        </tr>
                    );
                    })}
            </tbody>
        </table>
    );
}
export default ShoeList;
