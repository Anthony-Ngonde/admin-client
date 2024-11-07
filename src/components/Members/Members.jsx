import React, {useEffect, useState} from 'react'


const Members = () => {
    const [signUp, setSignUp] = useState([]);

    useEffect(
        ()=>{
            fetch('http://localhost:5000/signup')
            .then(res=>res.json())
            .then(data=>console.log(data))
            .catch(err=>console.log(err))
        },[]
    )


  return (
    <div className='members'>
        <h1>Members Page</h1>
    </div>
  )
}

export default Members