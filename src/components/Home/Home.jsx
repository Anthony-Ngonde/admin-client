import React, {useState, useEffect} from 'react'
import './Home.css'


const Home = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = () => {
    fetch('http://localhost:5000/payments')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPayments(Array.isArray(data) ? data : data.payments || []);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='home'>
      <h1>Home Page</h1>
      <table className="payment-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Plan</th>
            <th>Price</th>
            <th>Paid Date</th>
            <th>Expiry Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.id}</td>
              <td>{payment.name}</td>
              <td>{payment.plan}</td>
              <td>{payment.price}</td>
              <td>{payment.paid_date}</td>
              <td>{payment.expiry_date}</td>
              <td>{payment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;