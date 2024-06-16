import React, { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Badge from "react-bootstrap/Badge";
import Modal from '../Modal';
import Cart from '../screen/Cart';
import { RiMenu3Fill } from "react-icons/ri";
import logo from '../assets/logo.svg'
import { useSelector } from 'react-redux';


const Navbar = () => {
    const data = useSelector((state) => state.cart);
    const [cartView, setCartView] = useState(false);
    const [isTokenAvailable, setIsTokenAvailable] = useState(false)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const sidebarRef = useRef(null);

    useEffect(() => {
        if (localStorage.getItem("authToken")) {
            setIsTokenAvailable(true)
        }
    }, []);

    const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            setIsSidebarOpen(false);
        }
    };

    useEffect(() => {
        if (isSidebarOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSidebarOpen]);


    const navItems = [
        {
            label: "Home",
            link: "/",
            authenticate: true
        },
        {
            label: "My Orders",
            link: "/myOrder",
            authenticate: isTokenAvailable
        },
        {
            label: "Login",
            link: "/login",
            authenticate: !isTokenAvailable
        },
        {
            label: "SignUp",
            link: "/create",
            authenticate: !isTokenAvailable
        }
    ]


    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userEmail");
        toggleSidebar()
        navigate("/login");
    }

    const toggleSidebar = () => {
        setIsSidebarOpen(prev => !prev)
    }

    return (
        <nav className=" bg-green-400 flex p-4 gap-2">
            <div className='flex gap-3'>
                <Link to="/" className='my-auto'>
                    <img src={logo} alt='logo' className='' />
                </Link>

                <Link to="/" className='my-auto'>
                    <button className='text-white text-3xl font-semibold'>
                        GoFood
                    </button>
                </Link>
            </div>

            <div className='ml-auto'>
                <div className='flex sm:hidden'>
                    <button className="text-white hover:border-2 p-2 rounded-xl" onClick={toggleSidebar}>
                        <RiMenu3Fill size={32} />
                    </button>
                </div>
                <div className='hidden sm:flex'>
                    {navItems.map(item => item.authenticate ? (
                        <NavLink
                            to={item.link}
                            key={item.label}
                            className={({ isActive }) => (isActive ? 'bg-red-500 rounded-xl mx-2' : " ")}
                        >
                            <button className='text-white text-md font-semibold hover:bg-red-500 px-4 py-2 rounded-xl' >
                                {item.label}
                            </button>
                        </NavLink>

                    ) : " ")}


                    {isTokenAvailable && (
                        <div>
                            <button className='text-white text-md font-semibold hover:bg-red-500 px-4 py-2 rounded-xl' onClick={() => setCartView(true)}>
                                My Cart{" "}
                                <Badge pill bg="primary">{data.length}</Badge>
                            </button>
                            {cartView ? <Modal onClose={() => setCartView(false)}><Cart /></Modal> : null}
                            <button className='text-white text-md font-semibold hover:bg-red-500 px-4 py-2 rounded-xl' onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                </div>
            </div>


            {isSidebarOpen && (
                <div ref={sidebarRef} className={`fixed inset-y-0 right-0 bg-green-400 border-l-2 z-40 text-white transform transition-transform duration-100 ease-in-out ${isSidebarOpen ? ' w-64' : 'w-0'}`}>
                    <div className="p-4">
                        <div className='p-2 mt-10'>
                            <Link to={'/'} onClick={toggleSidebar}>
                                <img src={logo} alt='logo' className='' />
                            </Link>
                            <Link to="/" className='mt-3'>
                                <button className='text-white text-3xl font-semibold'>
                                    GoFood
                                </button>
                            </Link>
                        </div>
                        <div className='flex flex-col ml-auto p-2 text-xl gap-2 mt-10 text-center'>
                            {navItems.map((item) =>
                                item.authenticate &&
                                (
                                    <NavLink
                                        to={item.link}
                                        key={item.label}
                                        onClick={toggleSidebar}
                                        className={({ isActive }) => isActive ? 'bg-red-500 rounded-xl ' : 'hover:bg-red-600 rounded-xl'}
                                    >
                                        <button className='px-4 py-2 text-white'>{item.label}</button>
                                    </NavLink>

                                ))}
                        </div>


                        {isTokenAvailable && (
                            <div className='text-center'>
                                <button className='text-white text-xl font-semibold hover:bg-red-500 rounded-xl w-full p-2 ml-2' 
                                onClick={() => {
                                    setCartView(true)
                                    toggleSidebar()
                                    }}>
                                    My Cart{" "}
                                    <Badge pill bg="primary">{data.length}</Badge>
                                </button>
                                {cartView ? <Modal onClose={() => setCartView(false)}><Cart /></Modal> : null}
                                <button className='text-white text-xl w-full font-semibold p-2 rounded-xl' onClick={handleLogout}>Logout</button>
                            </div>
                        )}
                    </div>
                </div>

            )}

        </nav>

    )
}

export default Navbar

