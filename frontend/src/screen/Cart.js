import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { removeItem,dropCart } from '../redux/cartSlice';
import trash from "../trash.svg";
import axios from 'axios';
const Cart = () => {
    const data = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center fs-3 text-white'>
                    The Cart is Empty!
                </div>
            </div>
        )
    }
    const handleCheckout = async () => {
        try {
            const userEmail = localStorage.getItem("userEmail");
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/orderData`, {
                order_data: data,
                email: userEmail,
                order_date: new Date().toDateString()
            });
            if (response) {
                dispatch(dropCart());
            }
        } catch (error) {
            console.log('Error while ordering: ',error);
        }

    };


    const totalPrice = data.reduce((total, food) => total + food.price, 0);
    return (
        <div>
            <div className='container m-auto mt-5 table-responsive table-responsive-smtable-responsive-md'>
                <table className="table table-hover">
                    <thead className='text-success fs-4'>
                        <tr className='text-success'>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Option</th>
                            <th scope="col">Amount</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{food.name}</td>
                                <td>{food.qty}</td>
                                <td>{food.size}</td>
                                <td>{food.price}</td>
                                <td>
                                    <button type="button" className='btn p-0'>
                                        <img
                                            src={trash}
                                            alt='delete'
                                            onClick={() => { dispatch(removeItem(index)); }} />
                                    </button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
                <div>
                    <h1 className='fs-2 text-white'>Total Price:{totalPrice}/-</h1>
                </div>
                <div>
                    <button className='btn bg-success mt-5' onClick={handleCheckout}>Check Out</button>
                </div>
            </div>

        </div>
    )
}

export default Cart