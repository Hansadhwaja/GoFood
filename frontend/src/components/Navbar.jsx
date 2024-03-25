import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Badge from "react-bootstrap/Badge";
import Modal from '../Modal';
import Cart from '../screen/Cart';
import { useCart } from './ContextReducer';

const Navbar = () => {
    const data = useCart();
    const [cartView, setCartView] = useState(false);
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    }
    return (
        <nav className="navbar navbar-expand-lg  bg-success navbar-dark"  >
            <div className="container-fluid">
                <svg xmlns="http://www.w3.org/2000/svg" width="72" height="57" fill="currentColor" className="bi bi-box2-heart-fill text-white" viewBox="0 0 16 16">
                    <path d="M3.75 0a1 1 0 0 0-.8.4L.1 4.2a.5.5 0 0 0-.1.3V15a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4.5a.5.5 0 0 0-.1-.3L13.05.4a1 1 0 0 0-.8-.4h-8.5ZM8.5 4h6l.5.667V5H1v-.333L1.5 4h6V1h1v3ZM8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z"></path>
                </svg>
                <Link className="navbar-brand fs-1 fst-italic " to="/">GoFood</Link>
                <button 
                className="navbar-toggler" 
                type="button" 
                data-bs-toggle="collapse"    
                data-bs-target="#navbarNav" 
                aria-controls="navbarNav" 
                aria-expanded="false" 
                aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav" >
                    <ul className="navbar-nav me-auto mb-2" aria-labelledby="navbarNav">
                        <li className="nav-item">
                            <Link className="nav-link active  fs-5" aria-current="page" to="/">Home</Link>
                        </li>
                        {(localStorage.getItem("authToken")) ?
                            <li className="nav-item">
                                <Link className="nav-link fs-5" aria-current="page" to="/myOrder">My Orders</Link>
                            </li>
                            : ""
                        }
                        {(localStorage.getItem("authToken")) ?
                            <div className='d-flex'>
                                <div className="btn bg-white mx-1 text-danger fs-5" onClick={handleLogout}>Logout</div>
                                <div className="btn bg-white mx-1 text-success fs-5" onClick={() => setCartView(true)}>
                                    My Cart{" "}
                                    <Badge pill bg="danger">{data.length}</Badge>
                                </div>
                                {cartView ? <Modal onClose={() => setCartView(false)}><Cart /></Modal> : null}
                            </div>

                            :
                            <div className='d-flex'>
                                <Link className="btn bg-white mx-1 text-success fs-5" to="/login">Login</Link>
                                <Link className="btn bg-white mx-1 text-success fs-5" to="/create">Signup</Link>
                            </div>
                        }
                    </ul>
                </div>
            </div>
        </nav>

    )
}

export default Navbar

