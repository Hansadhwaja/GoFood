import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'


const Home = () => {
    const [foodData, setFoodData] = useState([]);
    const [catData, setCatData] = useState([]);
    const [search, setSearch] = useState('');
    const searchFood = async () => {
        const response = await fetch("https://gofood-gpmv.onrender.com/foodData");
        const data = await response.json();
        setFoodData(data[0]);
        setCatData(data[1]);
        console.log(foodData);
        console.log(catData);
    }

    useEffect(() => {
        searchFood();
    }, []);
    return (
        <section>
            <div><Navbar /></div>
            <div>
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: 'contain !important' }}>
                    <div className="carousel-inner" id='carousel'>
                        <div className='carousel-caption' style={{ zIndex: '10' }}>
                            <div className="d-flex justify-content-center" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search"
                                    aria-label="Search" value={search}  onChange={(e)=>{setSearch(e.target.value)}}/>
                                <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
                            </div>

                        </div>
                        <div className="carousel-item active">
                            <img src="https://source.unsplash.com/random/300×300?burger" alt="random_item" className="d-block w-100" style={{ filter: "brightness(30%)" }} />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/300×300?pastry" alt="random_item" className="d-block w-100" style={{ filter: "brightness(30%)" }} />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/300×300?noodles" alt="random_item" className="d-block w-100" style={{ filter: "brightness(30%)" }} />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className='container'>
                {catData.map((food) => (
                    <div className='row mb-3'>
                        <div
                            key={food._id}
                            className='fs-3 m-3'
                        >
                            {food.CategoryName}
                        </div>
                        <hr />
                        {foodData.filter((item) =>
                            (item.CategoryName === food.CategoryName)&&
                            (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                            .map((filterItem) => (
                                <div key={filterItem._id}
                                    className='col-12 col-md-6 col-lg-3'>
                                    <Card item={filterItem} />
                                </div>

                            ))}
                    </div>
                ))
                }

            </div>
            <div><Footer /></div>
        </section>

    )
}

export default Home