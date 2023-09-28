import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'


const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [location, setLocation] = useState("");
    const navigate=useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const addUser = { name, email, password,location};
        const response = await fetch("https://gofood-gpmv.onrender.com/create", {
            method: "POST",
            body: JSON.stringify(addUser),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const result = await response.json();
        if (response.ok) {
            console.log(result);
            setName("");
            setEmail("");
            setPassword("");
            setLocation("");
            navigate("/login");
           
        }
        if (!response.ok) {
            console.log(result.error);
        }
    }



    return (
        <div className='container m-sm-5 my-5'>
            <div className="d-flex align-items-center py-2 py-sm-4 bg-body-tertiary">
                <div className="form-signin w-sm-50 w-100 m-auto">
                    <form onSubmit={handleSubmit}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="72" height="57" fill="currentColor" className="bi bi-box2-heart-fill" viewBox="0 0 16 16">
                            <path d="M3.75 0a1 1 0 0 0-.8.4L.1 4.2a.5.5 0 0 0-.1.3V15a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4.5a.5.5 0 
                            0 0-.1-.3L13.05.4a1 1 0 0 0-.8-.4h-8.5ZM8.5 4h6l.5.667V5H1v-.333L1.5 4h6V1h1v3ZM8 7.993c1.664-1.711 
                            5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z" />
                        </svg>
                        <h1 className="h3 mb-3 fw-normal">Please sign up</h1>

                        <div className="form-floating m-2">
                            <input type="text" className="form-control"  
                            placeholder="name" fdprocessedid="lbhii6" value={name} onChange={(e)=>setName(e.target.value)}/>
                            <label>Name</label>
                        </div>
                        <div className="form-floating m-2">
                            <input type="email" className="form-control" 
                            placeholder="name@example.com" fdprocessedid="lbhii6"  value={email} onChange={(e)=>setEmail(e.target.value)}/>
                            <label>Email address</label>
                        </div>
                        <div className="form-floating m-2">
                            <input type="password" className="form-control" id="floatingPassword" 
                            placeholder="Password" fdprocessedid="yw5cev" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                            <label >Password</label>
                        </div>
                        <div className="form-floating m-2">
                            <input type="text" className="form-control"  placeholder="Address" 
                            fdprocessedid="yw5cev" value={location} onChange={(e)=>setLocation(e.target.value)} />
                            <label>Address</label>
                        </div>

                        <button className="btn btn-success  py-2 m-3" type="submit" fdprocessedid="mud6ao">Sign up</button>
                        <Link to="/login" className='btn btn-danger py-2 m-3'>Already a user</Link>
                        <p className="mt-5 mb-3 text-body-secondary">© 2017–2023</p>
                    </form>
                </div>
                <script src="/docs/5.3/dist/js/bootstrap.bundle.min.js"
                 integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" ></script>
            </div>
        </div>
    )
}

export default Signup