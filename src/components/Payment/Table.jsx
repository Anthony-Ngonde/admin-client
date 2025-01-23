//Component to display all the payment data
import './Payment.css'
import { Edit2, Trash2 } from 'lucide-react';

function Table({currentPayments,handleDeletePayment,totalPages}) {
  return (
    <div>
          <table>
            <thead>
              <tr>
                <th>Phone Number</th>
                <th>Transaction ID</th>
                <th>Plan</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Member ID</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentPayments.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.phone_number}</td>
                  <td>{payment.transaction_id}</td>
                  <td>{payment.plan}</td>
                  <td>{payment.amount}</td>
                  <td>
                    {payment.date
                      ? new Date(payment.date).toLocaleDateString()
                      : 'Invalid Date'}
                  </td>
                  <td>{payment.member_id}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="edit-btn">
                        <Edit2 size={16} />
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeletePayment(payment.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`pagination-btn ${
                  currentPage === page ? 'active' : ''
                }`}
                onClick={() => paginate(page)}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
  )
}

export default Table