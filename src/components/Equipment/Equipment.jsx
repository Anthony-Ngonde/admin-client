import React, { useEffect, useState } from 'react';

const Equipment = () => {
    const [equipment, setEquipment] = useState([]);

    useEffect(() => {
        getAllEquipment();
    }, []);

    const getAllEquipment = () => {
        fetch('http://localhost:5000/equipment')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setEquipment(Array.isArray(data) ? data : data.equipment || []);
            })
            .catch(err => console.log(err));
    };

    const deleteEquipment = (id) => {
        console.log(id);

        const requestOptions = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
        };

        fetch(`http://localhost:5000/equipment/${id}`, requestOptions)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                getAllEquipment(); // Refresh equipment list after deletion
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='equipment'>
            <h1>Equipment Page</h1>
            <table className="equipment-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Quantity</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {equipment.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.equipment_type}</td>
                            <td>{item.quantity}</td>
                            <td>{item.description}</td>
                            <td>
                            {/* <button className="update-btn">Update</button> */}
                                <button className='delete-btn' onClick={() => deleteEquipment(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Equipment;
