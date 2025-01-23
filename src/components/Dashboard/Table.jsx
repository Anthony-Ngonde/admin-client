//Table to show the active members


function Table({currentMembers,totalPages,paginate,currentPage}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Active Members</h3>
  
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
        <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal hidden md:table-header-group">
          <tr>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Status</th>
            <th className="py-3 px-6 text-left">Date Paid</th>
            <th className="py-3 px-6 text-left">Expiry Date</th>
            <th className="py-3 px-6 text-left">User ID</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm">
          {currentMembers.map((active) => (
            <tr
              key={active.user_id}
              className="border-b border-gray-200 hover:bg-gray-50 transition duration-200 block md:table-row"
            >
              <td className="py-4 px-6 block md:table-cell">
                <span className="md:hidden font-semibold text-gray-500">Name:</span> {active.name}
              </td>
              <td className="py-4 px-6 block md:table-cell">
                <span className="md:hidden font-semibold text-gray-500">Status:</span> 
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    active.status
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {active.status ? 'Active' : 'Expired'}
                </span>
              </td>
              <td className="py-4 px-6 block md:table-cell">
                <span className="md:hidden font-semibold text-gray-500">Date Paid:</span> 
                {new Date(active.date_paid).toLocaleDateString()}
              </td>
              <td className="py-4 px-6 block md:table-cell">
                <span className="md:hidden font-semibold text-gray-500">Expiry Date:</span> 
                {new Date(active.expiry_date).toLocaleDateString()}
              </td>
              <td className="py-4 px-6 block md:table-cell">
                <span className="md:hidden font-semibold text-gray-500">User ID:</span> 
                {active.user_id}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  
    {/* Pagination */}
    <div className="flex flex-wrap justify-center mt-6 space-x-2">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            currentPage === page
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
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