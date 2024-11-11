import React, { useEffect, useState } from 'react';
import './Equipment.css'

const Equipment = () => {
  const [equipment, setEquipment] = useState([]);
  const [newEquipment, setNewEquipment] = useState({
      name: '',
      equipment_type: '',
      quantity: '',
      description: ''
  });

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

  const addEquipment = () => {
      const requestOptions = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(newEquipment)
      };

      fetch('http://localhost:5000/equipment', requestOptions)
          .then(res => res.json())
          .then(data => {
              console.log(data);
              setNewEquipment({ name: '', equipment_type: '', quantity: '', description: '' }); // Clear form
              getAllEquipment(); // Refresh equipment list after adding
          })
          .catch(err => console.log(err));
  };

  const handleChange = (e) => {
      const { name, value } = e.target;
      setNewEquipment(prevState => ({
          ...prevState,
          [name]: value
      }));
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
                              <button className='update-btn'>Update</button>
                              <button className='delete-btn' onClick={() => deleteEquipment(item.id)}>Delete</button>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>

          <h2>Add New Equipment</h2>
          <form className="add-equipment-form" onSubmit={(e) => { e.preventDefault(); addEquipment(); }}>
              <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={newEquipment.name}
                  onChange={handleChange}
                  required
              />
              <input
                  type="text"
                  name="equipment_type"
                  placeholder="Type"
                  value={newEquipment.equipment_type}
                  onChange={handleChange}
                  required
              />
              <input
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  value={newEquipment.quantity}
                  onChange={handleChange}
                  required
              />
              <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  value={newEquipment.description}
                  onChange={handleChange}
                  required
              />
              <button type="submit" className='add-btn'>Add Equipment</button>
          </form>
      </div>
  );
}

export default Equipment;