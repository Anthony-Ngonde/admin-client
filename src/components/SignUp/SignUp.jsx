import React from 'react'


const SignUp = ({ MemberId, Name, Email }) => {
    return (
        <div>
            <h3>{MemberId}</h3>
            <h3>{Name}</h3>
            <h3>{Email}</h3>
        </div>
    );
}

export default SignUp;