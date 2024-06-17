import axios from 'axios';
import React, { useState, useEffect } from 'react'

const MyOrder = () => {
    const [orderData, setOrderData] = useState([]);


    const myOrder = async () => {

        try {
            const userEmail = localStorage.getItem("userEmail");
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/myOrderData`, { email: userEmail });

            if (response.data.order_item === 'Data Not found.') {
                setOrderData([]);
            }
            else {
                if (response.data.order_item) {
                    setOrderData(response.data.order_item);
                }
            }
        } catch (error) {
            console.log('Error while fetching orderData: ', error);
        }
    };
    useEffect(() => {
        myOrder()
    }, []);

    return (

        <div className=''>

            <h1 className='text-green-600 text-center mt-5'>My Orders</h1>
            {orderData.length === 0 && (
                <div className='text-center'>
                    <h1 className='text-xl font-semibold p-3 mt-10'>No Orders.</h1>
                </div>
            )}
            {orderData.map((element, index) => (
                <div key={index} className='mt-5'>
                    <h1 className='text-green-700 m-2'>{element.date}</h1>
                    <hr />
                    <div className='flex flex-wrap'>
                        {element?.data?.map((item) => (
                            <div key={item.id} className='m-2 border-2 border-green-500 p-3 rounded-lg font-semibold w-full sm:w-[180px]'>
                                <p className='text-green-500 text-2xl'>{item.name}</p>
                                <div className='flex gap-3'>
                                    <p className='text-green-400 text-lg'>{item.size}</p>
                                    <p className='text-slate-500 text-lg'>{item.qty}</p>
                                    <p className='text-xl text-green-500'>₹{item.price}/-</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>


    )
}

export default MyOrder