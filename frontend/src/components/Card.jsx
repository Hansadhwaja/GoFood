import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, updateItem } from '../redux/cartSlice';

const Card = ({ item }) => {
    const data = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const priceRef = useRef();
    const price = item.options[0];
    const options = Object.keys(price);

    const [qty, setQty] = useState(1);
    const [size, setSize] = useState(options[0]);

    useEffect(() => {
        setSize(priceRef.current.value);
    }, []);

    const handleAddToCart = () => {
        const existingItem = data.find((thing) => thing.id === item._id && thing.size === size);

        const finalPrice = qty * parseInt(price[size]);

        if (existingItem) {
            dispatch(updateItem({
                id: item._id,
                price: finalPrice,
                qty: qty,
            }));
        } else {
            dispatch(addItem({
                id: item._id,
                name: item.name,
                price: finalPrice,
                qty: qty,
                size: size,
                img: item.img,
            }));
        }
    };

    const finalPrice = qty * parseInt(price[size]);

    return (

        <div className="flex flex-col gap-2 bg-dark max-w-sm text-white p-2 rounded-xl">
            <div className='mx-auto'>
                <img
                    src={item.img}
                    className="w-80 h-64 rounded-xl"
                    alt={item.name}

                />
            </div>
            <div className='mt-3 mx-auto'>
                <h5 className="">{item.name}</h5>
                <p className="">{item.description}</p>
            </div>
            <div className='flex justify-start'>
                <select
                    className="h-100 bg-success m-2 rounded px-2 py-1"
                    onChange={(e) => setQty(parseInt(e.target.value, 10))}
                    value={qty}
                >
                    {Array.from(Array(6), (e, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                </select>
                <select
                    className="h-100 bg-success m-2 rounded px-2 py-1"
                    ref={priceRef}
                    onChange={(e) => setSize(e.target.value)}
                    value={size}
                >
                    {options.map((data) => (
                        <option key={data} value={data}>{data}</option>
                    ))}
                </select>
            </div>
            <div className='mt-3 text-lg ml-3'>
                ₹{finalPrice}/-
            </div>
            <hr />
            <div
                className="bg-green-700 px-4 py-2 rounded-lg font-semibold w-fit hover:bg-green-500 mx-auto mb-3"
                onClick={handleAddToCart}
            >
                Add to Cart
            </div>
        </div>
    );
};

export default Card;
