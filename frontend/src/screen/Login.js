import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Form from '../components/Form';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validateUser = { email, password};
    const response = await fetch("https://gofood-gpmv.onrender.com/login", {
        method: "POST",
        body: JSON.stringify(validateUser),
        headers: {
            "Content-Type": "application/json"
        }
    });
    const result = await response.json();
   
    if (response.ok) {
        console.log(result);
        setEmail("");
        setPassword("");
        localStorage.setItem("authToken",result.authToken);
        localStorage.setItem("userEmail",email);
        navigate("/");
       
    }
    if (!response.ok) {
        console.log(result.error);
    }
}
  return (
    <div className='flex flex-col'>
    <Form
        label='Login'
    />
</div>
  )
}

export default Login