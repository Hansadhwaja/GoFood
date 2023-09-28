import React, { useRef, useState,useEffect } from 'react'
import { useCart, useDispatchCart } from './ContextReducer';

const Card = ({item}) => {
    const data=useCart();
    const dispatch=useDispatchCart();
    const priceRef=useRef();
    const price=item.options[0];
    const options=Object.keys(price);
    const [qty,setQty]=useState(1);
    const [size,setSize]=useState("");
    const handleAddToCart=async () =>{
        let food=[]
        for(const thing of data){
            if(thing.id===item._id){
                food=thing;
                break;
            }
        }
        if(food.length !==0){
            if(food.size===size){
                await dispatch({type:"UPDATE",
                id:item._id,price:finalPrice,qty:qty})
                return;
            }
            else if(food.size!==size){
                await dispatch({type:"ADD",id:item._id,name:item.name,
                price:finalPrice,qty:qty,size:size});
                return;
            } 
            return;
        }
        await dispatch({type:"ADD",id:item._id,name:item.name,
                price:finalPrice,qty:qty,size:size});
    }

const finalPrice=qty*parseInt(price[size]);
useEffect(() => {
  setSize(priceRef.current.value)
}, [])

    return (

        <div>
            <div className="card mt-3 bg-dark" style={{ 'width': '18rem', 'maxHeight': '460px' }}>
                <img 
                src={item.img} 
                className="card-img-top" 
                alt={item.name}
                style={{height:"160px",objectFit:"fill"}} />
                <div className="card-body bg-transparent text-white">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.description}</p>
                    <div className='container mt-3 text-white'>
                        <select className=' h-100 bg-success m-2 rounded' onChange={(e)=>setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                );
                            })
                            }
                        </select>
                        <select className=' h-100 bg-success m-2 rounded' ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
                        {options.map((data)=>(
                            <option key={data} value={data}>{data}</option>
                        ))}
                        </select>
                        <div className='d-inline h-100 f-5'>
                          ₹{finalPrice}/-
                        </div>
                    </div>
                    <hr />
                        <div className="btn bg-success mx-1 fs-5" onClick={handleAddToCart}>Add to Cart</div>
                </div>
            </div>
        </div>
    )
}

export default Card