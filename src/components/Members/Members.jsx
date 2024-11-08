import React, {useEffect, useState} from 'react'
import SignUp from '../SignUp/SignUp';
// import {Modal} from 'react-bootstrap'




const Members = () => {
    const [signUp, setSignUp] = useState([]);
    const [show, setShow] = useState(false)

    useEffect(() => {
        fetch('http://localhost:5000/signup')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setSignUp(data.users || []);
            })
            .catch(err => console.log(err));
    }, []

    );

    const deleteMember=(id)=>{
        console.log(id)


        const requestOptions = {
            method:"DELETE",
            headers:{
                'content-type':'application/json'
            },
        }

        fetch(`http://localhost:5000/signup/${id}`, requestOptions)
        .then(res=>res.json())
        .then(data=>{console.log(data)})
        .catch(err=>console.log(err))
    }

    // const closeModal=()=>{
    //     setShow(false)
    // }

    // const showModal=()=>{
    //     setShow(true)
    // }

    return (
        <div className='members'>
            {/* <Modal
                show={show}
                size='lg'
                onHide={closeModal}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Update Member
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Update</p>
                </Modal.Body>
            </Modal> */}
            <h1>List of Members</h1>
            <table className="members-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {signUp.map((member) => (
                        <SignUp
                            key={member.id}
                            MemberId={member.id}
                            Name={member.name}
                            Email={member.email}
                            // onClick={showModal}

                            onDelete={()=>{deleteMember(member.id)}}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Members;