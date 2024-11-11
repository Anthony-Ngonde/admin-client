import React from 'react'
// import {Modal} from 'react-bootstrap'
import './SignUp.css'



const SignUp = ({ MemberId, Name, Email, onDelete }) => {
    return (
        <tr>
            <td>{MemberId}</td>
            <td>{Name}</td>
            <td>{Email}</td>
            <td>
                {/* <button className="update-btn">Update</button> */}
                <button className="delete-btn" onClick={onDelete}>Delete</button>
            </td>
        </tr>
    );
}

export default SignUp;