//Table to show the active members


function Table({currentMembers,totalPages,paginate,currentPage}) {
  return (
    <div className="members-section">
        <h3>Active Members</h3>
        <div className="members-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Date Paid</th>
                <th>Expiry Date</th>
                <th>User ID</th>
              </tr>
            </thead>
            <tbody>
              {currentMembers.map((active) => (
                <tr key={active.user_id}>
                  <td>{active.name}</td>
                  <td>{active.status ? 'Active' : 'Expired'}</td>
                  <td>{new Date(active.date_paid).toLocaleDateString()}</td>
                  <td>{new Date(active.expiry_date).toLocaleDateString()}</td>
                  <td>{active.user_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
      </div>
  )
}

export default Table