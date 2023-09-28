
import './App.css';
import Home from './screen/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './screen/Login';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from './screen/Signup';
import { CartProvider } from './components/ContextReducer';
import MyOrder from './screen/MyOrder';


function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div >
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/create' element={<Signup />} />
            <Route exact path='/myOrder' element={<MyOrder />} />
          </Routes>
        </div>

      </BrowserRouter>
    </CartProvider>

  );
}

export default App;
