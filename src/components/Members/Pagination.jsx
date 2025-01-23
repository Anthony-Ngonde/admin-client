//Component for the pagination

import React from 'react'

function Pagination({totalPages,currentPage,handlePageChange}) {
  return (
    <div className="pagination">
    {[...Array(totalPages).keys()].map((num) => (
      <button
        key={num + 1}
        className={`page-btn ${currentPage === num + 1 ? 'active' : ''}`}
        onClick={() => handlePageChange(num + 1)}
      >
        {num + 1}
      </button>
    ))}
  </div>
  )
}

export default Pagination