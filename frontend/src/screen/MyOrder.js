import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
const MyOrder = () => {
    const [orderData, setOrderData] = useState([]);
    let data = "";
    const myOrder = async () => {
        const userEmail = localStorage.getItem("userEmail");
        const response = await fetch("https://gofood-gpmv.onrender.com/myOrderData",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: userEmail })
            });
        const result = await response.json();

        if (response.ok) {
            setOrderData(result);
        }
        if (!response.ok) {
            console.log(result.error);
        }
    };
    useEffect(() => {
        myOrder()
    }, []);
    return (
        <>
            <div>
                <Navbar />
            </div>
            <div className='container'>
                <div className='row'>
                    {orderData.map((item)=>{
                        return(
                            item.map((element)=>{
                                return(
                                    <div>
                                        {element.Order_date?
                                        <div className='m-auto mt-5 fs-3 text-success'>
                                            {data=element.Order_date}
                                            <hr />
                                        </div>
                                        :
                                        <div className='col-12 col-md-6 col-lg-3'key={element.id} >
                                                            <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                                <div className="card-body">
                                                                    <h5 className="card-title text-success">{element.name}</h5>
                                                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                        <span className='m-1'>{element.qty}</span>
                                                                        <span className='m-1'>{element.size}</span>
                                                                        <span className='m-1'>{data}</span>
                                                                        <div className=' d-inline ms-2 h-100 w-20 fs-5 text-success' >
                                                                            ₹{element.price}/-
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>}
                                    </div>
                                )
                            })
                            
                        )
                    })}
                        
                       
                           
                        
                
                </div>

            </div>
            <div>
                <Footer />
            </div>
        </>

    )
}

export default MyOrder