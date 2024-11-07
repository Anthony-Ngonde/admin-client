import React from 'react'
import './SignUp.css'



const SignUp = ({ MemberId, Name, Email }) => {
    return (
        <tr>
            <td>{MemberId}</td>
            <td>{Name}</td>
            <td>{Email}</td>
            <td>
                <button className="update-btn">Update</button>
                <button className="delete-btn">Delete</button>
            </td>
        </tr>
    );
}

export default SignUp;