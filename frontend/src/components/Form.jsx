import React from 'react'
import { useForm } from "react-hook-form"
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';


const Form = ({ label }) => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const submit = async (data) => {
        try {
            console.log(data);
            if (label === 'SignUp') {
                const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/create`, data);
                console.log('Response:', response);
                if (response) {
                    if (response.data === 'User already exists') {
                        alert('This Email already exists.Try Logging in.')
                    }
                    dispatch(login());
                    navigate("/");
                }
            }
            else {
                const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, data);
                console.log('Response:', response);
                if (response) {
                    console.log('Data:', data);
                   dispatch(login());
                    navigate("/");
                }

            }

        } catch (error) {
            console.log('Error while creating user: ', error);
        }


    }

    return (
        <div className='w-full p-4'>
            <form className='max-w-2xl min-w-lg mx-auto' onSubmit={handleSubmit(submit)}>
                <h1 className='text-4xl font-semibold text-center border-b-2 p-3'>{label}</h1>
                {label === 'SignUp' && (
                    <div className="flex flex-col gap-2">
                        <label>Name</label>
                        <input
                            type="text"
                            placeholder="Enter Your Name"
                            className='p-2 border-2 shadow-md rounded-lg my-2'
                            {...register('name')}
                        />
                    </div>
                )}
                <div className="flex flex-col gap-2">
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Enter Your Email"
                        className='p-2 border-2 shadow-md rounded-lg my-2'
                        {...register('email')}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label>Password</label>
                    <input
                        type="text"
                        placeholder="Enter Your Password"
                        className='p-2 border-2 shadow-md rounded-lg my-2'
                        {...register('password')}
                    />
                </div>
                {label === 'SignUp' && (
                    <div className="flex flex-col gap-2">
                        <label>Location</label>
                        <input
                            type="text"
                            placeholder="Enter Your Location"
                            className='p-2 border-2 shadow-md rounded-lg my-2'
                            {...register('location')}
                        />
                    </div>
                )}
                <div className='text-center mt-2'>
                    <button type='submit' className='bg-red-500 px-4 py-2 rounded-xl text-lg font-semibold hover:bg-red-700 text-white'>{label}</button>
                    {label === 'SignUp' ? (
                        <Link to="/login" className='m-2 py-2 px-4 rounded-lg text-lg bg-green-400 text-white font-semibold hover:bg-green-500'>
                            <button>
                                Already A User
                            </button>
                        </Link>
                    ) : (
                        <Link to="/create" className='m-2 py-2 px-4 rounded-lg text-lg bg-green-400 text-white font-semibold hover:bg-green-500'>
                            <button>
                                SignUp
                            </button>
                        </Link>
                    )}

                </div>
            </form>
        </div>
    )
}

export default Form