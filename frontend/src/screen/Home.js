import React, { useState, useEffect } from 'react'
import Card from '../components/Card'
import Loading from '../components/Loading'
import axios from 'axios'
import Carousel from '../components/Carousel'


const Home = () => {
    const [foodData, setFoodData] = useState([]);
    const [catData, setCatData] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        const searchFood = async () => {
            setLoading(true)
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/foodData`);
            setFoodData(response.data[0]);
            setCatData(response.data[1]);
            setLoading(false)
        }
        searchFood();
    }, []);
    return (
        <section className='w-full'>
            {loading ? (
                <Loading />
            ) : (
                <div>
                    <div className='w-full'>
                        <Carousel />
                    </div>
                    <div className="mt-4 inset-0 flex justify-center items-center z-20 p-2">
                        <form className="w-full flex max-w-2xl mx-auto gap-2">
                            <input
                                className="w-full px-4 py-2 rounded border-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded"
                                type="submit"
                            >
                                Search
                            </button>
                        </form>
                    </div>
                    <div className='flex flex-wrap w-full overflow-auto'>

                        {catData.map((food) => (
                            <div className='row mb-3' key={food.CategoryName}>
                                <div
                                    key={food._id}
                                    className='fs-3 m-3'
                                >
                                    {food.CategoryName}
                                </div>
                                <hr />
                                <div className='flex flex-wrap gap-4'>
                                    {foodData.filter((item) =>
                                        (item.CategoryName === food.CategoryName) &&
                                        (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                                        .map((filterItem) => (
                                            <div key={filterItem._id}
                                                className='m-4'>
                                                <Card item={filterItem} />
                                            </div>

                                        ))}
                                </div>
                            </div>
                        ))
                        }

                    </div>
                </div>
            )}

        </section>

    )
}

export default Home