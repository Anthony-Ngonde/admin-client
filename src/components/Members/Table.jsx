//Table component to display data
import { Edit2, Trash2 } from 'lucide-react';

function Table({currentMembers,handleDeleteMember}) {
  return (
    <div className="members-table">
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Phone Number</th>
          <th>Email Address</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {currentMembers.map((member) => (
          <tr key={member.id}>
            <td>{member.f_name}</td>
            <td>{member.l_name}</td>
            <td>{member.phone_number}</td>
            <td>{member.email}</td>
            <td>
              <div className="action-buttons">
                <button
                  className="edit-btn"
                  onClick={() => alert(`Edit action for ${member.id}`)}
                >
                  <Edit2 size={16} />
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteMember(member.id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}

export default Table