import React, {useEffect, useState} from 'react'
import SignUp from '../SignUp/SignUp';


const Members = () => {
    const [signUp, setSignUp] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/signup')
            .then(res => res.json())
            .then(data => {
                console.log(data); 
                setSignUp(data.users || []); 
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className='members'>
            <h1>List of Members</h1>
            {signUp.map((member) => (
                <SignUp
                    key={member.id} 
                    MemberId={member.id}
                    Name={member.name}
                    Email={member.email}
                />
            ))}
        </div>
    );
}

export default Members;